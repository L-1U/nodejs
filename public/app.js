// Global variables
let users = [];
let posts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkSystemHealth();
    loadUsers();
    loadPosts();
    
    // Refresh data every 30 seconds
    setInterval(() => {
        checkSystemHealth();
        loadUsers();
        loadPosts();
    }, 30000);
});

// Check system health
async function checkSystemHealth() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        
        const statusElement = document.getElementById('status-text');
        const indicatorElement = document.getElementById('status-indicator');
        
        if (response.ok && data.status === 'OK') {
            statusElement.textContent = `System Healthy - Database: ${data.database}`;
            indicatorElement.className = 'status-indicator healthy';
        } else {
            statusElement.textContent = 'System Unhealthy';
            indicatorElement.className = 'status-indicator unhealthy';
        }
    } catch (error) {
        const statusElement = document.getElementById('status-text');
        const indicatorElement = document.getElementById('status-indicator');
        statusElement.textContent = 'Connection Error';
        indicatorElement.className = 'status-indicator unhealthy';
    }
}

// Load users from API
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        users = await response.json();
        displayUsers();
        updateUserSelect();
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('users-list').innerHTML = '<div class="error">Failed to load users</div>';
    }
}

// Load posts from API
async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        posts = await response.json();
        displayPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-list').innerHTML = '<div class="error">Failed to load posts</div>';
    }
}

// Display users in the UI
function displayUsers() {
    const usersList = document.getElementById('users-list');
    
    if (users.length === 0) {
        usersList.innerHTML = '<div class="loading">No users found</div>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="data-item">
            <h3>${escapeHtml(user.name)}</h3>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Posts:</strong> ${user.posts ? user.posts.length : 0}</p>
            <div class="meta">
                ID: ${user.id} | Created: ${new Date(user.created_at).toLocaleDateString()}
            </div>
            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
        </div>
    `).join('');
}

// Display posts in the UI
function displayPosts() {
    const postsList = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        postsList.innerHTML = '<div class="loading">No posts found</div>';
        return;
    }
    
    postsList.innerHTML = posts.map(post => `
        <div class="data-item">
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.content || 'No content')}</p>
            <p><strong>Author:</strong> ${post.user ? escapeHtml(post.user.name) : 'Unknown'}</p>
            <div class="meta">
                ID: ${post.id} | Created: ${new Date(post.created_at).toLocaleDateString()}
            </div>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
        </div>
    `).join('');
}

// Update user select dropdown
function updateUserSelect() {
    const select = document.getElementById('postUserId');
    select.innerHTML = '<option value="">Select User</option>' + 
        users.map(user => `<option value="${user.id}">${escapeHtml(user.name)}</option>`).join('');
}

// Create new user
async function createUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    
    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        
        if (response.ok) {
            document.getElementById('userName').value = '';
            document.getElementById('userEmail').value = '';
            loadUsers();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user');
    }
}

// Create new post
async function createPost() {
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const user_id = document.getElementById('postUserId').value;
    
    if (!title || !user_id) {
        alert('Please fill in title and select a user');
        return;
    }
    
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, user_id: parseInt(user_id) }),
        });
        
        if (response.ok) {
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
            document.getElementById('postUserId').value = '';
            loadPosts();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post');
    }
}

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? This will also delete all their posts.')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            loadUsers();
            loadPosts(); // Refresh posts as they might be affected
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
    }
}

// Delete post
async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            loadPosts();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
