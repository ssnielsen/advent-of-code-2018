import fs from 'fs';
import {List, Map, Range} from 'immutable';

const data = List(
    fs
        .readFileSync(`${__dirname}/input`, 'utf8')
        .trim()
        .split('\n')
        .map(line => {
            const [x, y] = line.trim().split(',').map(v => parseInt(v, 10));
            return {x, y};
        }),
);

interface Point {
    x: number;
    y: number;
}

const findBoundaries = (coordinates: typeof data) => {
    const xs = coordinates.map(c => c.x).toArray();
    const ys = coordinates.map(c => c.y).toArray();

    return {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
    };
};

const manhattanDistance = (from: Point, to: Point) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);

const name = (p: Point) => `${p.x}, ${p.y}`;

const findDefiniteClosest = (p: Point, coordinates: typeof data) => {
    const distances = coordinates.reduce((reduction, c) => {
        const distance = manhattanDistance(p, c);

        if (distance === reduction.distance) {
            return {...reduction, closest: reduction.closest.push(name(c))};
        } else if (distance < reduction.distance) {
            return {...reduction, closest: List.of(name(c)), distance};
        } else {
            return reduction;
        }
    }, {closest: List<string>(), distance: Number.MAX_VALUE});

    return distances.closest.size !== 1 ? undefined : distances.closest.get(0);
};

const part1 = (input: typeof data) => {
    const {minX, maxX, minY, maxY} = findBoundaries(input);

    const banned = Range(minX, maxX + 1).map(x => ({x, y: minY}))
        .concat(Range(minX, maxX + 1).map(x => ({x, y: maxY})))
        .concat(Range(minY, maxY + 1).map(y => ({x: minX, y})))
        .concat(Range(minY, maxY + 1).map(y => ({x: maxX, y})))
        .map(p => findDefiniteClosest(p, input))
        .toSet();

    const result = Range(minX, maxX).reduce((outer, x) => {
        return Range(minY, maxY).reduce((inner, y) => {
            const closestPoint = findDefiniteClosest({x, y}, input);
            return closestPoint ?
                inner.update(closestPoint, n => (n || 0) + 1) :
                inner;
        }, outer);
    }, Map<string, number>());

    return result.filter((_, name) => !banned.has(name)).max();
};

const distanceToAll = (p: Point, all: typeof data) => {
    return all.reduce((result, other) => result + manhattanDistance(p, other), 0);
};

const part2 = (input: typeof data) => {
    const {minX, maxX, minY, maxY} = findBoundaries(input);

    return Range(minX, maxX)
        .flatMap(x => Range(minY, maxY).map(y => distanceToAll({x, y}, input)))
        .filter(d => d < 10_000)
        .count();
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
