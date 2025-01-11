document.addEventListener('DOMContentLoaded', function () {
    const username = 'UCG3';
    const password = '123';

    const loginBtn = document.getElementById('loginBtn');
    const addEntryBtn = document.getElementById('addEntryBtn');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');
    const filterInput = document.getElementById('filter');
    const entryList = document.getElementById('entryList');

    loginBtn.addEventListener('click', function () {
        const inputUsername = document.getElementById('username').value;
        const inputPassword = document.getElementById('password').value;

        if (inputUsername === username && inputPassword === password) {
            document.getElementById('login').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            loadEntries();
        } else {
            alert('Invalid username or password!');
        }
    });

    addEntryBtn.addEventListener('click', function () {
        const entryUsername = prompt('Enter username:');
        const entryPassword = prompt('Enter password:');
        if (entryUsername && entryPassword) {
            addEntry(entryUsername, entryPassword);
        }
    });

    backToDashboardBtn.addEventListener('click', function () {
        document.getElementById('detailsView').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    });

    filterInput.addEventListener('input', function () {
        filterEntries(this.value);
    });

    function loadEntries() {
        entryList.innerHTML = '';
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.username}</td>
                <td>${entry.password}</td>
                <td>
                    <button class="btn btn-info btn-sm btn-custom" onclick="showDetails(${index})">Details</button>
                    <button class="btn btn-warning btn-sm btn-custom" onclick="updateEntry(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm btn-custom" onclick="deleteEntry(${index})">Delete</button>
                </td>
            `;
            entryList.appendChild(tr);
        });
    }

    function addEntry(username, password) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({ username, password });
        localStorage.setItem('entries', JSON.stringify(entries));
        loadEntries();
    }

    window.showDetails = function (index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const entry = entries[index];
        document.getElementById('entryDetails').innerHTML = `
            <p><strong>Username:</strong> ${entry.username}</p>
            <p><strong>Password:</strong> ${entry.password}</p>
        `;
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('detailsView').classList.remove('hidden');
    }

    window.updateEntry = function (index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const entry = entries[index];
        const newUsername = prompt('Update username:', entry.username);
        const newPassword = prompt('Update password:', entry.password);
        if (newUsername && newPassword) {
            entries[index] = { username: newUsername, password: newPassword };
            localStorage.setItem('entries', JSON.stringify(entries));
            loadEntries();
        }
    }

    window.deleteEntry = function (index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        loadEntries();
    }

    function filterEntries(query) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entryList.innerHTML = '';
        entries
            .filter(entry => entry.username.includes(query) || entry.password.includes(query))
            .forEach((entry, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.password}</td>
                    <td>
                        <button class="btn btn-info btn-sm btn-custom" onclick="showDetails(${index})">Details</button>
                        <button class="btn btn-warning btn-sm btn-custom" onclick="updateEntry(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-custom" onclick="deleteEntry(${index})">Delete</button>
                    </td>
                `;
                entryList.appendChild(tr);
            });
    }

    loadEntries();
});
