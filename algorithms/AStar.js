class astarNode {
    constructor(x, y, isWall, h) {
      this.x = x;
      this.y = y;
      this.isWall = isWall;
      this.isVisited = false;
      this.cost = Infinity;
      this.f = 0;
      this.h = h;
      this.prevNode = null;
    }
  }


class AStar
{
    constructor(grid, start, end)
    {
        this.start = start;
        this.end = end;
        this.visitedNodes = [];
        this.shortesPathNodes = [];
        this.nodeGrid = this.initialiseNodeGrid(grid, start, end)
    }

    initialiseNodeGrid(grid, start, end) {
        const nodeGrid = [];
        for (let x = 0; x < grid.length; x++) {
          nodeGrid[x] = [];
          for (let y = 0; y < grid[0].length; y++) {
            nodeGrid[x][y] = new astarNode(x, y, grid[x][y], this.manhatten(x,y));
          }
        }
        const startNode = nodeGrid[start.x][start.y];
        startNode.cost = 0;
    
        return nodeGrid;
    }
    getVisited  () {
      const nodesInOrder = this.visitedNodes.map((n) => {
        return { x: n.x, y: n.y };
      });
      return nodesInOrder;
    }
  
    getShortestPath() {
      const shortestPath = this.shortestPathNodes.map((n) => {
        return { x: n.x, y: n.y };
      });
      return shortestPath;
    }
    run() {
        const visitedNodes = this.computeVisitedNodes();
        const shortestPathNodes = this.computeShortestPath(visitedNodes);
    
        this.visitedNodes = visitedNodes;
        this.shortestPathNodes = shortestPathNodes;
    }
    manhatten(x, y)
    {
        const xDist = Math.abs(this.end.x - x);
        const yDist = Math.abs(this.end.y - y);

        return xDist + yDist;
      
    }

    computeShortestPath(visitedNodes) {
        const last = visitedNodes[visitedNodes.length - 1];
        const shortestPath = [];
        let current = last;
        if (last.x === this.end.x && last.y === this.end.y) {
          while (current != null) {
            shortestPath.push(current);
            current = current.prevNode;
          }
        }
        return shortestPath.reverse();
    }
    computeVisitedNodes()
    {
        const openList = [];
        const closedList = new Set();
        const visitedNodes = [];
        openList.push(this.nodeGrid[this.start.x][this.start.y]);
        while (openList.length > 0)
        {
            openList.sort((n1, n2) => n1.f - n2.f);
            const current = openList.shift();
            if (current.isWall) continue;
            visitedNodes.push(current);
            closedList.add(current);
            if (current.x === this.end.x && current.y === this.end.y)
                return visitedNodes;

            this.expandNode(current, openList, closedList)
        }
        return visitedNodes;
      }

      expandNode(current, openList, closedList)
      {
        const succsessors = this.getNeighbors(current);
        for (const n of succsessors) {

          if (closedList.has(n)) continue; 

          const tentative_g = current.cost + 1;
          
          if (this.isInOpenList(openList, n) && tentative_g >= n.cost)
              continue;

          n.prevNode = current;
          n.cost = tentative_g;

          const f = tentative_g + n.h;
          n.f = f;
          if (!this.isInOpenList(openList, n)) openList.push(n);
        }

      }

      isInOpenList(openList, node)
      {
          for (const n of openList)
          {
              if (n.x === node.x && n.y === node.y)
                return true;
          }
          return false;
      }

      getNeighbors(node) {
        const neighbors = [];
        const { x, y } = node;
        const gridWidth = this.nodeGrid.length;
        const gridHeight = this.nodeGrid[0].length;
        if (x > 0)
          neighbors.push(this.nodeGrid[x - 1][y]);
        if (x < gridWidth - 1)
          neighbors.push(this.nodeGrid[x + 1][y]);
        if (y > 0)
          neighbors.push(this.nodeGrid[x][y - 1]);
        if (y < gridHeight - 1) 
          neighbors.push(this.nodeGrid[x][y + 1]);
    
        return neighbors.filter((n) => !n.isWall);
      }
}
export default AStar;