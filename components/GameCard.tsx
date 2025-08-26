'use client'

import { Card } from '@/types'
import { useState, useEffect } from 'react'

interface GameCardProps {
  card: Card;
  onClick: () => void;
  isClickable: boolean;
}

export default function GameCard({ card, onClick, isClickable }: GameCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showWrongMatch, setShowWrongMatch] = useState(false)

  // Handle match animation
  useEffect(() => {
    if (card.isMatched) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [card.isMatched])

  const handleClick = () => {
    if (isClickable) {
      onClick()
    } else if (!card.isMatched && !card.isFlipped) {
      // Show wrong match animation for non-clickable cards
      setShowWrongMatch(true)
      setTimeout(() => setShowWrongMatch(false), 400)
    }
  }

  return (
    <div 
      className={`
        card-flip cursor-pointer select-none
        ${card.isFlipped || card.isMatched ? 'card-flipped' : ''}
        ${isAnimating ? 'match-animation' : ''}
        ${showWrongMatch ? 'wrong-match' : ''}
      `}
      onClick={handleClick}
      style={{
        width: '70px',
        height: '70px',
      }}
    >
      <div className="card-inner">
        {/* Card Back (face down) */}
        <div className="card-front card-face bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 card-shadow">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Card Front (face up) */}
        <div 
          className={`
            card-back card-face bg-white border-2 text-4xl font-bold card-shadow
            ${card.isMatched ? 'border-green-400 bg-green-50' : 'border-gray-200'}
          `}
        >
          {card.value}
        </div>
      </div>
    </div>
  )
}