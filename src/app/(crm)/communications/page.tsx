'use client';

import { useState } from 'react';
import { MessageSquare, Paperclip, Send } from 'lucide-react';
import { communications } from '@/lib/crm/data';
import { timeAgo, formatDateTime } from '@/lib/crm/utils';
import { cn } from '@/lib/utils';

const suggestedReplies = [
  'Merci, nous avons bien reçu vos documents. Nous reviendrons vers vous sous 48h.',
  'Pourriez-vous nous envoyer votre preuve d\'emploi et relevé de crédit?',
  'Bonjour, nous aimerions planifier une visite. Quelles sont vos disponibilités?',
  'Votre dossier a été transmis au propriétaire. Nous vous tiendrons informé(e).',
];

export default function CommunicationsPage() {
  const [selectedId, setSelectedId] = useState(communications[0]?.id);
  const [replyText, setReplyText] = useState('');

  const selected = communications.find(c => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-semibold text-slate-900">Communications</h1>
        <p className="text-sm text-slate-500 mt-0.5">Messages et échanges centralisés</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', background: '#fff', borderRadius: 12, border: '1px solid #E2E5EB', overflow: 'hidden', height: 'calc(100vh - 220px)' }}>
        {/* Conversation list */}
        <div style={{ borderRight: '1px solid #E2E5EB', overflowY: 'auto' }}>
          <div className="px-4 py-3 border-b border-slate-100">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            />
          </div>
          <div className="divide-y divide-slate-50">
            {communications.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  'w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors',
                  selectedId === conv.id && 'bg-blue-50/50'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  {conv.unread && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                  <span className={cn('text-sm font-medium truncate', conv.unread ? 'text-slate-900' : 'text-slate-700')}>
                    {conv.contactName}
                  </span>
                  <span className="text-xs text-slate-400 ml-auto flex-shrink-0">{timeAgo(conv.lastMessageDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded',
                    conv.contactType === 'candidate' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  )}>
                    {conv.propertyTag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 truncate">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation detail */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <>
              {/* Header */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{selected.contactName}</h3>
                  <p className="text-xs text-slate-500">{selected.propertyTag} — {selected.contactType === 'candidate' ? 'Candidat' : 'Client'}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {[...selected.messages].reverse().map((msg, i) => {
                  const isOwn = msg.sender === 'FluxLocatif';
                  return (
                    <div key={i} className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
                      <div className={cn(
                        'max-w-[70%] rounded-xl px-4 py-2.5',
                        isOwn ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
                      )}>
                        <p className="text-sm">{msg.text}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map(att => (
                              <div key={att} className={cn(
                                'flex items-center gap-1.5 text-xs',
                                isOwn ? 'text-blue-100' : 'text-slate-500'
                              )}>
                                <Paperclip className="w-3 h-3" />
                                {att}
                              </div>
                            ))}
                          </div>
                        )}
                        <p className={cn('text-[10px] mt-1', isOwn ? 'text-blue-200' : 'text-slate-400')}>
                          {formatDateTime(msg.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Suggested replies */}
              <div className="px-5 py-2 border-t border-slate-50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Suggestions</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {suggestedReplies.slice(0, 3).map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => setReplyText(reply)}
                      className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-100 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      {reply.slice(0, 50)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply input */}
              <div className="px-5 py-3 border-t border-slate-100">
                <div className="flex items-end gap-2">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 min-h-[40px] max-h-[100px]"
                    rows={1}
                  />
                  <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-slate-400">
              Sélectionnez une conversation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
