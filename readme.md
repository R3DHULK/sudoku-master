# 🧩 Sudoku Master - Dark Edition

A modern, responsive Sudoku game with multiple board sizes, difficulty levels, and a stunning dark theme interface. Built with vanilla HTML, CSS, and JavaScript.

![Sudoku Master Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎮 **Game Modes**
- **Multiple Board Sizes**: From 2x2 (4 cells) to 9x9 (81 cells)
- **4 Difficulty Levels**: Easy, Medium, Hard, and Super Hard
- **Personalized Experience**: Enter your name for a custom gaming experience

### 🎯 **Gameplay Features**
- **Interactive Number Pad**: Click to place numbers
- **Smart Validation**: Visual feedback for incorrect placements
- **Hint System**: Get up to 3 hints per game
- **Move Counter**: Track your progress
- **Timer**: Real-time game duration tracking
- **Play/Pause**: Pause and resume games anytime
- **Progress Check**: Check your current solution status

### 🎨 **Visual Design**
- **Dark Theme**: Sleek, modern dark interface
- **Light Theme**: Toggle between dark and light modes
- **Glassmorphism**: Beautiful glass-effect containers
- **Animated Background**: Floating numbers create atmosphere
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Polished user interactions

### 🏆 **Victory & Stats**
- **Personalized Congratulations**: Victory message includes your name
- **Detailed Statistics**: Time, moves, and hints used
- **Achievement Tracking**: See your performance metrics

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/r3dhulk/sudoku-master.git
   cd sudoku-master
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **Start playing!**
   - Enter your name
   - Select board size and difficulty
   - Click "🚀 Start Game"

## 🎮 How to Play

### Basic Rules
- Fill each row, column, and 3x3 box (for 9x9 grids) with unique numbers
- Numbers range from 1 to the square root of total cells
- Pre-filled numbers cannot be changed

### Controls
- **Click a cell** to select it
- **Click number pad** or **type numbers** to place them
- **Clear button (×)** to remove numbers
- **Hint button (💡)** for help (limited to 3 per game)
- **Pause button (⏸️)** to pause/resume the game
- **Check button (✅)** to see your current progress

### Game Features
- **Auto-validation**: Wrong numbers flash red
- **Pause functionality**: Take breaks without losing progress
- **Multiple sizes**: Challenge yourself with larger grids
- **Difficulty scaling**: More or fewer pre-filled numbers

## 🛠️ Technical Details

### File Structure
```
sudoku-master/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── app.js             # Game logic and functionality
└── README.md          # This file
```

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling, animations, and responsive design
- **Vanilla JavaScript**: Game logic, DOM manipulation, and state management

### Key Features Implementation
- **Sudoku Generation**: Recursive backtracking algorithm
- **Puzzle Creation**: Smart number removal based on difficulty
- **State Management**: Comprehensive game state tracking
- **Timer System**: Accurate timing with pause/resume functionality
- **Responsive Design**: CSS Grid and Flexbox for all screen sizes

## 🎨 Customization

### Themes
The game supports both dark and light themes. Toggle using the theme button in the setup screen.

### Difficulty Levels
- **Easy**: 40% of numbers removed
- **Medium**: 55% of numbers removed  
- **Hard**: 70% of numbers removed
- **Super Hard**: 80% of numbers removed

### Board Sizes
- 2x2 (4 cells) - Perfect for beginners
- 3x3 (9 cells) - Classic Sudoku experience
- 4x4 (16 cells) - Moderate challenge
- 5x5, 6x6, 7x7, 8x8 - Progressive difficulty
- 9x9 (81 cells) - Master level challenge

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Ideas for Contributions
- Additional themes and color schemes
- More board sizes or game modes
- Sound effects and music
- Local storage for high scores
- Multiplayer functionality
- Mobile app version

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Sudoku puzzle game
- Built with modern web technologies
- Designed for accessibility and user experience

---

### 🌟 Star this repository if you found it helpful!

**Happy Sudoku solving! 🧩✨**