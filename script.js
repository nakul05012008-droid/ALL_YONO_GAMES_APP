// Games ka data direct yahan (no Google Sheets)
const games = [
    {
        id: 1,
        name: "Rumble Rummy",
        logo: "images/rumble-rummy.png",
        bonus: "₹100",
        rating: "4.3",
        size: "55 MB",
        minWithdraw: "₹100",
        referralLink: "https://www.rumblerummy1.vip/?code=UC0MYQVSLR2&t=1772204096",
        isNew: true
    },
    {
        id: 2,
        name: "Jaiho Slots",
        logo: "images/jaiho-slots.png",
        bonus: "₹20",
        rating: "4.2",
        size: "70 MB",
        minWithdraw: "₹100",
        referralLink: "https://www.jaihoslots20.com/?code=EGPAQGXL8VY&t=1772204223",
        isNew: true
    }
];

// Page load par games dikhao
function loadGames() {
    const skeleton = document.getElementById('skeletonLoader');
    const gamesList = document.getElementById('gamesList');
    
    let html = '';
    games.forEach(game => {
        html += `
            <div class="game-card">
                <img src="${game.logo}" class="game-logo" alt="${game.name}">
                <div class="game-info">
                    <div class="game-name">${game.name}</div>
                    ${game.isNew ? '<span class="badge new">नया</span>' : ''}
                    <div class="game-bonus">🎁 बोनस: ${game.bonus}</div>
                    <div class="game-meta">
                        <span>⭐ ${game.rating}</span>
                        <span>📦 ${game.size}</span>
                        <span>💰 ${game.minWithdraw}</span>
                    </div>
                    <button class="download-btn" onclick="window.location.href='${game.referralLink}'">
                        📥 डाउनलोड
                    </button>
                </div>
            </div>
        `;
    });
    
    gamesList.innerHTML = html;
    skeleton.style.display = 'none';
    gamesList.style.display = 'block';
}

// Start loading
loadGames();
