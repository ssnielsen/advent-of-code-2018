import R from 'ramda';

interface Coordinate {
    x: number;
    y: number;
}

const getRackId = (x: number) => {
    return x + 10;
};

const getPowerLevel = (coordinate: Coordinate, gridSerialNo: number) => {
    // Find the fuel cell's rack ID, which is its X coordinate plus 10.
    const rackId = getRackId(coordinate.x);

    // Begin with a power level of the rack ID times the Y coordinate.
    const beginPowerLevel = rackId * coordinate.y;

    // Increase the power level by the value of the grid serial number (your puzzle input).
    const increasedBySerial = beginPowerLevel + gridSerialNo;

    // Set the power level to itself multiplied by the rack ID.
    const multiplied = increasedBySerial * rackId;

    // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
    const onlyHundredDigit = Number(String(multiplied).charAt(String(multiplied).length - 3)) || 0;

    // Subtract 5 from the power level.
    return onlyHundredDigit - 5;
};

// console.log(getPowerLevel({x: 3, y: 5}, 8)); // === 4
// console.log(getPowerLevel({x: 122, y: 79}, 57)); // === -5
// console.log(getPowerLevel({x: 217, y: 196}, 39)); // === 0
// console.log(getPowerLevel({x: 101, y: 153}, 71)); // === 4

const gridSize = 300;

const cache: {[key: string]: number} = {};

const makeGrid = (gridSerialNo: number) => {
    const grid = R.range(1, gridSize + 1).map(x =>
        R.range(0, gridSize + 1).map(y => getPowerLevel({x, y}, gridSerialNo)),
    );

    return grid;
};

const findSubgridWithLargestPower = (grid: ReturnType<typeof makeGrid>, subgridSize: number) => {
    let currentBest = {winner: {x: 0, y: 0}, totalPower: -Infinity, subgridSize: 0};

    for (let x = 1; x < gridSize - subgridSize + 1; x++) {
        for (let y = 1; y < gridSize - subgridSize + 1; y++) {
            let total = 0;

            // We have the result from the same coordinate but with a smaller grid in cache
            const cachedTotal = cache[`${x}_${y}_${subgridSize - 1}`] || 0;

            total += cachedTotal;

            // Extra line on X axis
            for (let dx = 0; dx < subgridSize - 1; dx++) {
                total += grid[x + dx]![y + subgridSize - 1]!;
            }

            // Extra line on Y axis
            for (let dy = 0; dy < subgridSize - 1; dy++) {
                total += grid[x + subgridSize - 1]![y + dy]!;
            }

            // Bottom right corner
            total += grid[x + subgridSize - 1]![y + subgridSize - 1]!;

            cache[`${x}_${y}_${subgridSize}`] = total;

            if (total > currentBest.totalPower) {
                const newWinner = {winner: {x, y}, totalPower: total, subgridSize};
                currentBest = newWinner;
            }
        }
    }

    console.log('best for', subgridSize, currentBest);

    return currentBest;
};

const part1 = (gridSerialNo: number) => {
    const grid = makeGrid(gridSerialNo);

    return findSubgridWithLargestPower(grid, 3);
};

const part2 = (gridSerialNo: number) => {
    const grid = makeGrid(gridSerialNo);

    return R.pipe(
        (maxGridSize: number) => R.range(1, maxGridSize),
        R.map(subgridSize => findSubgridWithLargestPower(grid, subgridSize)),
        R.reduce(
            (subgridWithLargestPower, subgrid) => {
                return subgrid.totalPower > subgridWithLargestPower.totalPower ? subgrid : subgridWithLargestPower;
            },
            {winner: {x: 0, y: 0}, totalPower: -Infinity, subgridSize: 0},
        ),
    )(300);
};

export const run = () => {
    const gridSerialNo = 1133;

    // Part 1 examples
    // const gridSerialNo = 18; // 33,45 with power of 29
    // const gridSerialNo = 42; // 21,61 with power of 30

    // Part 2 examples
    // const gridSerialNo = 18; // 90,269 with power of 113 (subgrid size 16)
    // const gridSerialNo = 42; // 232,251 with power of 119 (subgrid size 12)

    console.log(part1(gridSerialNo));
    console.log(part2(gridSerialNo));
};
