'use client'

import { useEffect, useCallback } from 'react'
import { GameState, Card, DIFFICULTY_CONFIGS } from '@/types'
import GameCard from '@/components/GameCard'
import { handleCardClick } from '@/lib/gameLogic'

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (gameState: GameState) => void;
}

export default function GameBoard({ gameState, onGameStateChange }: GameBoardProps) {
  const { cards, isGameComplete } = gameState

  // Determine grid configuration based on total cards
  const totalCards = cards.length
  const config = Object.values(DIFFICULTY_CONFIGS).find(c => c.pairs * 2 === totalCards)
  
  if (!config) {
    return <div className="text-white">Invalid game configuration</div>
  }

  const gridCols = config.cols
  const gridRows = config.rows

  const onCardClick = useCallback((cardId: number) => {
    if (isGameComplete) return
    
    const updatedGameState = handleCardClick(gameState, cardId)
    onGameStateChange(updatedGameState)
  }, [gameState, onGameStateChange, isGameComplete])

  // Auto-flip cards back if no match after 1.5 seconds
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstId, secondId] = gameState.flippedCards
      const firstCard = gameState.cards.find(c => c.id === firstId)
      const secondCard = gameState.cards.find(c => c.id === secondId)

      if (firstCard && secondCard && firstCard.value !== secondCard.value) {
        const timer = setTimeout(() => {
          const resetGameState = {
            ...gameState,
            cards: gameState.cards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            ),
            flippedCards: [],
          }
          onGameStateChange(resetGameState)
        }, 1500)

        return () => clearTimeout(timer)
      }
    }
  }, [gameState, onGameStateChange])

  return (
    <div className="flex justify-center">
      <div 
        className="game-grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
      >
        {cards.map((card: Card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card.id)}
            isClickable={
              !isGameComplete && 
              !card.isMatched && 
              gameState.flippedCards.length < 2 && 
              !card.isFlipped
            }
          />
        ))}
      </div>
    </div>
  )
}