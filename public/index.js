import CONFIG from "./config.js";
console.log(CONFIG);

const usersContainer = document.getElementById("users-container");

fetch(`${CONFIG.API_URL}/users`, {
  headers: {
    Authorization: `token ${CONFIG.API_TOKEN}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => console.log());
  });

/*
 name, company, blog, location, email, hirable, bio, twitter_username, public_repos, followers, following , avatar_url, html_url,
*/
