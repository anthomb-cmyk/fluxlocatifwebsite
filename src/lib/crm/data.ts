// FluxLocatif CRM — Mock data for all modules
// This file provides realistic demo data for the CRM interface

export type ClientStatus = 'lead' | 'contacted' | 'call_scheduled' | 'onboarding' | 'active' | 'paused' | 'closed';
export type PropertyStatus = 'to_launch' | 'active' | 'low_demand' | 'qualifying' | 'visits_in_progress' | 'waiting_on_client' | 'rented' | 'closed';
export type CandidateStatus = 'new' | 'to_qualify' | 'qualifying' | 'prequalified' | 'to_present' | 'presented' | 'rejected' | 'selected' | 'visit_to_schedule';
export type PipelineStage = 'new_message' | 'initial_triage' | 'missing_info' | 'prequalified' | 'to_review' | 'presented_to_client' | 'visit' | 'decision' | 'signed' | 'rejected';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  clientType: string;
  unitCount: number;
  status: ClientStatus;
  source: string;
  notes: string;
  propertyIds: string[];
  nextAction: string;
  lastActivity: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  rent: number;
  availabilityDate: string;
  unitType: string;
  bedrooms: number;
  inclusions: string[];
  pets: boolean;
  parking: number;
  appliances: boolean;
  status: PropertyStatus;
  clientId: string;
  demandVolume: number;
  qualifiedCount: number;
  candidateIds: string[];
  notes: string;
  nextSteps: string;
  daysOnMarket: number;
}

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  targetPropertyId: string;
  moveInDate: string;
  occupants: number;
  pets: boolean;
  employment: string;
  employer: string;
  income: number;
  credit: 'excellent' | 'good' | 'fair' | 'poor';
  talHistory: string;
  qualificationLevel: number; // 1-3 stars
  status: CandidateStatus;
  pipelineStage: PipelineStage;
  source: string;
  notes: string;
  documents: { name: string; received: boolean }[];
  createdAt: string;
  daysInStage: number;
}

export interface Task {
  id: string;
  title: string;
  type: string;
  propertyId?: string;
  clientId?: string;
  candidateId?: string;
  dueDate: string;
  completed: boolean;
  priority: TaskPriority;
  daysOverdue: number;
}

export interface Communication {
  id: string;
  contactName: string;
  contactType: 'candidate' | 'client';
  propertyTag: string;
  lastMessage: string;
  lastMessageDate: string;
  unread: boolean;
  messages: { sender: string; text: string; date: string; attachments?: string[] }[];
}

export interface ActivityItem {
  id: string;
  type: 'status_change' | 'note' | 'document' | 'communication' | 'task';
  description: string;
  date: string;
  entityType: 'property' | 'candidate' | 'client';
  entityId: string;
}

// ---- MOCK DATA ----

