export function StatsBar() {
  const stats = [
    { label: 'Taux de matching', value: '94%' },
    { label: 'Économie potentielle', value: '-50%' },
    { label: 'Temps économisé / semaine', value: '40h' },
  ];

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-slate-200/80 bg-[#fbfcff] p-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="scroll-clip-reveal block text-3xl font-medium text-slate-950 font-headline md:text-4xl">
                {stat.value}
              </span>
              <p className="mt-2 text-sm text-slate-500 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
