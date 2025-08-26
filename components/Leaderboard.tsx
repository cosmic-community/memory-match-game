'use client'

import { StoredGameData, DifficultyLevel, DIFFICULTY_CONFIGS } from '@/types'
import { formatTime } from '@/lib/utils'
import { useState } from 'react'

interface LeaderboardProps {
  storedData: StoredGameData;
  currentDifficulty: DifficultyLevel;
  onClose: () => void;
}

export default function Leaderboard({ storedData, currentDifficulty, onClose }: LeaderboardProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(currentDifficulty)
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert']

  const highScores = storedData.highScores[selectedDifficulty] || []

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">🏆 Leaderboard</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Difficulty Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {DIFFICULTY_CONFIGS[difficulty].name}
              </button>
            ))}
          </div>

          {/* High Scores */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {highScores.length > 0 ? (
              highScores.map((score, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0
                      ? 'bg-yellow-50 border-yellow-400'
                      : index === 1
                      ? 'bg-gray-50 border-gray-400'
                      : index === 2
                      ? 'bg-orange-50 border-orange-400'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {score.score.toLocaleString()} pts
                        </div>
                        <div className="text-sm text-gray-600">
                          {score.moves} moves • {formatTime(score.time)} • {score.accuracy.toFixed(0)}% accuracy
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(score.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🎮</div>
                <div className="text-xl font-semibold mb-2">No scores yet!</div>
                <div>Complete a game to see your score here.</div>
              </div>
            )}
          </div>

          {/* Overall Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-4">📊 Overall Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {storedData.totalGamesPlayed}
                </div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {storedData.totalMatches}
                </div>
                <div className="text-sm text-gray-600">Total Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {storedData.averageAccuracy.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {storedData.bestTimes[selectedDifficulty] !== Infinity 
                    ? formatTime(storedData.bestTimes[selectedDifficulty])
                    : '--'
                  }
                </div>
                <div className="text-sm text-gray-600">Best Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}