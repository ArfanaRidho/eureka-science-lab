export type CategoryId =
  | 'fisika-energi'
  | 'teknologi-komputer'
  | 'kedokteran'
  | 'astronomi-antariksa'
  | 'kimia-biologi'
  | 'matematika'
  | 'rekayasa-transportasi'
  | 'ilmuwan-indonesia';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  englishName: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
}

export type HistoricalPeriodId =
  | 'kuno'
  | 'abad-pertengahan'
  | 'revolusi-ilmiah'
  | 'revolusi-industri'
  | 'abad-20'
  | 'modern-digital';

export interface HistoricalPeriodInfo {
  id: HistoricalPeriodId;
  name: string;
  timeRange: string;
  description: string;
}

export interface DiscoveryContent {
  problemOrQuestion: string; // "Pertanyaan Pemantik"
  historicalBackground: string;
  discoveryProcess: string;
  breakthroughsAndChallenges: string;
  scientificExplanation: {
    simple: string;
    corePrinciples: {
      title: string;
      detail: string;
      formulaOrLaw?: string;
    }[];
  };
  timelineEvents: {
    year: string;
    event: string;
    significance: string;
  }[];
  societalImpact: string[];
  interestingFacts: string[];
  sourceReferences: {
    title: string;
    authors?: string;
    year?: string;
    sourceType: string;
    note?: string;
  }[];
}

export interface Discovery {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: CategoryId;
  historicalPeriod: HistoricalPeriodId;
  yearOrDate: string;
  yearNumeric: number;
  heroVisual: {
    type: 'icon' | 'badge' | 'formula';
    value: string;
    accent: string;
  };
  scientistIds: string[];
  readingTime: string;
  content: DiscoveryContent;
  relatedDiscoverySlugs: string[];
  isFeatured?: boolean;
  simulationType?: 'orbit' | 'circuit' | 'atom' | 'pendulum';
}

export interface Scientist {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  lifespan: string;
  birthYear: number;
  deathYear?: number;
  countryOrContext: string;
  field: string;
  quote: string;
  biography: string;
  majorContributions: string[];
  collaborationContext: string;
  historicalTimeline: {
    year: string;
    milestone: string;
  }[];
  sourceReferences: {
    title: string;
    note: string;
  }[];
  discoverySlugs: string[];
  avatarInitial: string;
  avatarColor: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  category: CategoryId;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  scientistRelated?: string;
  discoverySlug?: string;
}

export interface TimelineMilestone {
  id: string;
  period: HistoricalPeriodId;
  year: string;
  yearNumeric: number;
  title: string;
  summary: string;
  category: CategoryId;
  keyFigure: string;
  discoverySlug?: string;
  impactBadge: string;
}

export interface UserProgress {
  bookmarks: string[]; // discovery slugs
  readArticles: string[]; // discovery slugs
  quizAnswers: { [questionId: string]: boolean };
  quizStreak: number;
  bestScore: number;
  achievements: string[];
  lastVisited: { slug: string; title: string; timestamp: number }[];
}
