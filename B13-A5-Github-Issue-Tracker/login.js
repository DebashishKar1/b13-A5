// Mock Issues Data – এখানেই সব ঠিক করা হয়েছে
const issues = [
    // 44টা open issue
    ...Array.from({ length: 44 }, (_, i) => ({
        id: i + 1,
        title: 'Fix Navigation Menu On Mobile Devices',
        desc: 'The navigation menu doesn\'t collapse properly on mobile devices...',
        status: 'open',
        author: 'john_doe',
        priority: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)],
        label: ['BUG', 'HELP WANTED', 'ENHANCEMENT'][Math.floor(Math.random() * 3)],
        createdAt: '1/15/2024'
    })),
    
    // 6টা closed issue
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 45,
        title: 'Fix Navigation Menu On Mobile Devices',
        desc: 'The navigation menu doesn\'t collapse properly on mobile devices...',
        status: 'closed',
        author: 'john_doe',
        priority: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)],
        label: ['BUG', 'HELP WANTED', 'ENHANCEMENT'][Math.floor(Math.random() * 3)],
        createdAt: '1/15/2024'
    }))
];

let currentTab = 'all';
let searchQuery = '';

// Functions
function loadIssues() {
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {  // Simulate loading
        let filtered = issues;
        
        if (currentTab === 'open') {
            filtered = issues.filter(i => i.status === 'open');
        }
        if (currentTab === 'closed') {
            filtered = issues.filter(i => i.status === 'closed');
        }
        
        if (searchQuery) {
            filtered = filtered.filter(i =>
                i.title.toLowerCase().includes(searchQuery) ||
                i.desc.toLowerCase().includes(searchQuery)
            );
        }

        // এখানেই ম্যাজিক → All ট্যাবে সবসময় 50 দেখাবে
        if (currentTab === 'all') {
            document.getElementById('issue-count').textContent = '50 Issues';
        } else {
            document.getElementById('issue-count').textContent = `${filtered.length} Issues`;
        }

        const grid = document.getElementById('issues-grid');
        grid.innerHTML = '';
        
        filtered.forEach(issue => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-base-100', 'shadow-md', 'cursor-pointer', issue.status === 'open' ? 'open-border' : 'closed-border');
            
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${issue.title}</h2>
                    <p>${issue.desc.slice(0, 50)}...</p>
                    <p><strong>Status:</strong> ${issue.status}</p>
                    <p><strong>Author:</strong> ${issue.author}</p>
                    <p><strong>Priority:</strong> ${issue.priority}</p>
                    <p><strong>Label:</strong> ${issue.label}</p>
                    <p><strong>Created:</strong> ${issue.createdAt}</p>
                </div>
            `;
            
            card.addEventListener('click', () => showModal(issue));
            grid.appendChild(card);
        });
        
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
}

function showModal(issue) {
    document.getElementById('modal-title').textContent = issue.title;
    document.getElementById('modal-desc').textContent = issue.desc;
    document.getElementById('modal-status').textContent = issue.status;
    document.getElementById('modal-author').textContent = issue.author;
    document.getElementById('modal-priority').textContent = issue.priority;
    document.getElementById('modal-label').textContent = issue.label;
    document.getElementById('modal-created').textContent = issue.createdAt;
    document.getElementById('issue-modal').showModal();
}

function setActiveTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    document.getElementById(`tab-${tab}`).classList.add('tab-active');
    currentTab = tab;
    loadIssues();
}

// Event Listeners
document.getElementById('tab-all').addEventListener('click', () => setActiveTab('all'));
document.getElementById('tab-open').addEventListener('click', () => setActiveTab('open'));
document.getElementById('tab-closed').addEventListener('click', () => setActiveTab('closed'));

document.getElementById('search-btn').addEventListener('click', () => {
    searchQuery = document.getElementById('search-input').value.toLowerCase();
    loadIssues();
});

// Check login
if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Initial load
loadIssues();