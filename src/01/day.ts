import fs from 'fs';
import {Set} from 'immutable';

const data = fs
    .readFileSync('./src/01/input', 'utf8')
    .split('\n')
    .filter(s => s.length > 0)
    .map(l => parseInt(l, 10));

const change = (frequency: number, delta: number) => {
    return frequency + delta;
};

function* cycleThrough<T>(array: T[]) {
    let i = 0;

    while (true) {
        yield array[i % array.length];
        i++;
    }
}

export const part1 = (data: number[]) => {
    return data.reduce(change, 0);
};

export const part2 = (data: number[]) => {
    let heuristic = Set<number>();
    let frequency = 0;

    for (const instruction of cycleThrough(data)) {
        frequency = change(frequency, instruction);

        if (heuristic.has(frequency)) {
            return frequency;
        } else {
            heuristic = heuristic.add(frequency);
        }
    }
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
