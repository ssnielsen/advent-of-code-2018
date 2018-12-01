import fs from 'fs';
import {Set} from 'immutable';

const file = fs.readFileSync('./src/01/input','utf8');

const data = file
    .split('\n')
    .filter(s => s.length > 0)
    .map(l => {
        const sign = l.substring(0, 1);
        const rest = l.substring(1);
        const number = parseInt(rest, 10);
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

export const part2 = () => {
    let heuristic = Set<number>();
    let frequency = 0;
    let i = 0;

    while (i < data.length) {
        frequency = change(frequency, data[i]);

        if (heuristic.has(frequency)) {
            return frequency;
        } else {
            heuristic = heuristic.add(frequency);
        }

        if (i === data.length-1) {
            i = 0;
        } else {
            i += 1;
        }
    }
}
