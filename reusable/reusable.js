// REUSABILITY
// https://bost.ocks.org/mike/chart/
// https://fabiofranchino.com/blog/going-towards-reusable-d3js-charts/
// https://stackoverflow.com/questions/14665786/some-clarification-on-reusable-charts
// https://stackoverflow.com/questions/15762580/d3-reusable-chart-function-creating-multiple-charts

(function () {
  window.ReusableVisual = () => {

    const chart = selection => {
      selection.each(function(data, i) {
        const svg = d3.select(this);

        svg.append(`text`)
          .text(`Width of the chart is: ${chart.width}. The length of the data is ${data.length}`)
          .attr(`x`, chart.width / 2)
          .attr(`y`, chart.height / 2)
          .attr(`class`, `reusableChartText`)
      });
    };

    chart.width = 500;
    chart.height = 250;

    chart.config = options => {
      Object.getOwnPropertyNames(options).forEach(it => {
        chart[it] = options[it];
      });
      return chart
    };

    return chart
  }
})();
