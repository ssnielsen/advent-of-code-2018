import fs from 'fs';
import R from 'ramda';

import readline from 'readline';

const regex = /-?\d+/g;

const hasValue = <T>(value: T | undefined | null): value is T => {
    return value !== undefined && value !== null;
};

const data = R.pipe(
    (filename: string) => fs.readFileSync(filename, 'utf-8'),
    R.split('\n'),
    R.map((node: string) => {
        const matches = node.trim().match(regex);

        if (!matches) {
            return null;
        }

        const parsedMatches = matches.map(Number);
        return {
            x: parsedMatches[0]!,
            y: parsedMatches[1]!,
            dx: parsedMatches[2]!,
            dy: parsedMatches[3]!,
        };
    }),
)(`${__dirname}/input`).filter(hasValue);

const bounds = (points: typeof data) => {
    return points.reduce(
        (bounds, point) => {
            return {
                minX: Math.min(bounds.minX, point.x),
                maxX: Math.max(bounds.maxX, point.x),
                minY: Math.min(bounds.minY, point.y),
                maxY: Math.max(bounds.maxY, point.y),
            };
        },
        {
            minX: Infinity,
            maxX: -Infinity,
            minY: Infinity,
            maxY: -Infinity,
        },
    );
};

const area = (box: ReturnType<typeof bounds>) => {
    return (box.maxX - box.minX) * (box.maxY - box.minY);
};

const print = (points: typeof data) => {
    const {minX, maxX, minY, maxY} = bounds(points);

    for (let y = minY; y <= maxY; ++y) {
        let line = '';
        for (let x = minX; x <= maxX; ++x) {
            const hasPoint = points.some(p => p.x === x && p.y === y);
            line += hasPoint ? '#' : '.';
        }
        console.log(line);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const nextState = (points: typeof data) => {
    return points.map(point => {
        return {
            x: point.x + point.dx,
            y: point.y + point.dy,
            dx: point.dx,
            dy: point.dy,
        };
    });
};

const part1 = (points: typeof data) => {
    const compute = (points: typeof data, lastArea: number = Infinity, moves: number = 0) => {
        const afterMove = nextState(points);
        const newArea = area(bounds(afterMove));
        console.log('area', newArea);
        console.log('moves', moves);
        if (newArea > lastArea) {
            print(points);
        } else {
            compute(afterMove, newArea, moves + 1);
        }
    };

    compute(points);
};

export const run = () => {
    part1(data);
};
