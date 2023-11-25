const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordMatchMessage = document.getElementById("passwordMatchMessage");

//form submit event
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  //check input fields are empty or not
  if (!username || !email || !password || !confirmPassword) {
    signupMessage.innerText = "Error: All fields are mandatory!";
    signupMessage.style.fontSize = "18px";
    signupMessage.style.color = "red";
    signupMessage.style.fontWeight = "700";
    return;
  }
  if (!isValidUsername(username)) {
    signupMessage.textContent = "Username must be contain letters and spaces";
    signupMessage.style.color = "#dc3545";
    return;
  }

  //check password is strong or not
  if (!isPasswordStrong(password)) {
    signupMessage.textContent =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    signupMessage.style.fontSize = "12px";
    signupMessage.style.color = "#dc3545";
    return;
  }

  // Generate a random 16-byte access token
  const accessToken = generateRandomToken();

  const user = {
    username: username,
    email: email,
    accessToken: accessToken,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(user)); //we have to send any object in JSON format

  signupMessage.textContent = "Redirecting to your profile...";
  signupMessage.style.color = "#198754";
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 2000);
});

//validate username
function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z ]+$/;
  return usernameRegex.test(username);
}

//show message--> password and confirmPassword match or not
confirmPasswordInput.addEventListener("input", (event) => {
  if (event.target.value !== passwordInput.value) {
    passwordMatchMessage.innerHTML = `Password is not matching...<span class="material-symbols-outlined">cancel</span>`;
    passwordMatchMessage.className = "red";
    passwordMatchMessage.style.color = "#dc3545";
  } else {
    passwordMatchMessage.innerHTML = `Password is matched`;
    passwordMatchMessage.className = "green";
  }
});

passwordInput.addEventListener("input", (event) => {
  if (event.target.value) {
    confirmPasswordInput.removeAttribute("disabled");
    // confirmPasswordInput.placeholder = 'active'
  } else {
    confirmPasswordInput.value = "";
    // confirmPasswordInput.placeholder =
    confirmPasswordInput.setAttribute("disabled", "true");
    passwordMatchMessage.innerHTML = "";
  }
});

//strong password checker function
function isPasswordStrong(password) {
  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  return strongPasswordRegex.test(password);
}

//random token generator function
function generateRandomToken() {
  const tokenLength = 16;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomToken = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomToken += characters[randomIndex];
  }

  return randomToken;
}