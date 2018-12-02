import {part1} from './day';

test('Empty array should be zero', () => {
    expect(part1([0])).toBe(0);
});

test('Positive singleton array should be elements value', () => {
    expect(part1([42])).toBe(42);
});

test('Negative singleton array should be elements value', () => {
    expect(part1([-99])).toBe(-99);
});

test('Several elements should result in the sum of them', () => {
    expect(part1([1, 2, 3, -4, 5])).toBe(7);
});
