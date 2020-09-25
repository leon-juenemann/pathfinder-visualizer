class DfsNode {
  constructor(x, y, isWall) {
    this.x = x;
    this.y = y;
    this.isWall = isWall;
    this.isVisited = false;
    this.prevNode = null;
  }
}

class DFS {
  constructor(wallGrid, start, end) {
    this.start = start;
    this.end = end;
    this.wallGrid = wallGrid;

    this.visitedNodes = [];
    this.shortestPathNodes = [];
  }

  run() {
    const visitedNodes = this.computeVisitedNodes();
    const shortestPathNodes = this.computeShortestPath(visitedNodes);
    this.visitedNodes = visitedNodes;
    this.shortestPathNodes = shortestPathNodes;
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

  computeVisitedNodes() {
    const visitedNodes = [];
    const nodeGrid = this.initializeNodes();
    const nodes = [];
    const startNode = nodeGrid[this.start.x][this.start.y];
    nodes.push(startNode);

    while (nodes.length > 0) {
      const current = nodes.pop();
      if (current.isVisited) continue;

      current.isVisited = true;
      visitedNodes.push(current);

      if (current.x == this.end.x && current.y == this.end.y)
        return visitedNodes;

      const neighbors = this.getNeighbors(current, nodeGrid);
      for (const n of neighbors) {
        n.prevNode = current;
        nodes.push(n);
      }
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

  initializeNodes() {
    const nodeGrid = this.wallGrid.map((r, x) => {
      return r.map((isWall, y) => {
        return new DfsNode(x, y, isWall);
      });
    });
    return nodeGrid;
  }

  getNeighbors(node, nodeGrid) {
    const neighbors = [];
    const { x, y } = node;
    const gridWidth = nodeGrid.length;
    const gridHeight = nodeGrid[0].length;
    if (x > 0) neighbors.push(nodeGrid[x - 1][y]);
    if (x < gridWidth - 1) neighbors.push(nodeGrid[x + 1][y]);
    if (y > 0) neighbors.push(nodeGrid[x][y - 1]);
    if (y < gridHeight - 1) neighbors.push(nodeGrid[x][y + 1]);

    return neighbors.filter((n) => !(n.isWall || n.isVisited));
  }
}

export default DFS;
