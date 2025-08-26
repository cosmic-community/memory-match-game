'use client'

import { GameState } from '@/types'
import { formatTime } from '@/lib/utils'

interface GameStatsProps {
  gameState: GameState;
}

export default function GameStats({ gameState }: GameStatsProps) {
  const { gameStats, isGameComplete, gameStartTime } = gameState

  // Calculate current time if game is in progress
  const currentTime = gameStartTime ? 
    (isGameComplete ? gameStats.timeElapsed : Date.now() - gameStartTime) / 1000 
    : 0

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Game Stats</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="stat-card">
          <div className="text-2xl font-bold text-blue-300">
            {gameStats.moves}
          </div>
          <div className="text-sm opacity-80">Moves</div>
        </div>

        <div className="stat-card">
          <div className="text-2xl font-bold text-green-300">
            {gameStats.matches}
          </div>
          <div className="text-sm opacity-80">Matches</div>
        </div>

        <div className="stat-card">
          <div className="text-2xl font-bold text-purple-300">
            {formatTime(Math.floor(currentTime))}
          </div>
          <div className="text-sm opacity-80">Time</div>
        </div>

        <div className="stat-card">
          <div className="text-2xl font-bold text-yellow-300">
            {gameStats.accuracy.toFixed(0)}%
          </div>
          <div className="text-sm opacity-80">Accuracy</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="text-3xl font-bold text-orange-300">
          {gameStats.score.toLocaleString()}
        </div>
        <div className="text-sm opacity-80">Current Score</div>
      </div>

      {isGameComplete && (
        <div className="stat-card bg-green-500/20 border-green-400">
          <div className="text-xl font-bold text-green-300">
            🎉 Game Complete!
          </div>
          <div className="text-sm opacity-80 mt-2">
            Final Score: {gameStats.score.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  )
}