'use client';

import { Settings, User, Bell, Shield, Globe, Palette } from 'lucide-react';

const sections = [
  {
    title: 'Profil',
    icon: User,
    fields: [
      { label: 'Nom', value: 'Anthony Makeen' },
      { label: 'Courriel', value: 'anthony@fluxlocatif.com' },
      { label: 'Rôle', value: 'Administrateur' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    toggles: [
      { label: 'Nouveau candidat', description: 'Recevoir une notification à chaque nouvelle candidature', enabled: true },
      { label: 'Tâche en retard', description: 'Alerte quand une tâche dépasse sa date limite', enabled: true },
      { label: 'Message non lu', description: 'Notification pour les messages non lus depuis 24h', enabled: false },
      { label: 'Changement de statut', description: 'Notification quand un statut change', enabled: false },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-headline font-semibold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configuration du compte et préférences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Profil</h3>
        </div>
        <div className="space-y-3">
          {sections[0].fields?.map(field => (
            <div key={field.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-600">{field.label}</span>
              <span className="text-sm font-medium text-slate-900">{field.value}</span>
            </div>
          ))}
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Modifier le profil
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
        </div>
        <div className="space-y-1">
          {sections[1].toggles?.map(toggle => (
            <div key={toggle.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-700">{toggle.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{toggle.description}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${toggle.enabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${toggle.enabled ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Apparence</h3>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-700">Langue</p>
            <p className="text-xs text-slate-400 mt-0.5">Langue de l&apos;interface</p>
          </div>
          <select className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white text-slate-700">
            <option>Français</option>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Sécurité</h3>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-700">Mot de passe</p>
            <p className="text-xs text-slate-400 mt-0.5">Dernière modification il y a 30 jours</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}
