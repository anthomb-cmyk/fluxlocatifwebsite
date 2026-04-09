import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FluxLocatif - Optimisation locative pour propriétaires actifs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f0f6ff 0%, #ffffff 50%, #e8f0ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 20px 40px rgba(59,130,246,0.3)',
          }}
        >
          <span style={{ color: 'white', fontSize: 32, fontWeight: 700 }}>FL</span>
        </div>

        <div style={{ fontSize: 52, fontWeight: 700, color: '#0f172a', marginBottom: 16, letterSpacing: '-1px' }}>
          FluxLocatif
        </div>

        <div style={{ fontSize: 26, color: '#64748b', textAlign: 'center', maxWidth: 700, lineHeight: 1.4 }}>
          Optimisation locative pour propriétaires actifs
        </div>

        <div
          style={{
            marginTop: 40,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 100,
            padding: '10px 24px',
            fontSize: 18,
            color: '#3b82f6',
            fontWeight: 600,
          }}
        >
          fluxlocatif.com
        </div>
      </div>
    ),
    { ...size }
  );
}
