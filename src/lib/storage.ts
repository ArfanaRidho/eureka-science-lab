'use client';

const BOOKMARKS_KEY = 'eurekalab_bookmarks';
const READ_ARTICLES_KEY = 'eurekalab_read_articles';
const QUIZ_STATS_KEY = 'eurekalab_quiz_stats';
const RECENT_KEY = 'eurekalab_recently_viewed';

export interface QuizStats {
  answeredCount: number;
  correctCount: number;
  streak: number;
  bestStreak: number;
  answeredQuestionIds: string[];
}

export interface RecentItem {
  slug: string;
  title: string;
  category: string;
  timestamp: number;
}

// Custom event to sync across components
export const notifyStorageChange = (type: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('eurekalab_storage_update', { detail: { type } }));
  }
};

// Bookmarks
export const getBookmarks = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleBookmark = (slug: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const bookmarks = getBookmarks();
    const index = bookmarks.indexOf(slug);
    let isNowBookmarked = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
      isNowBookmarked = false;
    } else {
      bookmarks.push(slug);
      isNowBookmarked = true;
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    notifyStorageChange('bookmarks');
    return isNowBookmarked;
  } catch {
    return false;
  }
};

export const isBookmarked = (slug: string): boolean => {
  if (typeof window === 'undefined') return false;
  const bookmarks = getBookmarks();
  return bookmarks.includes(slug);
};

// Read Articles
export const getReadArticles = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(READ_ARTICLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const markArticleAsRead = (slug: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const list = getReadArticles();
    if (!list.includes(slug)) {
      list.push(slug);
      localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(list));
      notifyStorageChange('read_articles');
    }
  } catch {
    // Ignore error
  }
};

// Quiz Stats
export const getQuizStats = (): QuizStats => {
  if (typeof window === 'undefined') {
    return { answeredCount: 0, correctCount: 0, streak: 0, bestStreak: 0, answeredQuestionIds: [] };
  }
  try {
    const raw = localStorage.getItem(QUIZ_STATS_KEY);
    return raw
      ? JSON.parse(raw)
      : { answeredCount: 0, correctCount: 0, streak: 0, bestStreak: 0, answeredQuestionIds: [] };
  } catch {
    return { answeredCount: 0, correctCount: 0, streak: 0, bestStreak: 0, answeredQuestionIds: [] };
  }
};

export const recordQuizAnswer = (questionId: string, isCorrect: boolean): QuizStats => {
  if (typeof window === 'undefined') {
    return { answeredCount: 0, correctCount: 0, streak: 0, bestStreak: 0, answeredQuestionIds: [] };
  }
  try {
    const stats = getQuizStats();
    stats.answeredCount += 1;
    if (!stats.answeredQuestionIds.includes(questionId)) {
      stats.answeredQuestionIds.push(questionId);
    }
    if (isCorrect) {
      stats.correctCount += 1;
      stats.streak += 1;
      if (stats.streak > stats.bestStreak) {
        stats.bestStreak = stats.streak;
      }
    } else {
      stats.streak = 0;
    }
    localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(stats));
    notifyStorageChange('quiz');
    return stats;
  } catch {
    return { answeredCount: 0, correctCount: 0, streak: 0, bestStreak: 0, answeredQuestionIds: [] };
  }
};

// Recently Viewed
export const getRecentViews = (): RecentItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentView = (slug: string, title: string, category: string): void => {
  if (typeof window === 'undefined') return;
  try {
    let list = getRecentViews();
    list = list.filter((item) => item.slug !== slug);
    list.unshift({ slug, title, category, timestamp: Date.now() });
    if (list.length > 8) list = list.slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    notifyStorageChange('recent');
  } catch {
    // Ignore error
  }
};

export const clearUserData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BOOKMARKS_KEY);
  localStorage.removeItem(READ_ARTICLES_KEY);
  localStorage.removeItem(QUIZ_STATS_KEY);
  localStorage.removeItem(RECENT_KEY);
  notifyStorageChange('all');
};
