# Memory Match Game

![Game Preview](https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=300&fit=crop&auto=format)

A captivating memory card matching game with multiple difficulty levels, score tracking, and local leaderboards. Challenge yourself to find matching pairs while racing against time!

## ✨ Features

- **Multiple Difficulty Levels**: Easy (4x3), Medium (4x4), Hard (5x4), Expert (6x6)
- **Comprehensive Score Tracking**: Points, time bonuses, accuracy tracking
- **Local Leaderboards**: High scores saved for each difficulty level
- **Smooth Animations**: Card flip effects and match celebrations
- **Responsive Design**: Perfect gameplay on desktop and mobile
- **Game Statistics**: Track your progress and improvement over time
- **Clean Modern UI**: Intuitive interface with vibrant card designs

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad290904ea77b1e31e579e&clone_repository=68ad3cfaa4794b6d8c70831b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built as standalone game application

### Code Generation Prompt

> Create a memory card matching game with different difficulty levels and score tracking

The app has been tailored to work as a standalone interactive game with local data persistence and includes all the features requested above.

## 🛠 Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Animations**: CSS transitions and transforms
- **Data Persistence**: localStorage for scores and statistics
- **Deployment**: Optimized for Vercel, Netlify, or static hosting

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- Bun (recommended) or npm

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd memory-match-game
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to start playing!

## 🎮 Game Features

### Difficulty Levels
- **Easy**: 4x3 grid (12 cards, 6 pairs)
- **Medium**: 4x4 grid (16 cards, 8 pairs)
- **Hard**: 5x4 grid (20 cards, 10 pairs)
- **Expert**: 6x6 grid (36 cards, 18 pairs)

### Scoring System
- **Match Points**: Base points per successful match
- **Time Bonus**: Extra points for quick completions
- **Accuracy Bonus**: Rewards for fewer mistakes
- **Difficulty Multiplier**: Higher difficulty = higher point multipliers

### Statistics Tracking
- **Games Played**: Total games completed
- **Best Times**: Fastest completion for each difficulty
- **High Scores**: Top scores for each difficulty level
- **Average Accuracy**: Success rate tracking

## 🏆 High Scores & Statistics

The game automatically saves your progress and maintains leaderboards for each difficulty level. Compete against your own best scores and track your improvement over time!

## 📱 Mobile Optimization

Fully responsive design with touch-friendly card interactions, optimized layouts for different screen sizes, and smooth animations that work perfectly on mobile devices.

## 🎨 Customization

The game features a modular design that makes it easy to:
- Add new difficulty levels
- Customize card designs and colors
- Modify scoring algorithms
- Add new game modes or features

## 📈 Performance

Built with performance in mind:
- Efficient React state management
- Optimized re-renders with useMemo and useCallback
- Smooth 60fps animations
- Fast localStorage operations
- Minimal bundle size for quick loading

## 🚀 Deployment Options

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Deploy on Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure as a static site

### Other Hosting Options
The game builds to static files and can be hosted on any static hosting service like GitHub Pages, AWS S3, or Cloudflare Pages.

<!-- README_END -->