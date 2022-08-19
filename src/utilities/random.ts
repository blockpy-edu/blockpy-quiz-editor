export function shuffle<T>(array: T[], seed: number): T[] {
    // <-- ADDED ARGUMENT
    let m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed; // <-- ADDED LINE
    }

    return array;
}

function random(seed: number): number {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function subsetRandomly<T>(
    array: T[],
    amount: number,
    seed: number
): T[] {
    const copy = array.slice();
    shuffle(copy, seed);
    return copy.slice(0, amount);
}