export const clients: Client[] = [
  {
    id: 'cl-1',
    name: 'Jean Dupont',
    company: 'Gestion Immobilière ABC',
    phone: '514-555-0123',
    email: 'jean@gestionabc.ca',
    clientType: 'Propriétaire',
    unitCount: 3,
    status: 'active',
    source: 'Référence',
    notes: 'Client réactif. Préfère les communications par courriel. Possède 3 immeubles dans le Plateau.',
    propertyIds: ['pr-1', 'pr-2', 'pr-3'],
    nextAction: 'Présenter 3 dossiers pour 4125 Saint-Denis',
    lastActivity: '2026-04-11',
  },
  {
    id: 'cl-2',
    name: 'Marie-Claude Fortier',
    company: 'Fortier Immobilier Inc.',
    phone: '514-555-0456',
    email: 'mc@fortierimmo.ca',
    clientType: 'Propriétaire',
    unitCount: 5,
    status: 'active',
    source: 'Site web',
    notes: 'Gère 5 unités dans Rosemont. Très attentive à la qualité des locataires.',
    propertyIds: ['pr-4', 'pr-5'],
    nextAction: 'Appel de suivi hebdomadaire',
    lastActivity: '2026-04-10',
  },
  {
    id: 'cl-3',
    name: 'Robert Lafleur',
    company: '',
    phone: '450-555-0789',
    email: 'robert.lafleur@gmail.com',
    clientType: 'Propriétaire individuel',
    unitCount: 1,
    status: 'onboarding',
    source: 'Facebook',
    notes: 'Nouveau client. Premier immeuble. Besoin d\'accompagnement.',
    propertyIds: ['pr-6'],
    nextAction: 'Compléter l\'onboarding',
    lastActivity: '2026-04-09',
  },
  {
    id: 'cl-4',
    name: 'Nathalie Bergeron',
    company: 'Bergeron & Associés',
    phone: '514-555-0321',
    email: 'n.bergeron@bergeronassoc.ca',
    clientType: 'Gestionnaire',
    unitCount: 8,
    status: 'active',
    source: 'Référence',
    notes: 'Gère un portefeuille de 8 unités. Client depuis 6 mois.',
    propertyIds: ['pr-7'],
    nextAction: 'Revoir stratégie de prix pour unités vacantes',
    lastActivity: '2026-04-12',
  },
  {
    id: 'cl-5',
    name: 'Philippe Tran',
    company: '',
    phone: '514-555-0654',
    email: 'philippe.tran@outlook.com',
    clientType: 'Propriétaire individuel',
    unitCount: 2,
    status: 'lead',
    source: 'Google',
    notes: 'Intéressé mais n\'a pas encore confirmé le mandat.',
    propertyIds: [],
    nextAction: 'Relancer par téléphone',
    lastActivity: '2026-04-07',
  },
  {
    id: 'cl-6',
    name: 'Sylvie Moreau',
    company: 'Moreau Habitation',
    phone: '819-555-0987',
    email: 'sylvie@moreauhabitation.ca',
    clientType: 'Propriétaire',
    unitCount: 4,
    status: 'call_scheduled',
    source: 'LinkedIn',
    notes: 'Appel prévu le 15 avril pour discuter du mandat.',
    propertyIds: [],
    nextAction: 'Appel le 15 avril à 10h',
    lastActivity: '2026-04-08',
  },
];

