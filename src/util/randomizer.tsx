export function randomInteger(min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min)) + min + 1
    return random
}

export function randomizeCoin() {
    if (Math.random() > 0.8) {
        return true
    }
    else return false
}