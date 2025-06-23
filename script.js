const API_URL = 'https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json';

const container = document.getElementById('user-container');
const getAllBtn = document.getElementById('get-all-users');
const experience = document.getElementById('years-experience');
const resetUsers = document.getElementById('reset');

async function fetchUserData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response error');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

function createCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');

    card.innerHTML = `
    <p>${user.firstName} ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Company: ${user.companyName}</p>
    <p>Years Employed: ${user.yearsEmployed}</p>
    `;

    container.appendChild(card);
}

async function getAllUsers() {
    const users = await fetchUserData();
    resetCards();
    users.forEach(createCard);
}

async function loadFilteredUsers() {
    const users = await fetchUserData();
    const filteredData = users.filter(user => user.yearsEmployed < 10);
    resetCards();
    filteredData.forEach(createCard);
}

function resetCards() {
    container.innerHTML = '';
}

getAllBtn.addEventListener('click', getAllUsers);
experience.addEventListener('click', loadFilteredUsers);
resetUsers.addEventListener('click', resetCards);