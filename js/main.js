const search = async (value) => {
  const main = document.querySelector(".movie-boxes");

  const movies = await fetch("http://127.0.0.1:5500/js/anime.json", {
    cache: "default",
  });
  const data = await movies.json();

  if (value && value.length != 0) {
    const newData = data.filter((item) => {
      return item.name.toLowerCase().includes(String(value.toLowerCase()));
    });
    return (main.innerHTML = newData
      .map((item) => `<div class="movie-box">${item.name}</div>`)
      .join(""));
  }

  main.innerHTML = data
    .map((item) => `<div class="movie-box">${item.name}</div>`)
    .join("");
};

search();
