document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const cardsContainer = document.getElementById('cards-container');
    const clearButton = document.getElementById('clear-data');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        if (!username) return;

        try {
            const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();

            addUserCard(data);
        } catch (error) {
            alert(error.message);
        }
    });

    clearButton.addEventListener('click', () => {
        cardsContainer.innerHTML = '';
        localStorage.removeItem('users');
    });

    function addUserCard(user) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h2>${user.username}</h2>
            <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
            <p><strong>Clan:</strong> ${user.clan || 'N/A'}</p>
            <p><strong>Languages:</strong> ${Object.keys(user.ranks.languages).join(', ')}</p>
            <p><strong>JavaScript Rank:</strong> ${user.ranks.languages.javascript ? user.ranks.languages.javascript.name : 'N/A'}</p>
        `;

        cardsContainer.appendChild(card);
        saveUserData(user);
    }

    function saveUserData(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUserData() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserCard(user));
    }

    loadUserData();
});
