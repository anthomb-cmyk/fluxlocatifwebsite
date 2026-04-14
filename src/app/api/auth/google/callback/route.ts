import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { cookies } from 'next/headers';
import { salesCalendarProvider } from '@/lib/sales/calendar/provider';

// GET /api/auth/google/callback — exchange code for tokens and save refresh_token
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/crm/calendar/setup?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL('/crm/calendar/setup?error=no_code', request.url));
  }

  // Verify state to prevent CSRF
  const returnedState = searchParams.get('state');
  const cookieStore = await cookies();
  const savedState = cookieStore.get('gcal_oauth_state')?.value;
  if (!returnedState || !savedState || returnedState !== savedState) {
    return NextResponse.redirect(new URL('/crm/calendar/setup?error=state_mismatch', request.url));
  }

  try {
    const auth = salesCalendarProvider.makeOAuth2Client();
    const { tokens } = await auth.getToken(code);

    if (!tokens.refresh_token) {
      return NextResponse.redirect(
        new URL('/crm/calendar/setup?error=no_refresh_token', request.url)
      );
    }

    // Write to .env.local so the token persists across restarts
    const envPath = join(process.cwd(), '.env.local');
    let envContent = existsSync(envPath) ? readFileSync(envPath, 'utf-8') : '';

    // Upsert GOOGLE_CALENDAR_REFRESH_TOKEN
    if (envContent.includes('GOOGLE_CALENDAR_REFRESH_TOKEN=')) {
      envContent = envContent.replace(
        /GOOGLE_CALENDAR_REFRESH_TOKEN=.*/,
        `GOOGLE_CALENDAR_REFRESH_TOKEN=${tokens.refresh_token}`
      );
    } else {
      envContent += `\nGOOGLE_CALENDAR_REFRESH_TOKEN=${tokens.refresh_token}\n`;
    }

    writeFileSync(envPath, envContent, 'utf-8');

    // Also set it for this process session so it works immediately without restart
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN = tokens.refresh_token;

    return NextResponse.redirect(new URL('/crm/calendar/setup?connected=1', request.url));
  } catch (err) {
    console.error('[GCal OAuth] callback error:', err);
    return NextResponse.redirect(
      new URL('/crm/calendar/setup?error=token_exchange_failed', request.url)
    );
  }
}
