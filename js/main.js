const search = async (value, e) => {
  const main = document.querySelector(".movie-boxes");
  const searchResults = document.querySelector(".search-results");
  const resultsBox = document.querySelector(".results-box");

  const [animes, cartoons,chinese,donghuas,series] = await Promise.all(
    [
      fetch("http://127.0.0.1:5500/js/anime.json", {
        cache: "default",
      }),
      fetch("http://127.0.0.1:5500/js/cartoons.json", {
        cache: "default",
      }),
       fetch("http://127.0.0.1:5500/js/chinese_anime.json", {
        cache: "default",
      }),
       fetch("http://127.0.0.1:5500/js/donghua.json", {
        cache: "default",
      }),
       fetch("http://127.0.0.1:5500/js/series.json", {
        cache: "default",
      }),
    ]
  );

  const anime = await animes.json();
  const cartoon = await cartoons.json();
  const chinese_anime =  await chinese.json();
  const  donghua  = await donghuas.json();
  const seriesData =  await  series.json()

  // console.log(animes);

  const data = [...anime.animes,...cartoon.cartoons,...chinese_anime.chinese_animes,...donghua.donghuas,...seriesData.seriesData]



   main.innerHTML = data
    .map(
      (item) =>
        `<div class="movie-box">${item.title ? item.title : item.name}</div>`
    )
    .join("");


  if (value && value.length != 0) {
    const newData = data.filter((item) => {
      return (item.name ? item.name : item.title)
        .toLowerCase()
        .includes(String(value.toLowerCase()));
    });
    const tenEL = newData.slice(0,10);
    searchResults.classList.add("active");
    return ( resultsBox.innerHTML = tenEL
      .map(
        (item) =>
          `<div class="search-item">${item.title ? item.title : item.name}</div>`
      )
      .join(""));
  }
   searchResults.classList.remove("active");


};

search();
