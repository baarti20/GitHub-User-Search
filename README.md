# GitHub-User-Search
# GitHub User Search

A simple web application to search and display GitHub user profiles with their repositories.

## Features

- Search GitHub users by username
- Display user profile information (avatar, name, bio, stats)
- Show recent repositories with programming languages
- Error handling for non-existent users
- Responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub REST API
- JavaScript Promises
- Fetch API

## How to Use

1. Open `index.html` in a web browser
2. Enter a GitHub username in the search box
3. Press Enter to search
4. View the user's profile and recent repositories

## API Endpoints

- `https://api.github.com/users/{username}` - User profile data
- `https://api.github.com/users/{username}/repos` - User repositories

## File Structure

```
github-user-search/
├── index.html
├── style.css
├── script.js
└── README.md
```
