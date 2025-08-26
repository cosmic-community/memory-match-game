// Format time in seconds to MM:SS format
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Calculate score based on game performance
export function calculateScore(
  matches: number,
  moves: number,
  timeElapsed: number,
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
): number {
  const baseScore = matches * 100
  const difficultyMultipliers = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
    expert: 3.0,
  }
  
  const difficultyBonus = baseScore * (difficultyMultipliers[difficulty] - 1)
  const timeBonus = Math.max(0, 1000 - timeElapsed * 10)
  const accuracyBonus = matches > 0 ? (matches / moves) * 500 : 0
  
  return Math.floor(baseScore + difficultyBonus + timeBonus + accuracyBonus)
}

// Get performance rating based on accuracy and time
export function getPerformanceRating(accuracy: number, timeElapsed: number, difficulty: string): string {
  if (accuracy >= 90 && timeElapsed < 60) return '🌟 Perfect!'
  if (accuracy >= 80 && timeElapsed < 120) return '🔥 Excellent!'
  if (accuracy >= 70 && timeElapsed < 180) return '👍 Great!'
  if (accuracy >= 60) return '👌 Good!'
  return '💪 Keep practicing!'
}

// Validate if a difficulty level is valid
export function isValidDifficulty(difficulty: string): difficulty is 'easy' | 'medium' | 'hard' | 'expert' {
  return ['easy', 'medium', 'hard', 'expert'].includes(difficulty)
}

// Generate a random game ID
export function generateGameId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Check if device supports localStorage
export function hasLocalStorage(): boolean {
  try {
    if (typeof window === 'undefined') return false
    const test = '__localStorage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Deep clone utility for immutable updates
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const cloned = {} as { [key: string]: unknown }
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone((obj as { [key: string]: unknown })[key])
    })
    return cloned as T
  }
  return obj
}