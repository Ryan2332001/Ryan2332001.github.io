const cardsArray = [
    { name: 'shell', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXoyMmN4djI3ZXBvM3NuMGozd3VtZ2thazZkbjk3cHlnYzM3bTlrNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jQ7zpzXlXnG6dGDBpr/giphy.gif' },
    { name: 'star', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXdmMDU3dzRtZmdtd2hscGdiaW1xYnBhY3Y5bzBmajhsMm1vNXEwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs4oWkzyVeVgTwKQ/giphy.gif' },
    { name: 'bobomb', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXlkcDVsbGt6bXQwYmR4bmp6eTh5ZTVvYms2M2lreGRzOTBzbDA2eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OU9QLvInu0fSM/giphy.gif' },
    { name: 'mario', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNjYnBiMXZoZHZqaGQwN2FwNzQ3bmZnYmtxaXhsbnBrdXByaGpxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QW9Oe9EY1o2zE649Cc/giphy.gif' },
    { name: 'luigi', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzJqMXJsN29iZzhvejdpcTUwN2d0bmFmNXJhNWZjYzcyZm14ajZneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XjjbY54MczRdmqK0zP/giphy.gif' },
    { name: 'peach', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTMwZjZuYjNva2c2ajFyY204ZWw1cmw2eWJrejBlNDBhdWU1Zm45YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/42yqBYjKZ25h9PuYL6/giphy.gif' },
    { name: '1up', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2R2MXhsc3R4eTVjeDE4MDQ3aXhsOHI2NzdweGQyZTdqbzgxYmw2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIEBRZDZ6pWN2/giphy.gif' },
    { name: 'mushroom', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3U3eTY5aXZuYWR4eDhueWs4ZWx6dTF0MHQzbWl0c2t2d2g2YjI0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zt1q7lREccTi4n9ohB/giphy.gif' },
    { name: 'shell', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXoyMmN4djI3ZXBvM3NuMGozd3VtZ2thazZkbjk3cHlnYzM3bTlrNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jQ7zpzXlXnG6dGDBpr/giphy.gif' },
    { name: 'star', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXdmMDU3dzRtZmdtd2hscGdiaW1xYnBhY3Y5bzBmajhsMm1vNXEwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs4oWkzyVeVgTwKQ/giphy.gif' },
    { name: 'bobomb', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXlkcDVsbGt6bXQwYmR4bmp6eTh5ZTVvYms2M2lreGRzOTBzbDA2eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OU9QLvInu0fSM/giphy.gif' },
    { name: 'mario', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNjYnBiMXZoZHZqaGQwN2FwNzQ3bmZnYmtxaXhsbnBrdXByaGpxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QW9Oe9EY1o2zE649Cc/giphy.gif' },
    { name: 'luigi', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzJqMXJsN29iZzhvejdpcTUwN2d0bmFmNXJhNWZjYzcyZm14ajZneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XjjbY54MczRdmqK0zP/giphy.gif' },
    { name: 'peach', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTMwZjZuYjNva2c2ajFyY204ZWw1cmw2eWJrejBlNDBhdWU1Zm45YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/42yqBYjKZ25h9PuYL6/giphy.gif' },
    { name: '1up', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2R2MXhsc3R4eTVjeDE4MDQ3aXhsOHI2NzdweGQyZTdqbzgxYmw2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIEBRZDZ6pWN2/giphy.gif' },
    { name: 'mushroom', img: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3U3eTY5aXZuYWR4eDhueWs4ZWx6dTF0MHQzbWl0c2t2d2g2YjI0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zt1q7lREccTi4n9ohB/giphy.gif' }
];

const memoryGame = document.getElementById('memory-game');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function createBoard() {
    cardsArray.sort(() => 0.5 - Math.random());
    cardsArray.forEach(card => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.name = card.name;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.img;

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmFkajllZ3R2bmRpZGRyZ2FkNTZlczk0aTUwdjM3enh3ZTQ3dm5pMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUOxfjsW9fWPqEWouI/giphy.gif'; 

        memoryCard.appendChild(frontFace);
        memoryCard.appendChild(backFace);

        memoryCard.addEventListener('click', flipCard);

        memoryGame.appendChild(memoryCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();
