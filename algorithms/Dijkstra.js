class Node {
  constructor(x, y, isWall) {
    this.x = x;
    this.y = y;
    this.isWall = isWall;
    this.isVisited = false;
    this.distance = Infinity;
    this.prevNode = null;
  }
}

class Dijkstra {
  constructor(grid, start, end) {
    this.nodeGrid = this.initialiseNodeGrid(grid, start, end);
    this.start = start;
    this.end = end;
    this.visitedNodes = [];
    this.shortestPathNodes = [];
  }

  initialiseNodeGrid(grid, start, end) {
    const nodeGrid = [];
    for (let x = 0; x < grid.length; x++) {
      nodeGrid[x] = [];
      for (let y = 0; y < grid[0].length; y++) {
        nodeGrid[x][y] = new Node(x, y, grid[x][y]);
      }
    }
    const startNode = nodeGrid[start.x][start.y];
    startNode.distance = 0;

    return nodeGrid;
  }
  getVisited() {
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

  computeVisitedNodes() {
    const visitedNodes = [];
    const nodeGrid = this.nodeGrid;
    const nodes = nodeGrid.flat();
    while (nodes.length > 0) {
      nodes.sort((n1, n2) => n1.distance - n2.distance);
      const closest = nodes.shift();

      if (closest.isWall) continue;

      if (closest.distance === Infinity) return visitedNodes;

      closest.isVisited = true;
      visitedNodes.push(closest);

      if (closest.x === this.end.x && closest.y === this.end.y)
        return visitedNodes;

      this.updateNeighbors(closest);
    }
    return visitedNodes;
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

  updateNeighbors(node) {
    const neighbors = this.getNeighbors(node);
    for (const n of neighbors) {
      n.distance = node.distance + 1;
      n.prevNode = node;
    }
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

    return neighbors.filter((n) => !n.isVisited);
  }
}

export default Dijkstra;
