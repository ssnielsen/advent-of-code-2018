import {bruteForce} from './day';

test('Simple 1', () => {
    expect(bruteForce('aA')).toBe('');
});

test('Simple 2', () => {
    expect(bruteForce('Aa')).toBe('');
});

test('Empty', () => {
    expect(bruteForce('')).toBe('');
});

test('Intermediate 1', () => {
    expect(bruteForce('aabAAB')).toBe('aabAAB');
});

test('Intermediate 2', () => {
    expect(bruteForce('abAB')).toBe('abAB');
});

test('Intermediate 3', () => {
    expect(bruteForce('abBA')).toBe('');
});

test('Intermediate 4', () => {
    expect(bruteForce('dabAcCaCBAcCcaDA')).toBe('dabCBAcaDA');
});

test('Intermediate 5', () => {
    expect(bruteForce('dabAcCaCBAcCcaDAthisisatest')).toBe('dabCBAcaDAthisisatest');
});
