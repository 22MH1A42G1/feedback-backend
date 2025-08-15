
        // Initialize feedback array
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];

        // Function to display feedbacks in both profile container and scrollable section
        function displayFeedbackList() {
            const userProfileContainer = document.getElementById('userProfileContainer');

            userProfileContainer.innerHTML = '';
            // scrollableSection.innerHTML = '';

            feedbackList.forEach((feedback, index) => {
                const userProfile = createUserProfile(feedback, index);
                userProfileContainer.appendChild(userProfile);

            //     // if (index < 4) {
            //     //     const scrollableProfile = createUserProfile(feedback, index);
            //     //     scrollableSection.appendChild(scrollableProfile);
            //     // }
            });
        }

        // Function to create user profile DOM element
        function createUserProfile(feedback, index) {
             const userProfile = document.createElement('div');
            userProfile.className = 'user-profile';
            userProfile.innerHTML = `
                <div class="user-icon">👤</div>
                <div class="user-info">
                    <h3>${feedback.name}</h3>
                    <button class="aboutMeBtn" data-index="${index}">About Me</button>
                </div>
            `;
            return userProfile;
        }

        // Event listener for form submission
        document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const feedback = document.getElementById('feedback').value;

            const feedbackData = { name, email, feedback };
console.log(feedback)
            feedbackList.push(feedbackData);
            localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

            displayFeedbackList();
        });

        // Event listener for About Me button click to show modal
        document.getElementById('userProfileContainer').addEventListener('click', function(event) {
            if (event.target.classList.contains('aboutMeBtn')) {
                const index = event.target.getAttribute('data-index');
                const feedback = feedbackList[index];

                document.getElementById('modalName').textContent = feedback.name;
                document.getElementById('modalEmail').textContent = feedback.email;
                document.getElementById('modalFeedback').textContent = feedback.feedback;

                document.getElementById('feedbackModal').style.display = 'flex';
            }
        });

        // Event listener for close button click to hide modal
        document.querySelector('.close-btn').addEventListener('click', function() {
            document.getElementById('feedbackModal').style.display = 'none';
        });

        // Event listener to close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('feedbackModal')) {
                document.getElementById('feedbackModal').style.display = 'none';
            }
        });

        // Display initial feedback list
        displayFeedbackList();
   



