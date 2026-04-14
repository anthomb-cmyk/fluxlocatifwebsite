import { NextResponse } from 'next/server';
import { salesCalendarProvider } from '@/lib/sales/calendar/provider';

// GET /api/auth/google — redirect to Google OAuth consent screen
export async function GET() {
  const auth = salesCalendarProvider.makeOAuth2Client();

  const url = auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',  // force refresh_token to be returned even if previously authorized
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    login_hint: 'anthony@fluxlocatif.com',
  });

  return NextResponse.redirect(url);
}
