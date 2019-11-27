import fs from 'fs';
import R from 'ramda';

// const data = R.pipe(
//     R.trim,
//     R.split(' '),
//     R.map(x => Number(x)),
// )('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2');

const data = R.pipe(
    (filename: string) => fs.readFileSync(filename, 'utf-8'),
    R.trim,
    R.split(' '),
    R.map(x => Number(x)),
)(`${__dirname}/input`);

const chunk = <T>(chunks: number, input: T[]) => {
    const chunkSize = input.length / chunks;
    const list = Array<T[]>();

    for (let i = 0; i < chunks; i++) {
        list.push(input.slice(i * chunkSize, i * chunkSize + chunkSize));
    }

    return list;
};

const calculateSumOfMetadata = (part: number[]): number => {
    const [childNodes, metadataEntries, ...rest] = part;
    const forChildren = R.dropLast(metadataEntries, rest);
    const metadata = R.sum(R.takeLast(metadataEntries, rest));

    // console.log('numberOfChildren', numberOfChildren);
    // console.log('amountOfMetadata', amountOfMetadata);
    // console.log('forChildren.length', forChildren.length);
    // console.log('childSize', childSize);

    if (childNodes === 0) {
        return metadata;
    }

    const chunks = chunk(childNodes, forChildren);

    return metadata + R.sum(chunks.map(calculateSumOfMetadata));
};

const part1 = (input: typeof data) => {
    return calculateSumOfMetadata(input);
};

export const run = () => {
    // console.log(part1(data));
    console.log(part1(data));
    // console.log(chunk(List.of(1,2,3,4,5,6, 7), 3));
    // console.log(part2(data));
};