export const properties: Property[] = [
  {
    id: 'pr-1',
    address: '4125 Rue Saint-Denis, #4',
    city: 'Montréal',
    rent: 1450,
    availabilityDate: '2026-07-01',
    unitType: '4½',
    bedrooms: 2,
    inclusions: ['Eau chaude', 'Rangement'],
    pets: false,
    parking: 1,
    appliances: true,
    status: 'visits_in_progress',
    clientId: 'cl-1',
    demandVolume: 14,
    qualifiedCount: 8,
    candidateIds: ['ca-1', 'ca-2', 'ca-3', 'ca-4', 'ca-5'],
    notes: 'Client veut profil stable, pas étudiant.',
    nextSteps: 'Présenter les 3 meilleurs dossiers au client',
    daysOnMarket: 21,
  },
  {
    id: 'pr-2',
    address: '1080 Boul. René-Lévesque, #12',
    city: 'Montréal',
    rent: 1800,
    availabilityDate: '2026-07-01',
    unitType: '5½',
    bedrooms: 3,
    inclusions: ['Eau chaude', 'Électricité', 'Internet'],
    pets: true,
    parking: 1,
    appliances: true,
    status: 'low_demand',
    clientId: 'cl-1',
    demandVolume: 3,
    qualifiedCount: 1,
    candidateIds: ['ca-6'],
    notes: 'Faible demande malgré les inclusions. Revoir le prix?',
    nextSteps: 'Discuter ajustement de prix avec le client',
    daysOnMarket: 28,
  },
  {
    id: 'pr-3',
    address: '550 Rue Sherbrooke E, #8',
    city: 'Montréal',
    rent: 1250,
    availabilityDate: '2026-07-01',
    unitType: '3½',
    bedrooms: 1,
    inclusions: ['Eau chaude'],
    pets: false,
    parking: 0,
    appliances: false,
    status: 'qualifying',
    clientId: 'cl-1',
    demandVolume: 22,
    qualifiedCount: 12,
    candidateIds: ['ca-7', 'ca-8', 'ca-9'],
    notes: 'Forte demande. Beaucoup de dossiers à traiter.',
    nextSteps: 'Finaliser la préqualification des 5 derniers candidats',
    daysOnMarket: 14,
  },
  {
    id: 'pr-4',
    address: '2340 Rue Masson, #3',
    city: 'Montréal',
    rent: 1350,
    availabilityDate: '2026-08-01',
    unitType: '4½',
    bedrooms: 2,
    inclusions: ['Eau chaude', 'Rangement'],
    pets: true,
    parking: 0,
    appliances: true,
    status: 'active',
    clientId: 'cl-2',
    demandVolume: 9,
    qualifiedCount: 4,
    candidateIds: ['ca-10', 'ca-11'],
    notes: '',
    nextSteps: 'Continuer la qualification des candidats',
    daysOnMarket: 7,
  },
  {
    id: 'pr-5',
    address: '789 Ave du Parc, #6',
    city: 'Montréal',
    rent: 2100,
    availabilityDate: '2026-07-01',
    unitType: '6½',
    bedrooms: 4,
    inclusions: ['Eau chaude', 'Chauffage', 'Rangement'],
    pets: false,
    parking: 2,
    appliances: true,
    status: 'waiting_on_client',
    clientId: 'cl-2',
    demandVolume: 6,
    qualifiedCount: 3,
    candidateIds: ['ca-12'],
    notes: 'Dossiers présentés. En attente de décision depuis 5 jours.',
    nextSteps: 'Relancer la cliente pour obtenir sa décision',
    daysOnMarket: 35,
  },
  {
    id: 'pr-6',
    address: '156 Rue de la Commune, #2',
    city: 'Longueuil',
    rent: 1100,
    availabilityDate: '2026-07-01',
    unitType: '3½',
    bedrooms: 1,
    inclusions: [],
    pets: false,
    parking: 1,
    appliances: false,
    status: 'to_launch',
    clientId: 'cl-3',
    demandVolume: 0,
    qualifiedCount: 0,
    candidateIds: [],
    notes: 'En attente de photos et description complète.',
    nextSteps: 'Finaliser la fiche et publier l\'annonce',
    daysOnMarket: 0,
  },
  {
    id: 'pr-7',
    address: '3200 Rue Hochelaga, #5',
    city: 'Montréal',
    rent: 1550,
    availabilityDate: '2026-07-01',
    unitType: '5½',
    bedrooms: 3,
    inclusions: ['Eau chaude', 'Rangement'],
    pets: true,
    parking: 1,
    appliances: true,
    status: 'rented',
    clientId: 'cl-4',
    demandVolume: 18,
    qualifiedCount: 10,
    candidateIds: [],
    notes: 'Bail signé le 5 avril.',
    nextSteps: 'Dossier complété',
    daysOnMarket: 19,
  },
];

