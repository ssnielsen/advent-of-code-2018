import fs from 'fs';
import {Set} from 'immutable';

const data = fs
    .readFileSync('./src/01/input','utf8')
    .split('\n')
    .filter(s => s.length > 0)
    .map(l => {
        const sign = l.substring(0, 1);
        const number = parseInt(l.substring(1), 10);
        if (sign === '+' || sign === '-') {
            return {
                sign,
                number,
            };
        } else {
            throw Error(`First character should be a '+' or '-'. Found '${sign}'`);
        }
    });

const change = (frequency: number, instruction: {sign: string, number: number}) => {
    const {sign, number} = instruction;

    if (sign === '-') {
        return frequency - number;
    } else if (sign === '+') {
        return frequency + number;
    } else {
        return frequency;
    }
}

export const part1 = () => {
    return data.reduce(change, 0);
};

function* cycleThrough<T>(array: Array<T>) {
    let i = 0;

    while (true) {
        yield array[i % data.length];
        i++;
    }
}

export const part2 = () => {
    let heuristic = Set<number>();
    let frequency = 0;

    for (var instruction of cycleThrough(data)) {
        frequency = change(frequency, instruction);

        if (heuristic.has(frequency)) {
            return frequency;
        } else {
            heuristic = heuristic.add(frequency);
        }
    }
}
