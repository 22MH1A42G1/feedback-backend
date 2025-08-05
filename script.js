let feedbackList = [];

// ✅ Fetch feedbacks from Railway backend
async function fetchFeedbackList() {
    try {
        const response = await fetch('https://feedback-api.up.railway.app/api/feedback');  // ✅ Use Railway URL
        feedbackList = await response.json();
        displayFeedbackList();
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
}

// ✅ Display feedbacks
function displayFeedbackList() {
    const userProfileContainer = document.getElementById('userProfileContainer');
    userProfileContainer.innerHTML = '';

    feedbackList.forEach((feedback, index) => {
        const userProfile = createUserProfile(feedback, index);
        userProfileContainer.appendChild(userProfile);
    });
}

// ✅ Create profile card for each feedback
function createUserProfile(feedback, index) {
    const userProfile = document.createElement('div');
    userProfile.className = 'user-profile';
    const date = new Date(feedback.created_at).toLocaleString();

    userProfile.innerHTML = `
        <div class="user-icon">👤</div>
        <div class="user-info">
            <h3>${feedback.name}</h3>
            <p class="timestamp">${date}</p>
            <button class="aboutMeBtn" data-index="${index}">About Me</button>
        </div>
    `;
    return userProfile;
}

// ✅ Handle form submit
document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const feedbackData = { name, email, feedback };

    try {
        const res = await fetch('https://feedback-api.up.railway.app/api/feedback', { // ✅ Use Railway URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData)
        });

        if (res.ok) {
            fetchFeedbackList(); // Refresh list
            document.getElementById('feedbackForm').reset(); // Clear form
        }
    } catch (err) {
        console.error('Error saving feedback:', err);
    }
});

// ✅ Show modal with detailed feedback
document.getElementById('userProfileContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('aboutMeBtn')) {
        const index = event.target.getAttribute('data-index');
        const feedback = feedbackList[index];

        document.getElementById('modalName').textContent = feedback.name;
        document.getElementById('modalEmail').textContent = feedback.email;
        document.getElementById('modalFeedback').textContent = feedback.feedback;
        document.getElementById('modalCreatedAt').textContent = new Date(feedback.created_at).toLocaleString();

        document.getElementById('feedbackModal').style.display = 'flex';
    }
});

// ✅ Close modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('feedbackModal').style.display = 'none';
});
window.addEventListener('click', event => {
    if (event.target === document.getElementById('feedbackModal')) {
        document.getElementById('feedbackModal').style.display = 'none';
    }
});

// ✅ Load feedbacks on page load
fetchFeedbackList();
