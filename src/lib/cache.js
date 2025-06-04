import { superbase } from './supabaseClient';

// Key used for localStorage
const CACHE_KEY = 'cachedQuestions';

export async function fetchQuestionsWithCache() {
  // 1. Check localStorage
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log('[CACHE] Loaded questions from localStorage');
        return parsed;
      }
    } catch (e) {
      console.error('[CACHE] Failed to parse localStorage:', e);
    }
  }

  // 2. Fetch from Supabase
  const { data, error } = await superbase.from('questions').select('*');
  if (error) {
    console.error('[SUPABASE] Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }

  // 3. Save to localStorage
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    console.log('[CACHE] Questions cached to localStorage');
  } catch (e) {
    console.error('[CACHE] Failed to save to localStorage:', e);
  }

  return data;
}

export function clearCachedQuestions() {
  localStorage.removeItem(CACHE_KEY);
}
