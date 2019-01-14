//API to fetch historical data of Bitcoin Price Index
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2019-01-12';

// loading data from API when DOM content has been loaded
document.addEventListener('DOMContentLoaded', event => {
  fetch(api)
    .then(resp => resp.json())
    .then(data => {
      const parsedData = parseData(data);
      drawChart(parsedData);
    })
    .catch(err => console.error(err));
});

const parseData = data => {
  const arr = [];
  for (const i in data.bpi) {
    arr.push({
      date: new Date(i),
      value: +data.bpi[i]
    });
  }
  return arr;
};

const drawChart = data => {
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .rangeRound([0, width]);

  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  x.domain(d3.extent(data, d => d.date));
  y.domain(d3.extent(data, d => d.value));

  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove();

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Price ($)');

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line)

};
