export function randomizedPrimMaze(width, height, start, end) {
  const path = [...Array(width)].map(() => Array(height).fill(true));
  const walls = [...Array(width)].map(() => Array(height).fill(false));

  let frontiersIdSet = new Set();
  let frontiers = [];
  frontiersIdSet.add(getIndexId(start, width));
  frontiers.push(start);
  let counter = 0;
  path[end.x][end.y] = false;
  while (frontiers.length > 0) {
    // get random frontier
    const frontier = getRandom(frontiers);
    // set frontier to part of path
    path[frontier.x][frontier.y] = false;

    // neighbors of frontier
    let neighbors = adjacent(frontier.x, frontier.y, width, height);
    neighbors = neighbors.filter((n) => {
      return path[n.x][n.y] && !walls[n.x][n.y];
    });
    for (const n of neighbors) {
      if (frontiersIdSet.has(getIndexId(n, width))) {
        walls[n.x][n.y] = true;
        frontiersIdSet.delete(getIndexId(n, width));
        removeItem(n.x, n.y, frontiers);
      } else {
        frontiersIdSet.add(getIndexId(n, width));
        frontiers.push(n);
      }
    }

    frontiersIdSet.delete(getIndexId(frontier, width));
    removeItem(frontier.x, frontier.y, frontiers);
  }
  return path;
}
function removeItem(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) array.splice(i, 1);
  }
}
function getIndexId({ x, y }, width) {
  return x + y * width;
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function adjacent(x, y, width, height) {
  const neighbors = [];

  if (x > 0) neighbors.push({ x: x - 1, y: y });
  if (x < width - 1) neighbors.push({ x: x + 1, y: y });
  if (y > 0) neighbors.push({ x: x, y: y - 1 });
  if (y < height - 1) neighbors.push({ x: x, y: y + 1 });

  return neighbors;
}
