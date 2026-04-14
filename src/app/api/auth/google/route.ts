import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { salesCalendarProvider } from '@/lib/sales/calendar/provider';

// GET /api/auth/google — redirect to Google OAuth consent screen
export async function GET() {
  const auth = salesCalendarProvider.makeOAuth2Client();

  // Generate a random state value to prevent CSRF attacks (required by Google policy)
  const state = randomBytes(16).toString('hex');

  // Store state in a cookie so the callback can verify it
  const cookieStore = await cookies();
  cookieStore.set('gcal_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  });

  const url = auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',  // force refresh_token to be returned even if previously authorized
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    login_hint: 'anthony@fluxlocatif.com',
    state,
  });

  return NextResponse.redirect(url);
}
