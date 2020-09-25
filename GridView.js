const TILE_WIDTH = 25;
class GridView {
  constructor() {
    // containers
    this.gridApp = document.getElementById("grid-app");
    this.grid = document.getElementById("grid");
    this.navbar = document.getElementById("navbar");

    // animate button
    this.animateBtn = document.getElementById("animate-btn");

    // algorithm dropdown
    this.algorithmBtn = document.getElementById("algo-dropdown");
    this.dijkstraBtn = document.getElementById("dijkstra-btn");
    this.astarBtn = document.getElementById("astar-btn");
    this.dfsBtn = document.getElementById("dfs-btn");

    // maze dropdown
    this.mazeBtn = document.getElementById("maze-dropdown");
    this.clearBtn = document.getElementById("clear-btn");
    this.primBtn = document.getElementById("prim-btn");
    this.recBtn = document.getElementById("rec-btn");

    // speed dropdown
    this.speedBtn = document.getElementById("speed-dropdown");
    this.slowBtn = document.getElementById("slow-btn");
    this.mediumBtn = document.getElementById("medium-btn");
    this.fastBtn = document.getElementById("fast-btn");
    this.setGridHeight();
  }

  toggleClass(x, y, className) {
    const id = this.tileId(x, y);
    document.getElementById(id).classList.toggle(`${className}`);
  }
  toggleWall(x, y) {
    this.toggleClass(x, y, "wall");
  }
  addStart(x, y) {
    this.addClass(x, y, "start");
  }
  removeStart(x, y) {
    this.removeClass(x, y, "start");
  }
  addEnd(x, y) {
    this.addClass(x, y, "end");
  }
  removeEnd(x, y) {
    this.removeClass(x, y, "end");
  }

  addClass(x, y, className) {
    const id = this.tileId(x, y);
    document.getElementById(id).classList.add(`${className}`);
  }
  removeClass(x, y, className) {
    const id = this.tileId(x, y);
    document.getElementById(id).classList.remove(`${className}`);
  }
  tileId(x, y) {
    return `${x},${y}`;
  }
  drawGrid(width, height) {
    let gridHtml = "";
    for (let x = 0; x < width; x++) {
      gridHtml += `<div class="col">`;
      for (let y = 0; y < height; y++) {
        gridHtml += `<div id="${this.tileId(x, y)}" class="node"></div>`;
      }
      gridHtml += "</div>";
    }
    this.grid.innerHTML = gridHtml;
  }
  drawMaze(maze) {
    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[0].length; y++) {
        if (maze[x][y]) {
          this.toggleWall(x, y);
        }
      }
    }
  }

  // event bindings
  bindClickAnimation(handler) {
    this.animateBtn.addEventListener("click", () => {
      handler();
    });
  }
  bindClickDijkstra(handler) {
    this.dijkstraBtn.addEventListener("click", () => {
      this.algorithmBtn.innerHTML = "Dijkstra";
      handler();
    });
  }
  bindClickAstar(handler) {
    this.astarBtn.addEventListener("click", () => {
      this.algorithmBtn.innerHTML = "Astar (Manhatten)";
      handler();
    });
  }
  bindClickDfs(handler) {
    this.dfsBtn.addEventListener("click", () => {
      this.algorithmBtn.innerHTML = "Depth First Search";
      handler();
    });
  }

  bindClickClear(handler) {
    this.clearBtn.addEventListener("click", () => {
      handler();
    });
  }

  bindClickPrim(handler) {
    this.primBtn.addEventListener("click", () => {
      handler();
    });
  }
  bindClickRec(handler) {
    this.recBtn.addEventListener("click", () => {
      handler();
    });
  }

  bindClickSlow(handler) {
    this.slowBtn.addEventListener("click", () => {
      this.speedBtn.innerHTML = "Slow";
      handler();
    });
  }
  bindClickMedium(handler) {
    this.mediumBtn.addEventListener("click", () => {
      this.speedBtn.innerHTML = "Medium";
      handler();
    });
  }
  bindClickFast(handler) {
    this.fastBtn.addEventListener("click", () => {
      this.speedBtn.innerHTML = "Fast";
      handler();
    });
  }
  bindMouseUp(mouseUpHandler) {
    this.gridApp.addEventListener("mouseup", () => {
      mouseUpHandler();
    });
  }
  bindTileClick(x, y, handler) {
    const tile = document.getElementById(this.tileId(x, y));
    tile.addEventListener("click", () => {
      handler(x, y);
    });
  }

  bindTileMouseOver(x, y, handler) {
    const tile = document.getElementById(this.tileId(x, y));
    tile.addEventListener("mouseover", () => {
      handler(x, y);
    });
  }

  bindTileMouseOut(x, y, handler) {
    const tile = document.getElementById(this.tileId(x, y));
    tile.addEventListener("mouseout", () => {
      handler(x, y);
    });
  }

  bindTileMouseDown(x, y, handler) {
    const tile = document.getElementById(this.tileId(x, y));
    tile.addEventListener("mousedown", () => {
      handler(x, y);
    });
  }

  numberColumns() {
    const widthPx = document.getElementById("grid").clientWidth;
    return Math.floor(widthPx / TILE_WIDTH);
  }
  numberRows() {
    const heightPx = document.getElementById("grid").clientHeight;
    return Math.floor(heightPx / TILE_WIDTH);
  }
  setGridHeight() {
    const navbar = document.getElementById("navbar");
    const grid = document.getElementById("grid");

    const height = document.body.clientHeight - navbar.clientHeight;
    grid.style.height = height + "px";
  }
}
export default GridView;
