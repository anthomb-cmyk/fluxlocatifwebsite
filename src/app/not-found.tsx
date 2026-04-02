import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Non Trouvée</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
