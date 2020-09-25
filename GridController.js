import AStar from './algorithms/AStar.js';
import DFS from './algorithms/Dfs.js';
import Dijkstra from './algorithms/Dijkstra.js';
import {recursiveDivisionMaze} from'./mazes/recursiveDivision.js';
import {randomizedPrimMaze} from'./mazes/prim.js';
import GridModel from './GridModel.js';
import GridView from './GridView.js';

class GridController
{
    constructor()
    {
        this.gridModel = new GridModel();
        this.gridView = new GridView();
        this.mouseDown = false;
        this.isAnimating = false;
        this.movingStartTile = false;
        this.movingEndTile = false;
        this.animationTimers = [];
        this.setup();
    }
    setup()
    {
        const width = this.gridView.numberColumns();
        const height = this.gridView.numberRows();

        this.gridModel.setup(width, height);
        this.gridView.drawGrid(width, height);

        this.setDefaultStart();
        this.setDefaultEnd();

        this.bindHandlers();
    }

    bindHandlers()
    {
        this.gridView.bindClickAnimation(this.handleClickAnimation);

        // algorithmn
        this.gridView.bindClickDijkstra(this.handleClickDijkstra);
        this.gridView.bindClickAstar(this.handleClickAstar);
        this.gridView.bindClickDfs(this.handleClickDfs);

        // maze
        this.gridView.bindClickClear(this.handleClickClear);
        this.gridView.bindClickPrim(this.handleClickPrim);
        this.gridView.bindClickRec(this.handleClickRec);

        // speed
        this.gridView.bindClickSlow(this.handleClickSlow);
        this.gridView.bindClickMedium(this.handleClickMedium);
        this.gridView.bindClickFast(this.handleClickFast);


        this.gridView.bindMouseUp(this.handleMouseUp);
        this.bindTileHandlers();
    }
    setDefaultStart()
    {
        const width = this.gridModel.width;
        const height = this.gridModel.height;
        const startX = Math.floor(width / 4);
        const startY = Math.floor(height / 2);
        this.gridModel.setStart(startX, startY);
        this.gridView.addStart(startX, startY);
    }
    setDefaultEnd()
    {
        const width = this.gridModel.width;
        const height = this.gridModel.height;
        const endX = width - Math.floor(width / 4);
        const endY = Math.floor(height / 2);
        this.gridModel.setEnd(endX, endY);
        this.gridView.addEnd(endX, endY);
    }
    bindTileHandlers()
    {
        const width = this.gridModel.width;
        const height = this.gridModel.height;
        for (let x = 0; x < width; x++)
        {
            for (let y = 0; y < height; y++)
            {
                this.gridView.
                    bindTileMouseDown(x, y, this.handleTileMouseDown);
                this.gridView.
                    bindTileClick(x, y, this.handleTileClick);
                this.gridView.
                    bindTileMouseOver(x, y, this.handleTileMouseOver);
                this.gridView.
                    bindTileMouseOut(x, y, this.handleTileMouseOut);
            }
        }
    }
    handleMouseUp = () =>
    {
        this.mouseDown = false;
    }

    handleTileMouseDown = (x, y) =>
    {
        if (this.isAnimating) return

        if (!this.movingStartTile && !this.movingEndTile)
        {
            this.mouseDown = true;

            if (!this.gridModel.isStart(x,y) &&
                !this.gridModel.isEnd(x,y))
            {
                this.gridModel.toggleWall(x, y);
                this.gridView.toggleWall(x, y);
            }
        }
    }
    handleClickAnimation = () =>
    {
        if (this.isAnimating)
        {
            this.stopAnimations();
            this.clearAnimations();
            this.isAnimating = false;
        }
        else 
        {
            this.animate();
            this.isAnimating = true;
        }
    }
    handleClickDijkstra = () =>
    {
        this.gridModel.algorithm = "dijkstra";
    }
    handleClickAstar = () =>
    {
        this.gridModel.algorithm = "astar";
    }
    handleClickDfs = () =>
    {
        this.gridModel.algorithm = "dfs";
    }
    handleClickPrim = () =>
    {
        if (this.isAnimating) this.stopAnimations();

        const width = this.gridModel.width;
        const height = this.gridModel.height;
        const start = this.gridModel.start;
        const end = this.gridModel.end;

        this.clearBoard();

        const maze = randomizedPrimMaze(width, height, start, end);
        this.gridModel.wallGrid = maze;
        this.gridView.drawMaze(maze);
    }
    handleClickRec = () =>
    {
        if (this.isAnimating) this.stopAnimations();

        const width = this.gridModel.width;
        const height = this.gridModel.height;
        const start = this.gridModel.start;
        const end = this.gridModel.end;

        this.clearBoard();

        const maze = recursiveDivisionMaze(width, height, start, end);
        this.gridModel.wallGrid = maze;
        this.gridView.drawMaze(maze);
    }

    handleClickClear = () => 
    {
        this.stopAnimations();
        this.clearBoard();
    }


