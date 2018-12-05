import fs from 'fs';

const data = fs.readFileSync('./src/05/input', 'utf8').trim();

export const bruteForce = (data: string) => {
    let i = 0;
    let result = data;

    while (true) {
        if (i === result.length) {
            return result;
        }

        if (Math.abs(result.charCodeAt(i) - result.charCodeAt(i + 1)) === 32) {
            result = result.slice(0, i) + result.slice(i + 2);
            i -= 1;
        } else {
            i += 1;
        }
    }
};

const part1 = (data: string) => {
    return bruteForce(data).length;
};

const part2 = (data: string) => {
    return Math.min(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .split('')
        .map(letter => bruteForce(
                data
                    .replace(new RegExp(letter, 'g'), '')
                    .replace(new RegExp(letter.toLowerCase(), 'g'), ''),
            ).length,
        ),
    );
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
