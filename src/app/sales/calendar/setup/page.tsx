import Link from 'next/link';
import { CheckCircle2, AlertCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { getSalesCalendarStatus } from '@/lib/sales/calendar/service';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

const SETUP_STEPS = [
  {
    n: 1,
    title: 'Create a Google Cloud project',
    body: 'Go to console.cloud.google.com → New project → name it "FluxLocatif CRM".',
    link: { href: 'https://console.cloud.google.com/projectcreate', label: 'Open Google Cloud Console' },
  },
  {
    n: 2,
    title: 'Enable the Google Calendar API',
    body: 'In your project → APIs & Services → Library → search "Google Calendar API" → Enable.',
    link: { href: 'https://console.cloud.google.com/apis/library/calendar-json.googleapis.com', label: 'Enable Calendar API' },
  },
  {
    n: 3,
    title: 'Create OAuth 2.0 credentials',
    body: 'APIs & Services → Credentials → Create Credentials → OAuth client ID → Web application. Add this Authorized redirect URI:',
    code: `${process.env.GOOGLE_CALENDAR_REDIRECT_URI ?? 'http://localhost:3000/api/auth/google/callback'}`,
  },
  {
    n: 4,
    title: 'Copy credentials to .env.local',
    body: 'Copy the Client ID and Client Secret into your .env.local file:',
    code: `GOOGLE_CALENDAR_CLIENT_ID=your-client-id\nGOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret\nGOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/api/auth/google/callback\nGOOGLE_CALENDAR_CALENDAR_ID=primary`,
  },
  {
    n: 5,
    title: 'Connect anthony@fluxlocatif.com',
    body: 'Click the button below. Google will ask you to sign in and grant access to the calendar. Make sure you use anthony@fluxlocatif.com.',
  },
];

interface Props {
  searchParams: Promise<{ connected?: string; error?: string }>;
}

export default async function CalendarSetupPage({ searchParams }: Props) {
  const { connected, error } = await searchParams;
  const status = await getSalesCalendarStatus();

  const errorMessages: Record<string, string> = {
    no_code: 'Google did not return an auth code. Try again.',
    no_refresh_token: 'Google did not return a refresh token. Make sure you accepted all permissions and try again.',
    token_exchange_failed: 'Failed to exchange the auth code for tokens. Check your Client ID and Secret.',
    access_denied: 'Access was denied. Make sure you approve all requested permissions.',
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/sales/calendar" className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-700">
          <ArrowLeft className="h-3 w-3" />
          Back to calendar
        </Link>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Setup</p>
        <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900">
          Connect Google Calendar
        </h1>
        <p className="mt-2 text-[14px] text-slate-500">
          Link <span className="font-medium text-slate-700">anthony@fluxlocatif.com</span> so all CRM events sync automatically — no manual steps.
        </p>
      </div>

      {/* Status banner */}
      {connected === '1' || status.configured ? (
        <div className="flex items-start gap-3 rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <div>
            <p className="text-[13px] font-semibold text-emerald-800">Connected</p>
            <p className="mt-0.5 text-[12px] text-emerald-700">{status.message}</p>
          </div>
        </div>
      ) : null}

      {error && (
        <div className="flex items-start gap-3 rounded-[18px] border border-rose-200 bg-rose-50 px-5 py-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
          <div>
            <p className="text-[13px] font-semibold text-rose-800">Something went wrong</p>
            <p className="mt-0.5 text-[12px] text-rose-700">{errorMessages[error] ?? error}</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        {SETUP_STEPS.map((step) => (
          <div key={step.n} className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-start gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                {step.n}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-[13px] font-semibold text-slate-900">{step.title}</p>
                <p className="text-[13px] text-slate-500">{step.body}</p>
                {step.code && (
                  <pre className="overflow-x-auto rounded-[12px] bg-slate-900 px-4 py-3 text-[12px] leading-6 text-slate-100 whitespace-pre-wrap break-all">
                    {step.code}
                  </pre>
                )}
                {step.link && (
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-sky-600 hover:text-sky-800"
                  >
                    {step.link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {step.n === 5 && (
                  <div className="pt-1">
                    {status.configured ? (
                      <a
                        href="/api/auth/google"
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Reconnect as anthony@fluxlocatif.com
                      </a>
                    ) : (
                      <a
                        href="/api/auth/google"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-slate-700 transition-colors"
                      >
                        Connect anthony@fluxlocatif.com →
                      </a>
                    )}
                    <p className="mt-2 text-[11px] text-slate-400">
                      You'll be redirected to Google. Sign in with anthony@fluxlocatif.com and accept the calendar permissions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {status.configured && (
        <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 px-5 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">What happens now</p>
          <ul className="mt-3 space-y-2">
            {[
              'Every event you create in the CRM is instantly pushed to anthony@fluxlocatif.com\'s Google Calendar',
              'Attendee emails are added automatically — they receive a Google Calendar invite',
              'Email + popup reminders are set (60 min + 15 min before)',
              'If the API call ever fails, the event is saved to the CRM and a fallback link is shown',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
