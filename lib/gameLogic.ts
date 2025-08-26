import { 
  Card, 
  GameState, 
  DifficultyLevel, 
  DIFFICULTY_CONFIGS, 
  CARD_SYMBOLS, 
  StoredGameData,
  HighScore 
} from '@/types'

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Create cards for the game
export function createCards(difficulty: DifficultyLevel): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const totalPairs = config.pairs
  
  // Select random symbols for this game
  const selectedSymbols = shuffleArray(CARD_SYMBOLS).slice(0, totalPairs)
  
  // Create pairs of cards
  const cards: Card[] = []
  selectedSymbols.forEach((symbol, index) => {
    // Add two cards for each symbol (a pair)
    cards.push(
      {
        id: index * 2,
        value: symbol,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: index * 2 + 1,
        value: symbol,
        isFlipped: false,
        isMatched: false,
      }
    )
  })
  
  // Shuffle the cards
  return shuffleArray(cards)
}

// Initialize a new game
export function initializeGame(difficulty: DifficultyLevel): GameState {
  const cards = createCards(difficulty)
  
  return {
    cards,
    flippedCards: [],
    gameStats: {
      moves: 0,
      matches: 0,
      timeElapsed: 0,
      score: 0,
      accuracy: 100,
    },
    isGameComplete: false,
    gameStartTime: null,
  }
}

// Handle card click logic
export function handleCardClick(gameState: GameState, cardId: number): GameState {
  const { cards, flippedCards, gameStats } = gameState
  const config = DIFFICULTY_CONFIGS[
    Object.keys(DIFFICULTY_CONFIGS).find(key => 
      DIFFICULTY_CONFIGS[key as DifficultyLevel].pairs * 2 === cards.length
    ) as DifficultyLevel
  ]

  // Don't allow more than 2 cards to be flipped
  if (flippedCards.length >= 2) {
    return gameState
  }

  // Don't flip already flipped or matched cards
  const targetCard = cards.find(card => card.id === cardId)
  if (!targetCard || targetCard.isFlipped || targetCard.isMatched) {
    return gameState
  }

  // Start timer on first move
  const gameStartTime = gameState.gameStartTime || Date.now()

  // Flip the card
  const newCards = cards.map(card =>
    card.id === cardId ? { ...card, isFlipped: true } : card
  )

  const newFlippedCards = [...flippedCards, cardId]
  let newGameStats = { ...gameStats }

  // If this is the second card flipped, check for match
  if (newFlippedCards.length === 2) {
    const [firstId, secondId] = newFlippedCards
    const firstCard = newCards.find(c => c.id === firstId)
    const secondCard = newCards.find(c => c.id === secondId)

    newGameStats.moves += 1

    if (firstCard && secondCard && firstCard.value === secondCard.value) {
      // Match found!
      newGameStats.matches += 1
      
      // Mark cards as matched
      newCards.forEach(card => {
        if (card.id === firstId || card.id === secondId) {
          card.isMatched = true
        }
      })

      // Calculate score
      const basePoints = 100
      const difficultyMultiplier = config?.difficultyMultiplier || 1
      const matchPoints = Math.floor(basePoints * difficultyMultiplier)
      newGameStats.score += matchPoints

      // Clear flipped cards immediately for matches
      const updatedGameState = {
        ...gameState,
        cards: newCards,
        flippedCards: [],
        gameStats: newGameStats,
        gameStartTime,
      }

      // Check if game is complete
      const isComplete = newCards.every(card => card.isMatched)
      if (isComplete) {
        const timeElapsed = (Date.now() - gameStartTime) / 1000
        const timeBonus = Math.max(0, (config?.timeBonus || 0) * 10 - Math.floor(timeElapsed))
        
        newGameStats.timeElapsed = timeElapsed
        newGameStats.score += timeBonus
        newGameStats.accuracy = (newGameStats.matches / newGameStats.moves) * 100

        return {
          ...updatedGameState,
          gameStats: newGameStats,
          isGameComplete: true,
        }
      }

      return updatedGameState
    }
  }

  // Calculate accuracy
  if (newGameStats.moves > 0) {
    newGameStats.accuracy = (newGameStats.matches / newGameStats.moves) * 100
  }

  return {
    ...gameState,
    cards: newCards,
    flippedCards: newFlippedCards,
    gameStats: newGameStats,
    gameStartTime,
  }
}

// Local storage functions
export function saveGameData(data: StoredGameData): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('memoryMatchGameData', JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save game data:', error)
    }
  }
}

export function loadGameData(): StoredGameData {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('memoryMatchGameData')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load game data:', error)
    }
  }

  // Return default data structure
  return {
    highScores: {
      easy: [],
      medium: [],
      hard: [],
      expert: [],
    },
    totalGamesPlayed: 0,
    totalMatches: 0,
    bestTimes: {
      easy: Infinity,
      medium: Infinity,
      hard: Infinity,
      expert: Infinity,
    },
    averageAccuracy: 0,
  }
}