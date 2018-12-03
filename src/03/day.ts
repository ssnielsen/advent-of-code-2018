import fs from 'fs';
import {List, Range} from 'immutable';

const parseRegex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;
const FABRIC_SIZE = 1000;

interface Claim {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const data = fs
    .readFileSync('./src/03/input', 'utf8')
    .split('\n')
    .filter(l => l.length > 0)
    .map(line => {
        const [, id, x, y, width, height] = parseRegex.exec(line);
        return {
            id,
            x: parseInt(x, 10),
            y: parseInt(y, 10),
            width: parseInt(width, 10),
            height: parseInt(height, 10),
        };
    });

interface StaticProducer<T> {
    producerVariant: 'static';
    value: T;
}

interface DynamicProducer<T> {
    producerVariant: 'dynamic';
    producer: () => T;
}

type Producer<T> = StaticProducer<T> | DynamicProducer<T>;

const makeFabric = <T>(size: number, producer: Producer<T>) => {
    return Array(size)
        .fill(null)
        .map(_ => Array(size)
            .fill(null)
            .map(_ => {
                if (producer.producerVariant === 'dynamic') {
                    return producer.producer();
                } else {
                    return producer.value;
                }
            }),
        );
};

export const areaOfIntersection = (c1: Claim, c2: Claim) => {
    if (!claimInstesects(c1, c2)) {
        return 0;
    }

    const rect1 = {
        left: c1.x,
        right: c1.x + c1.width,
        top: c1.y,
        bottom: c1.y + c1.height,
    };

    const rect2 = {
        left: c2.x,
        right: c2.x + c2.width,
        top: c2.y,
        bottom: c2.y + c2.height,
    };

    const xOverlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    const yOverlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    return xOverlap * yOverlap;
};

export const part1 = (input: Claim[]) => {
    const claimedFabric = input.reduce((result, {x, y, height, width}) => {
        Range(x, x + width).forEach(i => {
            Range(y, y + height).forEach(j => {
                result[i][j] = result[i][j] + 1;
            });
        });
        return result;
    }, makeFabric(FABRIC_SIZE, { producerVariant: 'static', value: 0 }));

    const result = List(claimedFabric)
        .flatMap(l => l)
        .reduce((result, inch) => result + (inch >= 2 ? 1 : 0), 0);

    return result;
};

export const claimInstesects = (c1: Claim, c2: Claim) => {
    return (
        Range(c1.x, c1.x + c1.width).contains(c2.x) ||
        Range(c2.x, c2.x + c2.width).contains(c1.x)
    ) && (
        Range(c1.y, c1.y + c1.height).contains(c2.y) ||
        Range(c2.y, c2.y + c2.height).contains(c1.y)
    );
};

export const part2 = (input: Claim[]) => {
    const result = input.reduce((result, c1) => {
        const claimHasIntersections = input.reduce((partialResult, c2) => {
            return partialResult || (c1.id === c2.id ? false : claimInstesects(c1, c2));
        }, false);
        return claimHasIntersections ? result : c1.id;
    }, undefined as (string | undefined));

    return result;
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
