class GridModel {
    constructor()
    {
        this.width = 0;
        this.height = 0;
        this.start = { x: 0, y: 0 };
        this.end = { x: 0, y: 0 };
        this.wallGrid = [];
        this.algorithm = "dijkstra";
        this.speed = "medium";
    }
    setup(width, height)
    {
      this.setWidth(width);
      this.setHeight(height);
      this.wallGrid = this.emtyWallGrid();
    }
    setWidth(width)
    {
      this.width = width;
    }
    setHeight(height)
    {
      this.height = height;
    }
    toggleWall(x, y)
    {
      if (!this.isStart(x,y) && !this.isEnd(x,y))
        this.wallGrid[x][y] = !this.wallGrid[x][y] 
    }
    emtyWallGrid()
    {
      return [...Array(this.width)].map(() =>
        Array(this.height).fill(false));
    }
    removeWalls()
    {
      this.wallGrid = this.emtyWallGrid();
    }
    setStart(x, y) {
        this.start.x = x;
        this.start.y = y;
      }
      setEnd(x, y) {
        this.end.x = x;
        this.end.y = y;
      }
      isStart(x, y) {
        return x === this.start.x && y === this.start.y;
      }
      isEnd(x, y) {
        return x === this.end.x && y === this.end.y;
      }
      isWall(x, y)
      {
        return this.wallGrid[x][y];
      }
}

export default GridModel;

