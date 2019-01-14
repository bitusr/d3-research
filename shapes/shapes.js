const svgWidth = 600;
const svgHeight = 500;

const shapes = d3.select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .attr('class', 'svg-container');

const line = shapes.append('line')
  .attr('x1', 100) // starting coordinate
  .attr('x2', 500) // ending coordinate
  .attr('y1', 50) // starting coordiante
  .attr('y2', 50) // ending coordinate
  .attr('stroke', 'red')
  .attr('stroke-width', 5);

const rect = shapes.append('rect')
  .attr('x', 100)
  .attr('y', 100)
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'green');

const circle = shapes.append('circle')
  .attr('cx', 200) // x coordinate of the center of the circle
  .attr('cy', 300) // y coordinate of the center of the circle
  .attr('r', 80) // radius of the circle
  .attr('fill', 'purple');
