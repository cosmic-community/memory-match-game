'use client'

import { DifficultyLevel, DIFFICULTY_CONFIGS } from '@/types'
import { formatTime } from '@/lib/utils'

interface CelebrationModalProps {
  score: number;
  isNewRecord: boolean;
  stats: {
    moves: number;
    time: number;
    accuracy: number;
  };
  difficulty: DifficultyLevel;
  onClose: () => void;
  onNewGame: () => void;
}

export default function CelebrationModal({
  score,
  isNewRecord,
  stats,
  difficulty,
  onClose,
  onNewGame,
}: CelebrationModalProps) {
  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty]

  return (
    <div className="celebration-overlay">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className={`p-6 text-center text-white ${
          isNewRecord 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
            : 'bg-gradient-to-r from-green-500 to-blue-500'
        }`}>
          <div className="text-6xl mb-2">
            {isNewRecord ? '🏆' : '🎉'}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {isNewRecord ? 'New Record!' : 'Congratulations!'}
          </h2>
          <p className="text-lg opacity-90">
            You completed {difficultyConfig.name} mode!
          </p>
        </div>

        {/* Stats */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {score.toLocaleString()}
            </div>
            <div className="text-gray-600">Final Score</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.moves}</div>
              <div className="text-sm text-gray-600">Moves</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatTime(stats.time)}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.accuracy.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          {isNewRecord && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6 text-center">
              <div className="text-yellow-700 font-semibold">
                🌟 New High Score for {difficultyConfig.name} mode! 🌟
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onNewGame}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              View Board
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}