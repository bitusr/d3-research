/**
 * CONSTANTS
 * =========
 */
const ROWS = 10;
const COLUMNS = 10;
const MOUSE_OVER_GRID_ROWS = 50;
const MOUSE_OVER_GRID_COLUMNS = 50;
const MAX_NUMBER_OF_SQUARE_CLICKS = 4;
const SQUARE_COLORS = {
  zero: `#fff`,
  one: `#2C93E8`,
  two: `#F56C4E`,
  three: `#838690`,
};

/**
 * UTILS
 * =====
 */
const generateData = (number, fn) => [...Array(number)].map(() => fn());

const getColor = eventCount => {
  switch(eventCount) {
    case 0: return SQUARE_COLORS.zero;
    case 1: return SQUARE_COLORS.one;
    case 2: return SQUARE_COLORS.two;
    case 3: return SQUARE_COLORS.three;
  }
};

const getRandomSquareColor = d => {
  const eventCount = d.click % MAX_NUMBER_OF_SQUARE_CLICKS;
  return getColor(eventCount);
};

function onClickableSquareClick(d) {
  d.click++;
  const clickNumber = d.click % MAX_NUMBER_OF_SQUARE_CLICKS;
  const color = getColor(clickNumber);
  d3.select(this).style(`fill`, color);
}

function onMOSquareMouseOver(d) {
  d.mouseOverCount++;
  const clickNumber = d.mouseOverCount % MAX_NUMBER_OF_SQUARE_CLICKS;
  const color = getColor(clickNumber);
  d3.select(this).style(`fill`, color);
}

/**
 * ON MOUSE OVER GRID
 * ==================
 */
const buildMOGridData = (yPos = 1) => {
  return generateData(MOUSE_OVER_GRID_ROWS, () => {
    let width = 10;
    let height = 10;
    let mouseOverCount = 0;
    const rows = ((xPos = 1) => {
      const columns = generateData(MOUSE_OVER_GRID_COLUMNS, () => {
        const data = {
          x: xPos,
          y: yPos,
          width,
          height,
          mouseOverCount,
        };
        xPos += width;
        return data;
      });
      xPos = 1;
      return columns;
    })();
    yPos += height;
    return rows;
  });
};

const moGrid = d3.select(`#mouseOverGrid`)
  .append(`svg`)
  .attr(`width`, `510px`)
  .attr(`height`, `510px`);

const moRow = moGrid.selectAll(`.moRow`)
  .data(buildMOGridData())
  .enter().append(`g`)
  .attr(`class`, `moRow`);

const moColumn = moRow.selectAll(`.moColumn`)
  .data(d => d)
  .enter().append(`rect`)
  .attr(`class`, `moColumn`)
  .attr(`x`, d => d.x)
  .attr(`y`, d => d.y)
  .attr(`width`, d => d.width)
  .attr(`height`, d => d.height)
  .style(`fill`, `#fff`)
  .style(`stroke`, `#222`)
  .on(`mouseover`, onMOSquareMouseOver);



/**
 * CLICKABLE RANDOM COLORS GRID
 * ============================
 */
const buildRCCGridData = (yPos = 1) => {
  return generateData(ROWS, () => {
    let width = 50;
    let height = 50;
    const rows = ((xPos = 1) => {
      const columns = generateData(COLUMNS, () => {
        const click = Math.round(Math.random() * 100);
        const data = {
          x: xPos,
          y: yPos,
          width,
          height,
          click,
        };
        xPos += width;
        return data;
      });
      xPos = 1;
      return columns;
    })();
    yPos += height;
    return rows;
  });
};

const rcGrid = d3.select(`#randomColorsGrid`)
  .append(`svg`)
  .attr(`width`, `510px`)
  .attr(`height`, `510px`);

const rcRow = rcGrid.selectAll(`.rcRow`)
  .data(buildRCCGridData())
  .enter().append(`g`)
  .attr(`class`, `rcRow`);

const rcColumn = rcRow.selectAll(`.rcSquare`)
  .data(d => d)
  .enter().append(`rect`)
  .attr(`class`, `rcSquare`)
  .attr(`x`, d => d.x)
  .attr(`y`, d => d.y)
  .attr(`width`, d => d.width)
  .attr(`height`, d => d.height)
  .style(`fill`, getRandomSquareColor)
  .style(`stroke`, `#222`)
  .on(`click`, onClickableSquareClick);



/**
 * CLICKABLE GRID
 * ==============
 */
const buildClickableGridData = (yPos = 1) => {
  return generateData(ROWS, () => {
    let width = 50;
    let height = 50;
    let click = 0;
    const rows = ((xPos = 1) => {
      const columns = generateData(COLUMNS, () => {
        const data = {
          x: xPos,
          y: yPos,
          width,
          height,
          click,
        };
        xPos += width;
        return data;
      });
      xPos = 1;
      return columns;
    })();
    yPos += height;
    return rows;
  });
};

const clGrid = d3.select(`#clickableGrid`)
  .append(`svg`)
  .attr(`width`, `510px`)
  .attr(`height`, `510px`);

const clRow = clGrid.selectAll(`.clRow`)
  .data(buildClickableGridData())
  .enter().append(`g`)
  .attr(`class`, `clRow`);

const cColumn = clRow.selectAll(`.clSquare`)
  .data(d => d)
  .enter().append(`rect`)
  .attr(`class`, `clSquare`)
  .attr(`x`, d => d.x)
  .attr(`y`, d => d.y)
  .attr(`width`, d => d.width)
  .attr(`height`, d => d.height)
  .style(`fill`, `#fff`)
  .style(`stroke`, `#222`)
  .on(`click`, onClickableSquareClick);
