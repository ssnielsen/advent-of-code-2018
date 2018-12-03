import {part1} from './day';

test('No twos or threes', () => {
    expect(part1([
        'a',
        'b',
        'c',
    ])).toBe(0);
});

test('Only two twos', () => {
    expect(part1([
        'a',
        'bb',
        'cc',
    ])).toBe(0);
});

test('One three', () => {
    expect(part1([
        'bbb',
        'cc',
    ])).toBe(1);
});

test('Two twos and thre threes', () => {
    expect(part1([
        'a',
        'bb',
        'cc',
        'ddd',
        'xxx',
        'uuu',
        'y',
    ])).toBe(6);
});