export const candidates: Candidate[] = [
  {
    id: 'ca-1',
    name: 'Sophie Martin',
    phone: '514-555-0199',
    email: 'sophie.martin@mail.com',
    targetPropertyId: 'pr-1',
    moveInDate: '2026-07-01',
    occupants: 1,
    pets: false,
    employment: 'Analyste financière',
    employer: 'Desjardins',
    income: 65000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'to_present',
    pipelineStage: 'to_review',
    source: 'Kijiji',
    notes: 'Profil stable, professionnelle. Disponible pour visite la semaine prochaine.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-03-28',
    daysInStage: 3,
  },
  {
    id: 'ca-2',
    name: 'Marc Tremblay',
    phone: '514-555-0211',
    email: 'marc.tremblay@outlook.com',
    targetPropertyId: 'pr-1',
    moveInDate: '2026-07-01',
    occupants: 2,
    pets: false,
    employment: 'Ingénieur logiciel',
    employer: 'CGI',
    income: 78000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 2,
    status: 'prequalified',
    pipelineStage: 'prequalified',
    source: 'Marketplace Facebook',
    notes: 'Bon profil. Conjoint non vérifié.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: false },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-03-30',
    daysInStage: 5,
  },
  {
    id: 'ca-3',
    name: 'Marie Lavoie',
    phone: '514-555-0233',
    email: 'marie.lavoie@gmail.com',
    targetPropertyId: 'pr-1',
    moveInDate: '2026-07-01',
    occupants: 1,
    pets: false,
    employment: 'Infirmière',
    employer: 'CHUM',
    income: 55000,
    credit: 'good',
    talHistory: 'Aucun dossier',
    qualificationLevel: 2,
    status: 'to_qualify',
    pipelineStage: 'initial_triage',
    source: 'Kijiji',
    notes: '',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: false },
      { name: 'Talon de paie', received: false },
      { name: 'Références', received: false },
    ],
    createdAt: '2026-04-10',
    daysInStage: 2,
  },
  {
    id: 'ca-4',
    name: 'Pierre Gagnon',
    phone: '514-555-0244',
    email: 'pierre.gagnon@mail.com',
    targetPropertyId: 'pr-1',
    moveInDate: '2026-07-01',
    occupants: 1,
    pets: false,
    employment: 'Comptable',
    employer: 'KPMG',
    income: 72000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'prequalified',
    pipelineStage: 'prequalified',
    source: 'Marketplace Facebook',
    notes: 'Excellent dossier.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-04-01',
    daysInStage: 4,
  },
  {
    id: 'ca-5',
    name: 'Luc Bédard',
    phone: '514-555-0255',
    email: 'luc.bedard@hotmail.com',
    targetPropertyId: 'pr-1',
    moveInDate: '2026-07-01',
    occupants: 3,
    pets: true,
    employment: 'Enseignant',
    employer: 'CSDM',
    income: 52000,
    credit: 'fair',
    talHistory: '1 plainte résolue',
    qualificationLevel: 1,
    status: 'qualifying',
    pipelineStage: 'missing_info',
    source: 'Site web',
    notes: 'A un animal. Dossier TAL résolu. Revenu limite.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: false },
      { name: 'Talon de paie', received: false },
      { name: 'Références', received: false },
    ],
    createdAt: '2026-04-05',
    daysInStage: 7,
  },
  {
    id: 'ca-6',
    name: 'Isabelle Roy',
    phone: '514-555-0266',
    email: 'isabelle.roy@gmail.com',
    targetPropertyId: 'pr-2',
    moveInDate: '2026-07-01',
    occupants: 2,
    pets: true,
    employment: 'Designer graphique',
    employer: 'Freelance',
    income: 48000,
    credit: 'good',
    talHistory: 'Aucun dossier',
    qualificationLevel: 2,
    status: 'qualifying',
    pipelineStage: 'missing_info',
    source: 'Kijiji',
    notes: 'Revenu de travailleur autonome à valider.',
    documents: [
      { name: 'Preuve d\'emploi', received: false },
      { name: 'Relevé de crédit', received: true },
      { name: 'Avis de cotisation', received: false },
      { name: 'Références', received: false },
    ],
    createdAt: '2026-04-02',
    daysInStage: 10,
  },
  {
    id: 'ca-7',
    name: 'Ahmed Ben Ali',
    phone: '514-555-0277',
    email: 'ahmed.benali@mail.com',
    targetPropertyId: 'pr-3',
    moveInDate: '2026-07-01',
    occupants: 1,
    pets: false,
    employment: 'Développeur web',
    employer: 'Shopify',
    income: 85000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'prequalified',
    pipelineStage: 'prequalified',
    source: 'Site web',
    notes: 'Excellent candidat.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-04-03',
    daysInStage: 2,
  },
  {
    id: 'ca-8',
    name: 'Julie Côté',
    phone: '514-555-0288',
    email: 'julie.cote@outlook.com',
    targetPropertyId: 'pr-3',
    moveInDate: '2026-07-01',
    occupants: 1,
    pets: false,
    employment: 'Avocate',
    employer: 'Cabinet Lavery',
    income: 92000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'to_present',
    pipelineStage: 'to_review',
    source: 'Référence',
    notes: 'Profil exceptionnel. Prioritaire.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-04-04',
    daysInStage: 1,
  },
  {
    id: 'ca-9',
    name: 'David Nguyen',
    phone: '514-555-0299',
    email: 'david.nguyen@gmail.com',
    targetPropertyId: 'pr-3',
    moveInDate: '2026-07-01',
    occupants: 2,
    pets: false,
    employment: 'Pharmacien',
    employer: 'Jean Coutu',
    income: 75000,
    credit: 'good',
    talHistory: 'Aucun dossier',
    qualificationLevel: 2,
    status: 'new',
    pipelineStage: 'new_message',
    source: 'Marketplace Facebook',
    notes: '',
    documents: [
      { name: 'Preuve d\'emploi', received: false },
      { name: 'Relevé de crédit', received: false },
      { name: 'Talon de paie', received: false },
      { name: 'Références', received: false },
    ],
    createdAt: '2026-04-12',
    daysInStage: 1,
  },
  {
    id: 'ca-10',
    name: 'Émilie Bouchard',
    phone: '514-555-0311',
    email: 'emilie.b@mail.com',
    targetPropertyId: 'pr-4',
    moveInDate: '2026-08-01',
    occupants: 1,
    pets: true,
    employment: 'Enseignante',
    employer: 'CSDM',
    income: 56000,
    credit: 'good',
    talHistory: 'Aucun dossier',
    qualificationLevel: 2,
    status: 'qualifying',
    pipelineStage: 'initial_triage',
    source: 'Kijiji',
    notes: '',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: false },
      { name: 'Talon de paie', received: false },
      { name: 'Références', received: false },
    ],
    createdAt: '2026-04-08',
    daysInStage: 4,
  },
  {
    id: 'ca-11',
    name: 'François Pellerin',
    phone: '514-555-0322',
    email: 'fpellerin@outlook.com',
    targetPropertyId: 'pr-4',
    moveInDate: '2026-08-01',
    occupants: 2,
    pets: false,
    employment: 'Chef cuisinier',
    employer: 'Restaurant Toqué',
    income: 62000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'prequalified',
    pipelineStage: 'prequalified',
    source: 'Site web',
    notes: 'Très bon dossier.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-04-06',
    daysInStage: 3,
  },
  {
    id: 'ca-12',
    name: 'Caroline Perron',
    phone: '514-555-0333',
    email: 'cperron@gmail.com',
    targetPropertyId: 'pr-5',
    moveInDate: '2026-07-01',
    occupants: 4,
    pets: false,
    employment: 'Directrice marketing',
    employer: 'L\'Oréal',
    income: 110000,
    credit: 'excellent',
    talHistory: 'Aucun dossier',
    qualificationLevel: 3,
    status: 'presented',
    pipelineStage: 'presented_to_client',
    source: 'Référence',
    notes: 'Dossier présenté à la cliente. En attente de décision.',
    documents: [
      { name: 'Preuve d\'emploi', received: true },
      { name: 'Relevé de crédit', received: true },
      { name: 'Talon de paie', received: true },
      { name: 'Références', received: true },
    ],
    createdAt: '2026-03-25',
    daysInStage: 5,
  },
];

