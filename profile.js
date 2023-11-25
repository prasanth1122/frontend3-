const profileDetails = document.getElementById("profileDetails");
const logoutButton = document.getElementById("logoutButton");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  // Display user details in the profile page
  const userDetailsHTML = `
    <p>Full Name : ${user.username}</p>
    <p>Email : ${user.email}</p>
    <p>Token : ${user.accessToken}</p>
    <p>Password : ${user.password}</p>
  `;
  profileDetails.innerHTML = userDetailsHTML;
} else {
  window.location.href = "index.html";
}

logoutButton.addEventListener("click", function () {
  localStorage.clear();

  window.location.href = "index.html";
});
