export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
  score: number;
  accuracy: number;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  gameStats: GameStats;
  isGameComplete: boolean;
  gameStartTime: number | null;
}

export interface HighScore {
  score: number;
  moves: number;
  time: number;
  accuracy: number;
  date: string;
  difficulty: DifficultyLevel;
}

export interface DifficultyConfig {
  name: string;
  rows: number;
  cols: number;
  pairs: number;
  timeBonus: number;
  difficultyMultiplier: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    name: 'Easy',
    rows: 3,
    cols: 4,
    pairs: 6,
    timeBonus: 10,
    difficultyMultiplier: 1.0,
  },
  medium: {
    name: 'Medium',
    rows: 4,
    cols: 4,
    pairs: 8,
    timeBonus: 15,
    difficultyMultiplier: 1.5,
  },
  hard: {
    name: 'Hard',
    rows: 4,
    cols: 5,
    pairs: 10,
    timeBonus: 20,
    difficultyMultiplier: 2.0,
  },
  expert: {
    name: 'Expert',
    rows: 6,
    cols: 6,
    pairs: 18,
    timeBonus: 25,
    difficultyMultiplier: 3.0,
  },
};

export interface StoredGameData {
  highScores: Record<DifficultyLevel, HighScore[]>;
  totalGamesPlayed: number;
  totalMatches: number;
  bestTimes: Record<DifficultyLevel, number>;
  averageAccuracy: number;
}

// Card symbols/emojis for the game
export const CARD_SYMBOLS = [
  '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻',
  '🏀', '⚽', '🏈', '🎾', '🏐', '🏓', '🏸', '🏒',
  '🌟', '💎', '🔥', '❄️', '🌈', '⚡', '🌙', '☀️',
  '🚗', '✈️', '🚢', '🚀', '🎡', '🎢', '🎠', '🎪',
  '🍎', '🍌', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭'
];

// Type guard functions
export function isDifficultyLevel(value: string): value is DifficultyLevel {
  return ['easy', 'medium', 'hard', 'expert'].includes(value);
}

export function isValidCard(obj: unknown): obj is Card {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Card).id === 'number' &&
    typeof (obj as Card).value === 'string' &&
    typeof (obj as Card).isFlipped === 'boolean' &&
    typeof (obj as Card).isMatched === 'boolean'
  );
}