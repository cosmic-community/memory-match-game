'use client'

import { useState, useEffect } from 'react'
import GameBoard from '@/components/GameBoard'
import DifficultySelector from '@/components/DifficultySelector'
import GameStats from '@/components/GameStats'
import Leaderboard from '@/components/Leaderboard'
import CelebrationModal from '@/components/CelebrationModal'
import { DifficultyLevel, GameState, HighScore, StoredGameData } from '@/types'
import { initializeGame, saveGameData, loadGameData } from '@/lib/gameLogic'

export default function HomePage() {
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('easy')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [storedData, setStoredData] = useState<StoredGameData | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState<{
    score: number;
    isNewRecord: boolean;
    stats: { moves: number; time: number; accuracy: number };
  } | null>(null)

  // Load saved game data on component mount
  useEffect(() => {
    const data = loadGameData()
    setStoredData(data)
  }, [])

  // Initialize game when difficulty changes or on first load
  useEffect(() => {
    const newGameState = initializeGame(currentDifficulty)
    setGameState(newGameState)
  }, [currentDifficulty])

  // Handle game completion
  useEffect(() => {
    if (gameState && gameState.isGameComplete && storedData) {
      const timeElapsed = gameState.gameStats.timeElapsed
      const score = gameState.gameStats.score
      const moves = gameState.gameStats.moves
      const accuracy = gameState.gameStats.accuracy

      // Create new high score entry
      const newHighScore: HighScore = {
        score,
        moves,
        time: timeElapsed,
        accuracy,
        date: new Date().toISOString(),
        difficulty: currentDifficulty,
      }

      // Check if it's a new record
      const currentHighScores = storedData.highScores[currentDifficulty] || []
      const isNewRecord = currentHighScores.length === 0 || score > currentHighScores[0].score

      // Update stored data
      const updatedData: StoredGameData = {
        ...storedData,
        highScores: {
          ...storedData.highScores,
          [currentDifficulty]: [...currentHighScores, newHighScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10), // Keep only top 10
        },
        totalGamesPlayed: storedData.totalGamesPlayed + 1,
        totalMatches: storedData.totalMatches + gameState.gameStats.matches,
        bestTimes: {
          ...storedData.bestTimes,
          [currentDifficulty]: Math.min(
            storedData.bestTimes[currentDifficulty] || Infinity,
            timeElapsed
          ),
        },
      }

      // Calculate new average accuracy
      const totalAccuracy = storedData.averageAccuracy * (storedData.totalGamesPlayed - 1) + accuracy
      updatedData.averageAccuracy = totalAccuracy / updatedData.totalGamesPlayed

      // Save updated data
      saveGameData(updatedData)
      setStoredData(updatedData)

      // Show celebration modal
      setCelebrationData({
        score,
        isNewRecord,
        stats: { moves, time: timeElapsed, accuracy },
      })
      setShowCelebration(true)
    }
  }, [gameState, storedData, currentDifficulty])

  const handleNewGame = () => {
    const newGameState = initializeGame(currentDifficulty)
    setGameState(newGameState)
    setShowCelebration(false)
    setCelebrationData(null)
  }

  const handleDifficultyChange = (difficulty: DifficultyLevel) => {
    setCurrentDifficulty(difficulty)
    setShowCelebration(false)
    setCelebrationData(null)
  }

  if (!gameState || !storedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Memory Match
          </h1>
          <p className="text-xl text-white/80">
            Challenge your memory and find all the matching pairs!
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-8">
          <DifficultySelector
            currentDifficulty={currentDifficulty}
            onDifficultyChange={handleDifficultyChange}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Stats */}
          <div className="lg:col-span-1">
            <GameStats gameState={gameState} />
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleNewGame}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                New Game
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Leaderboard
              </button>
            </div>
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard
              gameState={gameState}
              onGameStateChange={setGameState}
            />
          </div>
        </div>

        {/* Leaderboard Modal */}
        {showLeaderboard && (
          <Leaderboard
            storedData={storedData}
            currentDifficulty={currentDifficulty}
            onClose={() => setShowLeaderboard(false)}
          />
        )}

        {/* Celebration Modal */}
        {showCelebration && celebrationData && (
          <CelebrationModal
            score={celebrationData.score}
            isNewRecord={celebrationData.isNewRecord}
            stats={celebrationData.stats}
            difficulty={currentDifficulty}
            onClose={() => setShowCelebration(false)}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  )
}