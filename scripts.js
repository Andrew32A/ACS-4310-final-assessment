d3.csv("./data/2019.csv").then(function (data) {
  // challenge 3
  console.log(data);

  // challenge 4
  const topCountries = data.slice(0, 10);
  console.log(topCountries);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let width = window.innerWidth - 200 - margin.left - margin.right;
  let height = window.innerHeight - 200 - margin.top - margin.bottom;

  // just incase the window is resized
  function handleResize() {
    width = window.innerWidth - 200 - margin.left - margin.right;
    height = window.innerHeight - 200 - margin.top - margin.bottom;
  }

  window.addEventListener("resize", handleResize);

  // challenge 5
  const xScale = d3
    .scaleBand()
    .domain(
      topCountries.map(function (d) {
        return d["Country or region"];
      })
    )
    .range([0, width])
    .padding(0.1);
});
