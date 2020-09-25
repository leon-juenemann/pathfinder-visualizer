const HORIZONTAL = 0;
const VERTICAL = 1;

export function recursiveDivisionMaze(width, height, start, end)
{
    const maze = [...Array(width)].map(() =>
        Array(height).fill(false));

    divide(maze, 0, 0, width, height);
    maze[start.x][start.y] = false;
    maze[end.x][end.y] = false;
    //addSurroundingWall(maze, width, height);
    return maze;
}

function divide(maze, x, y, width, height)
{
    if (width < 2 || height < 2) return;

    const orientation = chooseOrientation(width, height);
    const horizontal = orientation === HORIZONTAL;

    if (horizontal)
    {
        const wx = x;
        const wy = randomEvenInteger(y, y + height - 1);

        const px = randomOddInteger(x, x + width - 1);
        const py = y;

        // draw wall
        for (let i = 0; i < width; i++) maze[wx+i][wy] = true;
        // add corridor
        maze[px][wy] = false;
        
        const h1 = wy - y;
        const h2 = height - h1 - 1;
        divide(maze, x, y, width, h1);
        divide(maze, x, wy+1, width, h2);

    } 
    else
    {
        const wx = randomEvenInteger(x, x + width - 1);
        const wy = y;

        const px = x;
        const py = randomOddInteger(y, y + height - 1);

        // draw wall
        for (let i = 0; i < height; i++) maze[wx][wy+i] = true;
        maze[wx][py] = false;
        
        const w1 = wx - x;
        const w2 = width - w1 - 1
        divide(maze, x, y, w1, height);
        divide(maze, wx+1, y, w2, height);  
    } 
}
function addSurroundingWall(maze, width, height)
{
    for (let i = 0; i < width; i++) maze[i][0] = true;
    for (let i = 0; i < width; i++) maze[i][height-1] = true;
    for (let i = 0; i < height; i++) maze[0][i] = true;
    for (let i = 0; i < height; i++) maze[width-1][i] = true;
}
function randomEvenInteger(from, to)
{
    const even = [];
    for (let i = from; i <= to; i++)
    {
        if (i % 2 == 0) even.push(i);
    }

    const randomIndex = Math.floor(Math.random() * even.length);

    const randomEven = even[randomIndex];

    return randomEven;
}
function randomOddInteger(from, to)
{
    const odd = [];
    for (let i = from; i <= to; i++)
    {
        if (i % 2 != 0) odd.push(i);
    }

    const randomIndex = Math.floor(Math.random() * odd.length);

    const randomOdd = odd[randomIndex];

    return randomOdd;
}

function chooseOrientation(width, height)
{
    if (width < height) return HORIZONTAL;

    if (width > height) return VERTICAL;

    return Math.random() < 0.5 ? HORIZONTAL : VERTICAL;
}