import fs from 'fs';
import {Set} from 'immutable';

const data = fs
    .readFileSync('./src/01/input', 'utf8')
    .split('\n')
    .filter(s => s.length > 0)
    .map(l => {
        const sign = l.substring(0, 1);
        const delta = parseInt(l.substring(1), 10);
        if (sign === '+' || sign === '-') {
            return {
                sign,
                delta,
            };
        } else {
            throw Error(`First character should be a '+' or '-'. Found '${sign}'`);
        }
    });

const change = (frequency: number, instruction: {sign: string, delta: number}) => {
    const {sign, delta} = instruction;

    if (sign === '-') {
        return frequency - delta;
    } else if (sign === '+') {
        return frequency + delta;
    } else {
        return frequency;
    }
};

export const part1 = () => {
    return data.reduce(change, 0);
};

function* cycleThrough<T>(array: T[]) {
    let i = 0;

    while (true) {
        yield array[i % data.length];
        i++;
    }
}

export const part2 = () => {
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
