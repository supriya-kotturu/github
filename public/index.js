// import getUsers from "./utils/getUsers.js";
import CONFIG from "./config.js";

const usersContainer = document.getElementById("users-container");
async function getUserLogins() {
  const userLogins = [];
  const res = await fetch(`${CONFIG.API_URL}/users`, {
    headers: {
      Authorization: `token ${CONFIG.API_TOKEN}`,
    },
  });
  const usersData = await res.json();
  usersData.forEach((user) => userLogins.push(user.login));
  return userLogins;
}

async function getUsers() {
  let usersInfo = [];
  const usersData = await getUserLogins();
  usersData.forEach(async (item) => {
    const userResp = await fetch(`${CONFIG.API_URL}/users/${item}`, {
      headers: {
        Authorization: `token ${CONFIG.API_TOKEN}`,
      },
    });
    const userData = await userResp.json();
    const userObj = {
      login: userData.login,
      html_url: userData.html_url,
      about: {
        name: userData.name,
        company: userData.company,
        location: userData.location,
        bio: userData.bio,
        hirable: userData.hirable,
        avatar_url: userData.avatar_url,
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
    };
    usersInfo.push(userObj);
    usersContainer.innerHTML += `<div class="user bg-indigo-200 w-auto flex-auto p-6 rounded-xl shadow-xl ">
    <div class="grid grid-flow-row grid-cols-3 justify-start">
        <div class="col-span-1 md:h-24 md:w-24 bg-gray-300 rounded-full overflow-hidden shadow-md">
            <img src=${userObj.about.avatar_url} alt="">
        </div>
        <div class="grid col-span-2 ml-5 text-left">
            <span class="text-xl font-bold">${userObj.about.name}</span>
            <span class="inline-block">${userObj.about.company}, ${
      userObj.about.location
    }</span>
            ${
              userObj.about.hirable
                ? `<span class="inline-block">${userObj.about.hirable}</span>`
                : null
            }
            <span class="inline-block">${userObj.contact.twitter}</span>
            <span class="inline-block">${userObj.contact.email}</span>
            <span class="inline-block">${userObj.contact.blog}</span>
        </div>
    </div>
    <div
        class="bio mx-6 my-2 py-2 px-6 md:p-2 md:m-1 md:h-28 md:text-base  text-center font-bold text-lg border-b-2 rounded-b border-gray-400 overflow-hidden h-32 m-auto">
        <blockquote> ${userObj.about.bio}
        </blockquote>
    </div>
    <div
        class="stats  grid md:grid-cols-3 grid-flow-row  gap-10 grid-cols-3  justify-around p-1 align-baseline">
        <div class="followers grid text-center">
            <span class="font-bold bg-gray-500 py-1 px-2  rounded text-white items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-yellow-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span class="text-xl text-yellow-400">${
                  userObj.stats.followers
                }</span>
                Followers</span>
        </div>
        <div class=" following grid text-center items-center">
            <span class="font-bold bg-gray-500  py-1 px-2  rounded text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-yellow-400" fill="
                    none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />

                </svg>
                <span class="text-xl text-yellow-400">${
                  userObj.stats.following
                }</span>
                <span>Following</span></span>
        </div>
        <div class="public-repos grid text-center">
            <span class="font-bold bg-purple py-1 px-2 rounded text-white text-center">
                <span class="devicons devicons-git_pull_request text-md
                "></span> <span class="text-xl text-white">${
                  userObj.stats.repos
                }<span> Repos
            </span>
        </div>
    </div>

</div>
    `;
  });
  return usersInfo;
}

async function getData() {
  await getUsers();
  //   const res = await getUsers();
  //   console.log(res, res.length);

  //   const r = await getUserLogins();
  //   console.log(r, r.length);
}

getData();