export const tasks: Task[] = [
  { id: 'tk-1', title: 'Présenter dossiers à Jean Dupont', type: 'follow_up_client', propertyId: 'pr-1', clientId: 'cl-1', dueDate: '2026-04-13', completed: false, priority: 'high', daysOverdue: 0 },
  { id: 'tk-2', title: 'Valider revenu Marie Lavoie', type: 'validate_info', propertyId: 'pr-1', candidateId: 'ca-3', dueDate: '2026-04-13', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-3', title: 'Planifier visite Pierre Gagnon', type: 'schedule_visit', propertyId: 'pr-1', candidateId: 'ca-4', dueDate: '2026-04-14', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-4', title: 'Demander preuve emploi Isabelle Roy', type: 'request_document', propertyId: 'pr-2', candidateId: 'ca-6', dueDate: '2026-04-08', completed: false, priority: 'high', daysOverdue: 5 },
  { id: 'tk-5', title: 'Relancer Marie-Claude Fortier — décision', type: 'follow_up_client', propertyId: 'pr-5', clientId: 'cl-2', dueDate: '2026-04-11', completed: false, priority: 'urgent', daysOverdue: 2 },
  { id: 'tk-6', title: 'Confirmer disponibilité 1080 René-Lévesque', type: 'confirm_availability', propertyId: 'pr-2', clientId: 'cl-1', dueDate: '2026-04-13', completed: false, priority: 'low', daysOverdue: 0 },
  { id: 'tk-7', title: 'Compléter onboarding Robert Lafleur', type: 'follow_up_client', clientId: 'cl-3', dueDate: '2026-04-15', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-8', title: 'Finaliser fiche 156 Rue de la Commune', type: 'validate_info', propertyId: 'pr-6', clientId: 'cl-3', dueDate: '2026-04-14', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-9', title: 'Vérifier crédit Luc Bédard', type: 'validate_info', propertyId: 'pr-1', candidateId: 'ca-5', dueDate: '2026-04-10', completed: false, priority: 'high', daysOverdue: 3 },
  { id: 'tk-10', title: 'Appeler Philippe Tran — suivi prospect', type: 'follow_up_client', clientId: 'cl-5', dueDate: '2026-04-14', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-11', title: 'Qualifier David Nguyen', type: 'validate_info', propertyId: 'pr-3', candidateId: 'ca-9', dueDate: '2026-04-14', completed: false, priority: 'medium', daysOverdue: 0 },
  { id: 'tk-12', title: 'Bail signé — fermer dossier 3200 Hochelaga', type: 'close_file', propertyId: 'pr-7', clientId: 'cl-4', dueDate: '2026-04-12', completed: true, priority: 'low', daysOverdue: 0 },
];

export const communications: Communication[] = [
  {
    id: 'co-1',
    contactName: 'Sophie Martin',
    contactType: 'candidate',
    propertyTag: '4125 Saint-Denis',
    lastMessage: 'Bonjour, voici mes documents comme demandé.',
    lastMessageDate: '2026-04-11T14:32:00',
    unread: true,
    messages: [
      { sender: 'Sophie Martin', text: 'Bonjour, voici mes documents comme demandé.', date: '2026-04-11T14:32:00', attachments: ['preuve_emploi.pdf', 'releve_credit.pdf'] },
      { sender: 'FluxLocatif', text: 'Merci Sophie, nous allons vérifier votre dossier et revenir vers vous rapidement.', date: '2026-04-10T09:15:00' },
      { sender: 'Sophie Martin', text: 'Bonjour, j\'aimerais soumettre ma candidature pour le 4½ sur Saint-Denis.', date: '2026-04-09T11:20:00' },
    ],
  },
  {
    id: 'co-2',
    contactName: 'Pierre Gagnon',
    contactType: 'candidate',
    propertyTag: '4125 Saint-Denis',
    lastMessage: 'Est-ce possible de visiter samedi matin?',
    lastMessageDate: '2026-04-11T10:05:00',
    unread: true,
    messages: [
      { sender: 'Pierre Gagnon', text: 'Est-ce possible de visiter samedi matin?', date: '2026-04-11T10:05:00' },
      { sender: 'FluxLocatif', text: 'Bonjour Pierre, votre dossier est en cours de révision. Nous vous recontacterons pour la visite.', date: '2026-04-08T16:00:00' },
    ],
  },
  {
    id: 'co-3',
    contactName: 'Jean Dupont',
    contactType: 'client',
    propertyTag: 'Général',
    lastMessage: 'Avez-vous des nouvelles pour le 4125?',
    lastMessageDate: '2026-04-10T08:45:00',
    unread: false,
    messages: [
      { sender: 'Jean Dupont', text: 'Avez-vous des nouvelles pour le 4125?', date: '2026-04-10T08:45:00' },
      { sender: 'FluxLocatif', text: 'Bonjour Jean, nous avons 3 dossiers solides à vous présenter. Je vous envoie le résumé demain.', date: '2026-04-10T09:30:00' },
    ],
  },
  {
    id: 'co-4',
    contactName: 'Marie-Claude Fortier',
    contactType: 'client',
    propertyTag: '789 Ave du Parc',
    lastMessage: 'Je regarde le dossier cette semaine.',
    lastMessageDate: '2026-04-08T17:20:00',
    unread: false,
    messages: [
      { sender: 'Marie-Claude Fortier', text: 'Je regarde le dossier cette semaine.', date: '2026-04-08T17:20:00' },
      { sender: 'FluxLocatif', text: 'Parfait, n\'hésitez pas si vous avez des questions sur le dossier de Caroline.', date: '2026-04-08T17:25:00' },
    ],
  },
  {
    id: 'co-5',
    contactName: 'Luc Bédard',
    contactType: 'candidate',
    propertyTag: '4125 Saint-Denis',
    lastMessage: 'Je vais envoyer mon relevé de crédit demain.',
    lastMessageDate: '2026-04-09T13:10:00',
    unread: false,
    messages: [
      { sender: 'Luc Bédard', text: 'Je vais envoyer mon relevé de crédit demain.', date: '2026-04-09T13:10:00' },
      { sender: 'FluxLocatif', text: 'Bonjour Luc, nous avons besoin de votre relevé de crédit et de vos talons de paie pour compléter votre dossier.', date: '2026-04-09T10:00:00' },
    ],
  },
];

export const activities: ActivityItem[] = [
  { id: 'ac-1', type: 'document', description: 'Sophie Martin — Documents reçus (preuve emploi, crédit)', date: '2026-04-11T14:32:00', entityType: 'candidate', entityId: 'ca-1' },
  { id: 'ac-2', type: 'status_change', description: 'Pierre Gagnon — Statut changé à Préqualifié', date: '2026-04-09T15:00:00', entityType: 'candidate', entityId: 'ca-4' },
  { id: 'ac-3', type: 'communication', description: 'Jean Dupont — Demande de mise à jour', date: '2026-04-10T08:45:00', entityType: 'client', entityId: 'cl-1' },
  { id: 'ac-4', type: 'status_change', description: '3200 Hochelaga — Statut changé à Loué', date: '2026-04-05T10:00:00', entityType: 'property', entityId: 'pr-7' },
  { id: 'ac-5', type: 'note', description: 'Note ajoutée — 4125 Saint-Denis: Client veut profil stable', date: '2026-04-08T11:00:00', entityType: 'property', entityId: 'pr-1' },
  { id: 'ac-6', type: 'task', description: 'Tâche complétée — Bail signé 3200 Hochelaga', date: '2026-04-05T10:30:00', entityType: 'property', entityId: 'pr-7' },
  { id: 'ac-7', type: 'status_change', description: 'David Nguyen — Nouveau candidat pour 550 Sherbrooke', date: '2026-04-12T09:00:00', entityType: 'candidate', entityId: 'ca-9' },
  { id: 'ac-8', type: 'communication', description: 'Luc Bédard — Promet le relevé de crédit pour demain', date: '2026-04-09T13:10:00', entityType: 'candidate', entityId: 'ca-5' },
];

// Helper functions
export function getClient(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}

export function getProperty(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export function getCandidate(id: string): Candidate | undefined {
  return candidates.find(c => c.id === id);
}

export function getCandidatesForProperty(propertyId: string): Candidate[] {
  return candidates.filter(c => c.targetPropertyId === propertyId);
}

export function getTasksForProperty(propertyId: string): Task[] {
  return tasks.filter(t => t.propertyId === propertyId);
}

export function getTasksForClient(clientId: string): Task[] {
  return tasks.filter(t => t.clientId === clientId);
}

export function getPropertiesForClient(clientId: string): Property[] {
  return properties.filter(p => p.clientId === clientId);
}

export const clientStatusLabels: Record<ClientStatus, string> = {
  lead: 'Prospect',
  contacted: 'Contacté',
  call_scheduled: 'Appel planifié',
  onboarding: 'Onboarding',
  active: 'Actif',
  paused: 'En pause',
  closed: 'Fermé',
};

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  to_launch: 'À lancer',
  active: 'Active',
  low_demand: 'Faible demande',
  qualifying: 'Qualification',
  visits_in_progress: 'Visites en cours',
  waiting_on_client: 'En attente client',
  rented: 'Louée',
  closed: 'Fermée',
};

export const candidateStatusLabels: Record<CandidateStatus, string> = {
  new: 'Nouveau',
  to_qualify: 'À qualifier',
  qualifying: 'En qualification',
  prequalified: 'Préqualifié',
  to_present: 'À présenter',
  presented: 'Présenté',
  rejected: 'Rejeté',
  selected: 'Sélectionné',
  visit_to_schedule: 'Visite à planifier',
};

export const pipelineStageLabels: Record<PipelineStage, string> = {
  new_message: 'Nouveau message',
  initial_triage: 'Triage initial',
  missing_info: 'Info manquante',
  prequalified: 'Préqualifié',
  to_review: 'À réviser',
  presented_to_client: 'Présenté au client',
  visit: 'Visite',
  decision: 'Décision',
  signed: 'Signé',
  rejected: 'Rejeté',
};

export const pipelineStageOrder: PipelineStage[] = [
  'new_message',
  'initial_triage',
  'missing_info',
  'prequalified',
  'to_review',
  'presented_to_client',
  'visit',
  'decision',
  'signed',
  'rejected',
];
