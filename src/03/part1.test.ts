import {areaOfIntersection} from './day';

test('From the intro text intersects', () => {
    expect(areaOfIntersection(
        {
            id: '1',
            x: 1,
            y: 3,
            height: 4,
            width: 4,
        },
        {
            id: '2',
            x: 3,
            y: 1,
            height: 4,
            width: 4,
        },
    )).toBe(4);
});

test('From the intro text not intersects 1', () => {
    expect(areaOfIntersection(
        {
            id: '1',
            x: 1,
            y: 3,
            height: 4,
            width: 4,
        },
        {
            id: '2',
            x: 5,
            y: 5,
            height: 2,
            width: 2,
        },
    )).toBe(0);
});

test('From the intro text not intersects 2', () => {
    expect(areaOfIntersection(
        {
            id: '3',
            x: 5,
            y: 5,
            height: 2,
            width: 2,
        },
        {
            id: '2',
            x: 3,
            y: 1,
            height: 4,
            width: 4,
        },
    )).toBe(0);
});


test('Intersects with itself', () => {
    expect(areaOfIntersection(
        {
            id: '3',
            x: 5,
            y: 5,
            height: 2,
            width: 2,
        },
        {
            id: '2',
            x: 5,
            y: 5,
            height: 2,
            width: 2,
        },
    )).toBe(4);
});