    handleClickSlow = () =>
    {
        this.gridModel.speed = "slow";
    }
    handleClickMedium = () =>
    {
        this.gridModel.speed = "medium";
    }
    handleClickFast = () =>
    {
        this.gridModel.speed = "fast";
    }

    handleTileMouseOver = (x, y) =>
    {
        if (this.isAnimating) return

        const isStart = this.gridModel.isStart(x, y);
        const isEnd = this.gridModel.isEnd(x, y);
        const isWall = this.gridModel.isWall(x, y);
        if (this.mouseDown)
        {
            if (!isEnd && !isStart)
            {
                this.gridModel.toggleWall(x, y);
                this.gridView.toggleWall(x, y);
            }
        }

        if (this.movingStartTile)
        {
            this.gridView.addStart(x, y);
        }
        if (this.movingEndTile)
        {
            this.gridView.addEnd(x, y);
        }
    }
    handleTileMouseOut = (x, y) =>
    {
        if (this.isAnimating) return

        if (this.movingStartTile)
        {
            this.gridView.removeStart(x, y);
        }
        else if (this.movingEndTile)
        {
            this.gridView.removeEnd(x, y);
        }
    }   
    handleTileClick = (x, y) => 
    {
        if (this.isAnimating) return

        const isStart = this.gridModel.isStart(x, y);
        const isEnd = this.gridModel.isEnd(x, y);
        const isWall = this.gridModel.isWall(x, y);

        if (this.movingStartTile)
        {
            if (!isEnd && !isWall)
            {
                this.movingStartTile = false;
                this.gridModel.setStart(x, y);
            }
        }
        else if (this.movingEndTile)
        {
            if (!isStart && !isWall)
            {
                this.movingEndTile = false;
                this.gridModel.setEnd(x, y);
            }
        }
        else 
        {
            if (isStart)
            {
                const {x, y} = this.gridModel.start;
                this.movingStartTile = true;
            }
            else if (isEnd)
            {
                const {x, y} = this.gridModel.end;
                this.movingEndTile = true;
            }
        }
    }
    clearBoard()
    {
        this.clearAnimations();
        this.clearWalls();
    }
    clearWalls()
    {
        const width = this.gridModel.width;
        const height = this.gridModel.height;

        this.gridModel.removeWalls();
        
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
              this.gridView.removeClass(x, y, "wall");
            }
        }
    }
    animate()
    {
        const pf = this.pathfinder(this.gridModel.algorithm);
        pf.run();
        const visited = pf.getVisited();
        const shortestPath = pf.getShortestPath();
        const tickRate = this.animationSpeed(this.gridModel.speed);
        const offset = this.animateVisited(visited, tickRate);
        this.animateShortestPath(shortestPath, tickRate, offset);
    }
    animateVisited(nodes, tickRate)
    {
        let prev = nodes[0];
        this.gridView.addClass(prev.x, prev.y, "current");

        for (let i = 1; i < nodes.length; i++)
        {
            const curr = nodes[i];
            let timer = setTimeout(() => 
            {
                this.gridView.removeClass(prev.x, prev.y, "current");
                if (i != 1)
                {
                    this.gridView.addClass(prev.x, prev.y, "visited");
                }
                this.gridView.addClass(curr.x, curr.y, "current");
    
                prev = curr;
            }, i * tickRate);
            this.animationTimers.push(timer);
        }
        // remove current style from endTile
        let lastTimer = setTimeout(() => 
        {
            const end = nodes.pop();
            this.gridView.removeClass(end.x, end.y, "current");

        }, nodes.length * tickRate);
        this.animationTimers.push(lastTimer);
        const time = tickRate * this.animationTimers.length;
        return time;
    }

    animateShortestPath(nodes, tickRate, timeOffset) {

        for (let i = 1; i < nodes.length - 1; i++) {
            let curr = nodes[i];
            let timer = setTimeout(() => 
            {
                this.gridView.addClass(curr.x, curr.y, "current");
            }, timeOffset + i * tickRate);
            this.animationTimers.push(timer);
        }
    }
    clearAnimations() {
        const width = this.gridModel.width;
        const height = this.gridModel.height;

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            this.gridView.removeClass(x, y, "visited");
            this.gridView.removeClass(x, y, "current");
            this.gridView.removeClass(x, y, "shortest_path");
          }
        }
      }
      
    stopAnimations() {
        this.isAnimating = false;
        this.animationTimers.forEach(clearTimeout);
        this.animationTimers = [];
    }

    pathfinder(algorithm)
    {
      const wallGrid = this.gridModel.wallGrid;
      const start = this.gridModel.start;
      const end = this.gridModel.end;
      switch(algorithm) {
        case "dijkstra":
            return new Dijkstra(wallGrid, start, end);
        case "astar":
            return new AStar(wallGrid, start, end);
        case "dfs":
            return new DFS(wallGrid, start, end);
        default:
            return new Dijkstra(wallGrid, start, end);
      }
    }

    animationSpeed(speed)
    {
        switch(speed) {
            case "slow":
                return 100;
            case "medium":
                return 50;
            case "fast":
                return 20;
            default:
                return 50;
        }
    }
}

export default GridController;