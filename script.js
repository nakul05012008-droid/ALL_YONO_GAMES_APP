// Google Apps Script URL
const API_URL = "https://script.google.com/macros/s/AKfycbxoWHa3dv3KFzLZqpXPsn7PCscwwQin--24C0E8CpEEzrJ4ZeO3fJxHw6Ri5VVnI4WBCw/exec";

// Cache for instant loading
let cachedGames = null;

// Ultra Fast Load Function
async function loadGames() {
    const skeleton = document.getElementById('skeletonLoader');
    const gamesList = document.getElementById('gamesList');
    
    try {
        // Check cache first - INSTANT!
        if (cachedGames) {
            skeleton.style.display = 'none';
            gamesList.style.display = 'block';
            displayGames(cachedGames);
            return;
        }
        
        // Fast fetch with 1 second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        
        const response = await fetch(API_URL, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const data = await response.json();
        cachedGames = data.games; // Store in cache
        
        // Smooth transition
        skeleton.style.display = 'none';
        gamesList.style.display = 'block';
        displayGames(data.games);
        
    } catch (error) {
        console.log('Error:', error);
        
        // Show cached data if available
        if (cachedGames) {
            skeleton.style.display = 'none';
            gamesList.style.display = 'block';
            displayGames(cachedGames);
        } else {
            skeleton.innerHTML = `
                <div style="text-align:center; padding:40px; color:#ef4444;">
                    ⚡ कृपया दोबारा प्रयास करें
                </div>
            `;
        }
    }
}

// Display Games Function
function displayGames(games) {
    const gamesList = document.getElementById('gamesList');
    
    let html = '';
    games.forEach(game => {
        html += `
            <div class="game-card">
                <img src="${game.logoUrl}" 
                     class="game-logo" 
                     alt="${game.gameName}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2270%22%20height%3D%2270%22%20viewBox%3D%220%200%2070%2070%22%3E%3Crect%20width%3D%2270%22%20height%3D%2270%22%20fill%3D%22%236366f1%22%20rx%3D%2218%22%2F%3E%3Ctext%20x%3D%2235%22%20y%3D%2240%22%20font-size%3D%2230%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3E🎮%3C%2Ftext%3E%3C%2Fsvg%3E'">
                <div class="game-info">
                    <div class="game-name">${game.gameName}</div>
                    <div class="game-bonus">🎁 ${game.bonus}</div>
                    <div class="game-meta">
                        <span>⭐ ${game.rating}</span>
                        <span>📦 ${game.size}</span>
                        <span>💰 ₹${game.minWithdrawl}</span>
                    </div>
                    <button class="download-btn" onclick="window.location.href='${game.downloadUrl}'">
                        📥 डाउनलोड
                    </button>
                </div>
            </div>
        `;
    });
    
    gamesList.innerHTML = html;
}

// Download function
function downloadAPK(url) {
    window.location.href = url;
}

// Start loading when page opens
document.addEventListener('DOMContentLoaded', loadGames);
