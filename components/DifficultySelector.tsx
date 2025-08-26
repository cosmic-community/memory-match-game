'use client'

import { DifficultyLevel, DIFFICULTY_CONFIGS } from '@/types'

interface DifficultySelectorProps {
  currentDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

export default function DifficultySelector({ currentDifficulty, onDifficultyChange }: DifficultySelectorProps) {
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert']

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {difficulties.map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty]
          const isSelected = currentDifficulty === difficulty

          return (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`difficulty-button ${isSelected ? 'selected' : ''}`}
            >
              <div className="text-lg font-bold mb-1">{config.name}</div>
              <div className="text-sm opacity-80">
                {config.rows}×{config.cols}
              </div>
              <div className="text-xs opacity-60 mt-1">
                {config.pairs} pairs
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}