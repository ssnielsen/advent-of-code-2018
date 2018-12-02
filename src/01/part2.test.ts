import {part2} from './day';

test('Should terminate on repeated zero value', () => {
    expect(part2([0, 0])).toBe(0);
});

test('Should terminate on repeated non-zero value', () => {
    expect(part2([1, -1, 1])).toBe(1);
});

test('Should also work on negative repeated values', () => {
    expect(part2([-6, 7, -3, -4])).toBe(-6);
});
