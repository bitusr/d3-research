const data = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// scale are necessary to make a graph of a reasonable size when changing data values
// e.g. try to change data to const data = [1,2,3,4,5]; -> and it will still look okay

const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;
const barWidth = svgWidth / data.length;

const svg = d3.select(`svg`)
  .attr(`width`, svgWidth)
  .attr(`height`, svgHeight);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, svgWidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, svgHeight]);

const barChart = svg.selectAll(`rect`)
  .data(data)
  .enter()
  .append(`rect`)
  .attr(`y`, d => svgHeight - yScale(d))
  .attr(`height`, d => yScale(d))
  .attr(`width`, barWidth - barPadding)
  .attr(`transform`, (d, i) => `translate(${[barWidth * i, 0]})`);

const text = svg.selectAll(`text`)
  .data(data)
  .enter()
  .append(`text`)
  .text(d => d)
  .attr(`y`, (d, i) => svgHeight - d - 2)
  .attr(`x`, (d, i) => barWidth * i)
  .attr(`fill`, `#A64C38`);
