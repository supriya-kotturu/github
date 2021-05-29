fetch("https://github.com/login/oauth/authorize")
  .then((res) => res.json())
  .then((data) => console.log(data));
