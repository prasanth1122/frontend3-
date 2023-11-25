document.addEventListener("DOMContentLoaded", function () {
  // Use a flag to check if authentication has been already checked
  const authenticationChecked = localStorage.getItem("authenticationChecked");

  if (!authenticationChecked) {
    checkAuthentication();
    localStorage.setItem("authenticationChecked", "true"); // Set the flag to true
  }
});

function checkAuthentication() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    redirectToProfile();
  } else {
    // Only redirect to signup page if the current page is not the signup page
    if (!window.location.href.includes("index.html")) {
      redirectToSignup();
    }
  }
}

function redirectToSignup() {
  window.location.href = "index.html";
}

function redirectToProfile() {
  window.location.href = "profile.html";
  displayProfile();
}

function displayProfile() {
  const profileDetails = document.getElementById("profileDetails");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  profileDetails.innerHTML = `<p>Username: ${username}</p><p>Email: ${email}</p>`;
}

function signup() {
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;
  // Generate a random access token (not secure for production)
  const accessToken = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  ).join("");

  // Store user details in local storage
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("confirmpassword", confirmpassword);
  // Display success message
  // const signupMessage = document.getElementById('signupMessage');
  // signupMessage.textContent = 'Signup successful! Redirecting to profile...';

  // Redirect to profile page after a delay
  setTimeout(redirectToProfile, 1000);
}

function logout() {
  // Clear local storage
  localStorage.clear();

  // Redirect to signup page
  redirectToSignup();
}
