import R from 'ramda';

const isMultipleOf23 = (n: number) => {
    return n % 23 === 0;
};

const part1 = (players: number, lastMarbleWorth: number) => {
    const marbles = R.range(0, lastMarbleWorth + 1);

    const circle = []
};

export const run = () => {
    const players = 425;
    const lastMarbleWorth = 70848;

    console.log(part1(players, lastMarbleWorth));
};


