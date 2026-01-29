const searchInput = document.getElementById("searchInput");
const profileDiv = document.getElementById("profile");
const statusText = document.getElementById("status");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const username = searchInput.value.trim();
    if (username) {
      fetchUser(username);
    }
  }
});

function fetchUser(username) {
  statusText.textContent = "Loading...";

  // Create promises for user data and repositories
  const userPromise = fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("USER NOT FOUND");
        }
        throw new Error("Something went wrong");
      }
      return response.json();
    });

  const reposPromise = fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
    .then(response => response.json())
    .catch(() => []); // Return empty array if repos fetch fails

  // Use Promise.all to wait for both promises
  Promise.all([userPromise, reposPromise])
    .then(([userData, reposData]) => {
      displayUser(userData, reposData);
      statusText.textContent = "";
    })
    .catch(error => {
      statusText.textContent = error.message;
      profileDiv.innerHTML = "";
    });
}

function displayUser(user, repos) {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const reposList = repos.map(repo => 
    `<div class="repo">
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <span>${repo.language || 'N/A'}</span>
    </div>`
  ).join('');

  profileDiv.innerHTML = `
    <img src="${user.avatar_url}" alt="Avatar" />
    <h2>${user.name || "No Name Available"}</h2>
    <p>@${user.login}</p>
    <p>${user.bio || "No bio available"}</p>
    <div class="stats">
      <span>Repos: ${user.public_repos}</span>
      <span>Followers: ${user.followers}</span>
      <span>Following: ${user.following}</span>
    </div>
    <p>Joined: ${joinDate}</p>
    <div class="repos">
      <h3>Recent Repositories:</h3>
      ${reposList}
    </div>
  `;
}
