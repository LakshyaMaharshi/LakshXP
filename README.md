# GameHub - RAWG API Powered Gaming Platform

![GameHub Banner](./screenshots/banner.png) <!-- Add your screenshot later -->

A React-based gaming platform powered by RAWG API with Clerk authentication, featuring game discovery, details, and personal library management.

## Important Note for Authentication

🔐 **For GitHub Pages deployment:**  
Due to GitHub Pages' static hosting limitations with client-side routing:
1. After signing in, **close the tab completely**
2. Reopen the website to see your authenticated session
3. This ensures Clerk's authentication state syncs properly

## Features

### 🎮 Game Discovery
![Game Listing](./screenshots/games-list.png)
- Browse thousands of games from RAWG API
- Filter by genres, platforms, and release dates

### 🔍 Game Details
![Game Details](./screenshots/game-detail.png)
- Comprehensive game information
- Screenshots and trailers
- System requirements

### 📚 Personal Library
![Library](./screenshots/library.png)
- Save your favorite games
- Track played/wishlisted titles
- Private collection only visible to you

## Live Demo

👉 [Play Now on GitHub Pages](https://lakshyamaharshi.github.io/LakshXP/#/)

## Local Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- RAWG API key (free tier available)
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lakshyamaharshi/LakshXP.git
   cd LakshXP
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Run the development server**
    ```bash
    npm run dev
    ```