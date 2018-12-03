import {claimInstesects} from './day';

test('From the intro text intersects', () => {
    expect(claimInstesects(
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
    )).toBeTruthy();
});

test('From the intro text not intersects 1', () => {
    expect(claimInstesects(
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
    )).toBeFalsy();
});

test('From the intro text not intersects 2', () => {
    expect(claimInstesects(
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
    )).toBeFalsy();
});


test('Intersects with itself', () => {
    expect(claimInstesects(
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
    )).toBeTruthy();
});
