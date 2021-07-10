import CONFIG from "../config.js";
export default async function getUsers() {
  const res = await fetch(`${CONFIG.API_URL}/users`, {
    headers: {
      Authorization: `token ${CONFIG.API_TOKEN}`,
    },
  });
  const usersData = await res.json();
  const usersInfo = [];
  usersData.forEach(async (item) => {
    const userResp = await fetch(`${CONFIG.API_URL}/users/${item.login}`, {
      headers: {
        Authorization: `token ${CONFIG.API_TOKEN}`,
      },
    });
    const userData = await userResp.json();
    usersInfo.push({
      login: item.login,
      html_url: item.html_url,
      about: {
        name: userData.name,
        company: userData.company,
        location: userData.location,
        bio: userData.bio,
      },
      stats: {
        followers: userData.followers,
        following: userData.following,
        repos: userData.public_repos,
      },
      contact: {
        twitter: userData.twitter_username,
        email: userData.email,
        blog: userData.blog,
      },
    });
  });
  return usersInfo;
}
