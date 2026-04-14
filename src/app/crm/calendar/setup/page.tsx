import Link from 'next/link';
import { headers } from 'next/headers';
import { CheckCircle2, AlertCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { getSalesCalendarStatus } from '@/lib/sales/calendar/service';

// Determine the base URL of the app at runtime — works for both local dev and production
async function getAppBaseUrl() {
  // 1. Explicit env override (set this in your hosting provider)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');

  // 2. Hosting providers inject the public URL automatically
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (process.env.RAILWAY_STATIC_URL) return `https://${process.env.RAILWAY_STATIC_URL}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');

  // 3. Fall back to the incoming request host (works in Next.js server components)
  const hdrs = await headers();
  const host = hdrs.get('host') ?? 'localhost:3000';
  const proto = host.startsWith('localhost') ? 'http' : 'https';
  return `${proto}://${host}`;
}

const errorMessages: Record<string, string> = {
  no_code: 'Google did not return an auth code. Try again.',
  no_refresh_token: 'Google did not return a refresh token. Make sure you accepted all permissions and try again.',
  token_exchange_failed: 'Failed to exchange the auth code for tokens. Check that your Client ID, Secret, and Redirect URI match exactly.',
  access_denied: 'Access was denied. Make sure you approve all requested permissions.',
};

interface Props {
  searchParams: Promise<{ connected?: string; error?: string }>;
}

export default async function CalendarSetupPage({ searchParams }: Props) {
  const { connected, error } = await searchParams;
  const [status, baseUrl] = await Promise.all([
    getSalesCalendarStatus(),
    getAppBaseUrl(),
  ]);

  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  const isLocal = baseUrl.includes('localhost');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/crm/calendar" className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-700">
          <ArrowLeft className="h-3 w-3" />
          Back to calendar
        </Link>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Setup</p>
        <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900">
          Connect Google Calendar
        </h1>
        <p className="mt-2 text-[14px] text-slate-500">
          Link <span className="font-medium text-slate-700">anthony@fluxlocatif.com</span> so every CRM event syncs automatically — no manual steps.
        </p>
      </div>

      {/* Status / result banners */}
      {(connected === '1' || status.configured) && (
        <div className="flex items-start gap-3 rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <div>
            <p className="text-[13px] font-semibold text-emerald-800">Connected</p>
            <p className="mt-0.5 text-[12px] text-emerald-700">{status.message}</p>
          </div>
        </div>
      )}

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

        {/* Step 1 */}
        <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">1</span>
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-slate-900">Create a Google Cloud project</p>
              <p className="text-[13px] text-slate-500">Go to Google Cloud Console → New project → name it <span className="font-medium text-slate-700">FluxLocatif CRM</span>.</p>
              <a href="https://console.cloud.google.com/projectcreate" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-sky-600 hover:text-sky-800">
                Open Google Cloud Console <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">2</span>
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-slate-900">Enable the Google Calendar API</p>
              <p className="text-[13px] text-slate-500">APIs & Services → Library → search <span className="font-medium text-slate-700">Google Calendar API</span> → Enable.</p>
              <a href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-sky-600 hover:text-sky-800">
                Enable Calendar API <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Step 3 — redirect URI, dynamic */}
        <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">3</span>
            <div className="space-y-2 min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-900">Create OAuth 2.0 credentials</p>
              <p className="text-[13px] text-slate-500">
                APIs & Services → Credentials → Create Credentials → <span className="font-medium text-slate-700">OAuth client ID</span> → Web application.
              </p>
              <p className="text-[13px] text-slate-500">
                Under <span className="font-medium text-slate-700">Authorized redirect URIs</span>, add{isLocal ? ' both:' : ':'}
              </p>
              <div className="space-y-2">
                <pre className="overflow-x-auto rounded-[12px] bg-slate-900 px-4 py-3 text-[12px] text-slate-100 break-all whitespace-pre-wrap">
                  {redirectUri}
                </pre>
                {isLocal && (
                  <>
                    <p className="text-[12px] text-slate-400">And when you deploy, also add your production URL:</p>
                    <pre className="overflow-x-auto rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800 break-all whitespace-pre-wrap">
                      https://yourdomain.com/api/auth/google/callback
                    </pre>
                    <p className="text-[11px] text-slate-400">You can add multiple redirect URIs in Google Cloud — add both so it works in dev and production.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 — env vars */}
        <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">4</span>
            <div className="space-y-2 min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-900">Add credentials to your environment</p>
              <p className="text-[13px] text-slate-500">
                Copy the Client ID and Secret from Google Cloud. {isLocal
                  ? 'Add to your .env.local file:'
                  : 'Add these as environment variables in your hosting provider (Vercel / Railway / Render):'}
              </p>
              <pre className="overflow-x-auto rounded-[12px] bg-slate-900 px-4 py-3 text-[12px] leading-6 text-slate-100 whitespace-pre-wrap break-all">
{`GOOGLE_CALENDAR_CLIENT_ID=your-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
GOOGLE_CALENDAR_REDIRECT_URI=${redirectUri}
GOOGLE_CALENDAR_CALENDAR_ID=primary`}
              </pre>
              {!isLocal && (
                <p className="text-[11px] text-slate-400">
                  Also set <span className="font-mono text-slate-600">NEXT_PUBLIC_SITE_URL=https://yourdomain.com</span> so the redirect URI stays correct.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step 5 — connect */}
        <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">5</span>
            <div className="space-y-3">
              <p className="text-[13px] font-semibold text-slate-900">Connect anthony@fluxlocatif.com</p>
              <p className="text-[13px] text-slate-500">
                Click below. Google will ask you to sign in — use <span className="font-medium text-slate-700">anthony@fluxlocatif.com</span> and accept the calendar permissions.
                The refresh token is saved automatically and you never have to do this again.
              </p>
              {status.configured ? (
                <a href="/api/auth/google" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                  <CheckCircle2 className="h-4 w-4" />
                  Reconnect anthony@fluxlocatif.com
                </a>
              ) : (
                <a href="/api/auth/google" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-slate-700 transition-colors">
                  Connect anthony@fluxlocatif.com →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What happens after */}
      {status.configured && (
        <div className="rounded-[20px] border border-slate-100 bg-slate-50/60 px-5 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">What happens now</p>
          <ul className="mt-3 space-y-2">
            {[
              'Every event created in the CRM is instantly pushed to anthony@fluxlocatif.com\'s Google Calendar',
              'Attendees receive a proper Google Calendar invite with the event details',
              'Email reminder (60 min before) + popup reminder (15 min before) are set automatically',
              'If the API call fails, the event is saved to the CRM and a fallback link is shown',
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
