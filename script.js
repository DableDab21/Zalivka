// Функция для генерации координат гексов
function generateHexCoordinates(rows, columns) {
    const hexSize = 15;
    const hexHeight = Math.sqrt(3) * hexSize;
    const hexWidth = hexSize * 2;

    let coordinates = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * 1.5 * hexSize;
            const y = row * hexHeight + (col % 2) * hexHeight / 2;

            if (x >= 0 && x + hexWidth <= 1100 && y >= 0 && y + hexHeight <= 650) {
                const points = [
                    x, y + hexSize,
                    x + hexWidth / 4, y,
                    x + hexWidth * 3 / 4, y,
                    x + hexWidth, y + hexSize,
                    x + hexWidth * 3 / 4, y + hexHeight,
                    x + hexWidth / 4, y + hexHeight,
                    x, y + hexSize
                ].join(',');
                coordinates.push(points);
            }
        }
    }

    return coordinates;
}

// Генерируем координаты для гексов
const coordinates = generateHexCoordinates(21, 47);
const hexGrid = document.getElementById('hex-grid');

coordinates.forEach(points => {
    const hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    hex.setAttribute('class', 'hex');
    hex.setAttribute('points', points);
    hex.setAttribute('class', `hex ${getRandomColorClass()}`);
    hexGrid.appendChild(hex);
});

// Добавляем стены и начальные позиции игроков
const wallsAndPlayers = document.getElementById('walls-and-players');

// Добавляем стены
const walls = [
    { x: 3, y: 5 },
    { x: 5, y: 8 },
];

walls.forEach(wall => {
    const wallRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    wallRect.setAttribute('class', 'wall');
    wallRect.setAttribute('x', wall.x * 50);
    wallRect.setAttribute('y', wall.y * 50);
    wallRect.setAttribute('width', 50);
    wallRect.setAttribute('height', 50);
    wallsAndPlayers.appendChild(wallRect);
});

// Добавляем начальные позиции игроков
const playerStart1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
playerStart1.setAttribute('class', 'player-start');
playerStart1.setAttribute('points', '0,0 50,0 75,25 50,50 0,50');
playerStart1.setAttribute('transform', 'translate(25 625)');
wallsAndPlayers.appendChild(playerStart1);

const playerStart2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
playerStart2.setAttribute('class', 'player-start');
playerStart2.setAttribute('points', '0,0 50,0 75,25 50,50 0,50');
playerStart2.setAttribute('transform', 'translate(1074 25) rotate(180)');
wallsAndPlayers.appendChild(playerStart2);

// Логика игры
const hexes = document.querySelectorAll('.hex');
const playerStarts = document.querySelectorAll('.player-start');
const colorButtons = document.getElementById('color-buttons');

let currentPlayer = 1;

// Привязываем обработчики событий для каждого гекса
hexes.forEach(hex => {
    hex.addEventListener('mouseenter', () => {
        hex.style.stroke = 'white'; // Изменяем обводку на белую при наведении
    });
    hex.addEventListener('mouseleave', () => {
        hex.style.stroke = ''; // Возвращаем обводку к исходному цвету
    });
    hex.addEventListener('mouseenter', () => {
        if (!hex.classList.contains('filled') && isHexAdjacent(hex, currentPlayer)) {
            hex.classList.add('hovered');
        }
    });

    hex.addEventListener('mouseleave', () => {
        hex.classList.remove('hovered');
    });

    hex.addEventListener('click', () => {
        if (hex.classList.contains('filled')) {
            return; // Если гекс уже заполнен, ничего не делаем
        }
    
        const fillColor = (currentPlayer === 1) ? 'blue' : 'red'; // Цвет игрока
    
        // Изменяем цвет гекса напрямую через атрибут fill
        hex.setAttribute('fill', fillColor);
        hex.classList.add('filled');
    
        // Проверяем условия победы или переход хода
        checkWinCondition();
        switchPlayer();
    });
});

// Привязываем обработчики событий для кнопок выбора цвета
blueButton.addEventListener('click', () => {
    if (currentPlayer !== 1) {
        currentPlayer = 1;
        switchPlayer();
    }
});

redButton.addEventListener('click', () => {
    if (currentPlayer !== 2) {
        currentPlayer = 2;
        switchPlayer();
    }
});

// Переключение между игроками
function switchPlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;

    playerStarts.forEach(playerStart => {
        playerStart.classList.toggle('current-player');
    });
}

// Проверка условий победы или перехода хода
function checkWinCondition() {
    // Ваша логика проверки условий победы здесь
}

// Функция для завершения игры
function gameOver(winner) {
    // Ваш код для завершения игры
}

// Добавляем кнопки для выбора цвета игроков
const blueButton = document.createElement('button');
blueButton.textContent = 'Синий';
blueButton.addEventListener('click', () => {
    if (currentPlayer !== 1) {
        currentPlayer = 1;
        switchPlayer();
    }
});
colorButtons.appendChild(blueButton);

const redButton = document.createElement('button');
redButton.textContent = 'Красный';
redButton.addEventListener('click', () => {
    if (currentPlayer !== 2) {
        currentPlayer = 2;
        switchPlayer();
    }
});
colorButtons.appendChild(redButton);

// Функция для получения случайного класса цвета
function getRandomColorClass() {
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
