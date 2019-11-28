import R from 'ramda';

const rotate = <T>(arr: T[], n: number) => {
    return arr.slice(n, arr.length).concat(arr.slice(0, n));
};

const rotateOnce = <T>(arr: T[], reverse: boolean = false) => {
    if (reverse) {
        arr.unshift(arr.pop()!);
    } else {
        arr.push(arr.shift()!);
    }
    return arr;
};

const isMultipleOf23 = (n: number) => {
    return n !== 0 && n % 23 === 0;
};

class Node<T> {
    public readonly value: T;
    public prev: Node<T>;
    public next: Node<T>;

    constructor(value: T, prev: Node<T> | null = null, next: Node<T> | null = null) {
        this.value = value;
        this.prev = prev || this;
        this.next = next || this;
    }
}

const part2 = (players: number, lastMarbleWorth: number) => {
    const scores = Array(players).fill(0);
    let currentPlayer = 1;
    let current = new Node(0);

    R.range(1, lastMarbleWorth + 1).forEach(marble => {
        if (marble % 10000 === 0) {
            console.log(marble);
        }
        if (isMultipleOf23(marble)) {
            scores[currentPlayer] += marble;
            current = current.prev.prev.prev.prev.prev.prev;
            scores[currentPlayer] += current.prev.value;
            current.prev.prev.next = current;
            current.prev = current.prev.prev;
        } else {
            current = addAfter(marble, current.next);
        }
        currentPlayer = (currentPlayer % players) + 1;
    });

    return highestScore(scores);
};

const print = <T>(startNode: Node<T>) => {
    let string = `${startNode.value}`;
    let next = startNode.next;

    while (next !== startNode) {
        string += `, ${next.value}`;
        next = next.next;
    }

    console.log(string);
};

const addAfter = <T>(value: T, node: Node<T>) => {
    const newNode = new Node(value, node, node.next);
    node.next.prev = newNode;
    node.next = newNode;
    return newNode;
};

const part1_v2 = (players: number, lastMarbleWorth: number) => {
    const scores = Array(players).fill(0);
    const circle = [0];

    R.range(1, lastMarbleWorth + 1).forEach(marble => {
        if (marble % 10000 === 0) {
            console.log(marble);
        }
        if (isMultipleOf23(marble)) {
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            rotateOnce(circle, true);
            scores[marble % players] += marble + circle.pop()!;
            rotateOnce(circle);
        } else {
            rotateOnce(circle);
            circle.push(marble);
        }
    });

    return highestScore(scores);
};

// interface State {
//     marbleNumber: number;
//     position: number;
//     marbles: number[];
//     turn: number;
//     scores: number[];
// }

// const part1 = (players: number, lastMarbleWorth: number) => {
//     const nextStep = (state: State): State => {
//         if (state.marbleNumber % 1000 === 0) {
//             console.log(state.marbleNumber);
//         }

//         if (isMultipleOf23(state.marbleNumber)) {
//             let newPosition = state.position - 9;

//             if (newPosition < 0) {
//                 newPosition = state.marbles.length - newPosition;
//             }
//             const newScores = R.adjust(
//                 state.turn,
//                 oldScore => oldScore + state.marbleNumber + state.marbles[newPosition],
//                 state.scores,
//             );
//             const marblesAfterRemovingSevenCounterClockwise = R.remove(newPosition, 1, state.marbles);

//             return {
//                 marbleNumber: state.marbleNumber + 1,
//                 position: (newPosition + 2) % marblesAfterRemovingSevenCounterClockwise.length,
//                 marbles: marblesAfterRemovingSevenCounterClockwise,
//                 turn: (state.turn + 1) % players,
//                 scores: newScores,
//             };
//         }

//         const newMarbles = R.insert(state.position, state.marbleNumber, state.marbles);

//         return {
//             marbleNumber: state.marbleNumber + 1,
//             position: (state.position + 2) % newMarbles.length,
//             marbles: newMarbles,
//             turn: (state.turn + 1) % players,
//             scores: state.scores,
//         };
//     };

//     const initialState = {
//         marbleNumber: 0,
//         position: 0,
//         marbles: [],
//         turn: 0,
//         scores: new Array(players).fill(0),
//     };

//     const endState = new Array(lastMarbleWorth).fill(0).reduce(state => {
//         return nextStep(state);
//     }, initialState);

//     // const endState = nextStep(initialState);

//     return indexWithHighestScore(endState.scores);
// };

const highestScore = (scores: number[]) => {
    return R.reduce(R.max, -Infinity, scores);
};

export const run = () => {
    const players = 425;
    const lastMarbleWorth = 70848;

    // const players = 9;
    // const lastMarbleWorth = 25;
    // const players = 10;
    // const lastMarbleWorth = 1618;

    // console.log(`Part 1 ${part1_v2(players, lastMarbleWorth)}`);
    // console.log(`Part 2 ${part1_v2(players, lastMarbleWorth * 100)}`);
    console.log(`Part 1 ${part2(players, lastMarbleWorth)}`);
    console.log(`Part 2 ${part2(players, lastMarbleWorth * 100)}`);
};
