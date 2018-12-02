import fs from 'fs';

const data = fs
    .readFileSync('./src/02/input', 'utf8')
    .split('\n')
    .filter(l => l.length > 0);

export const part1 = (data: string[]) => {
    return data
        .map(id => {
            const buckets: {[x: string]: number} = {};
            id.split('').forEach(letter => buckets[letter] = (buckets[letter] || 0) + 1);
            return [
                Object.values(buckets).includes(2) ? 1 : 0,
                Object.values(buckets).includes(3) ? 1 : 0,
            ];
        })
        .reduce(([twos, threes], [twoLine, threeLine]) => {
            return [twos + twoLine, threes + threeLine];
        }, [0, 0])
        .reduce((r, c) => r * c, 1);
};

const zip = <T, U>(ts: T[], us: U[]): Array<[T, U]> => {
    return ts.map((a, i) => {
        const tuple: [T, U] = [a, us[i]];
        return tuple;
    });
};

const match = (s1: string, s2: string) => {
    const diffIndeces: number[] = [];

    const zipped = zip(s1.split(''), s2.split(''));

    for (let i = 0; i < zipped.length; i++) {
        const [c1, c2] = zipped[i];

        if (c1 !== c2) {
            diffIndeces.push(i);
        }
    }

    return diffIndeces;
};

export const part2 = (data: string[]) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (i === j) {
                continue;
            }

            const diffIndeces = match(data[i], data[j]);

            if (diffIndeces.length === 1) {
                const index = diffIndeces[0];
                const result = data[i].split('');
                result.splice(index, 1);
                return result.join('');
            }
        }
    }
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
