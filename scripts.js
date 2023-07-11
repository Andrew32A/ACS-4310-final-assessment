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

  // challenge 6
  const yExtent = d3.extent(topCountries, function (d) {
    return +d["Score"];
  });
  const yScale = d3
    .scaleLinear()
    .domain([Math.floor(yExtent[0]), Math.ceil(yExtent[1])])
    .range([height, 0]);

  // challenge 7
  const svg = d3
    .select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .selectAll("rect")
    .data(topCountries)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d["Country or region"]);
    })
    .attr("y", function (d) {
      return yScale(d["Score"]);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d["Score"]);
    });

  // challenge 8
  const xAxis = d3.axisBottom(xScale);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text");

  // challenge 9
  const yAxis = d3.axisLeft(yScale);

  svg.append("g").attr("class", "y-axis").call(yAxis);

  // challenge 10
  const colorScale = d3
    .scaleOrdinal()
    .domain(
      topCountries.map(function (d) {
        return d["Country or region"];
      })
    )
    .range([
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
    ]);

  svg.selectAll("rect").style("fill", function (d) {
    return colorScale(d["Country or region"]);
  });
});
