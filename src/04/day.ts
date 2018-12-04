import fs from 'fs';
import {Map, List, Range} from 'immutable';

const parseRegex = /\[([-\s:\d]+)\]\s(.*)/;
const guardRegex = /#(\d+)/;

const hasValue = <T>(candidate: T | null | undefined): candidate is T => {
    return candidate !== null && candidate !== undefined;
};

interface Action {
    timestamp: string;
    minute: number;
}

interface BeginsShiftAction extends Action {
    action: 'begins shift';
    id: string;
}

interface FallsAsleepAction extends Action {
    action: 'falls asleep';
}

interface WakesUpAction extends Action {
    action: 'wakes up';
}

type ActionType = BeginsShiftAction | FallsAsleepAction | WakesUpAction;

const data = fs
    .readFileSync('./src/04/input', 'utf8')
// const data = 'test\nsss'
    .split('\n')
    .filter(l => l.length > 0)
    .map((line): ActionType | undefined => {
        const [, timestamp, action] = parseRegex.exec(line);
        const guardResult = guardRegex.exec(action);
        const minute = parseInt(timestamp.substring(timestamp.length - 2), 10);

        const defaultAction = {
            timestamp,
            action,
            minute,
        };

        if (guardResult) {
            return {
                ...defaultAction,
                action: 'begins shift',
                id: guardResult[1],
            };
        } else
        if (action === 'falls asleep') {
            return {
                ...defaultAction,
                action: 'falls asleep',
            };
        } else if (action === 'wakes up') {
            return {
                ...defaultAction,
                action: 'wakes up',
            };
        }
    })
    .filter(hasValue)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

interface Interval {
    from: number;
    to: number;
}

interface State {
    timetable: Map<string, List<Interval>>;
    onDuty: string | null;
    fellAsleep: number | null;
}

const intervalHistogram = (intervals: List<Interval>) => {
    return intervals.reduce((state, interval) => {
        return Range(interval.from, interval.to).reduce((state, minute) => {
            return state.set(minute, state.get(minute, 0) + 1);
        }, state);
    }, Map<number, number>());
};

const crunch = (data: ActionType[]) => {
    return data.reduce((state: State, action) => {
        if (action.action === 'begins shift') {
            return {
                ...state,
                onDuty: action.id,
            };
        } else if (action.action === 'falls asleep') {
            return {
                ...state,
                fellAsleep: action.minute,
            };
        } else {
            return {
                ...state,
                fellAsleep: null,
                timetable: state.timetable.set(
                    state.onDuty!,
                    (state.timetable.get(state.onDuty!) || List()).concat({from: state.fellAsleep, to: action.minute - 1}),
                ),
            };
        }
    }, {
        timetable: Map<string, List<{from: number, to: number}>>(),
        onDuty: null,
        fellAsleep: null,
    });
};

const part1 = (data: ActionType[]) => {
    const result = crunch(data);

    // Guards' total sleeping time
    const totalSleepingTime = result.timetable
        .map(intervals => intervals
            .reduce((result, interval) => result + (interval.to - interval.from), 0));

    // Most sleeping guard
    const [id] = totalSleepingTime
        .entrySeq()
        .toList()
        .sortBy(e => e[1])
        .last(undefined)!;

    // Most sleeping guards' top minute
    const [bestMinute] = intervalHistogram(result.timetable.get(id)!)
        .entrySeq()
        .toList()
        .sortBy(minute => minute[1])
        .last(undefined)!;

    return parseInt(id, 10) * bestMinute;
};

const part2 = (data: ActionType[]) => {
    const result = crunch(data);

    // Guards' top minute
    const minuteFrequency = result
        .timetable.map(intervals => {
            const [minute, frequency] = intervalHistogram(intervals)
                .entrySeq()
                .toList()
                .sortBy(minute => minute[1])
                .last(undefined)!;
            return {
                minute,
                frequency,
            };
        });

    // Guard with most frequent minute
    const [id, {minute}] = minuteFrequency
        .entrySeq()
        .toList()
        .sortBy(v => v[1].frequency)
        .last(undefined)!;

    return parseInt(id, 10) * minute;
};

export const run = () => {
    console.log(part1(data));
    console.log(part2(data));
};
