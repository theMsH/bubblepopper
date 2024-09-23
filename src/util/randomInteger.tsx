export function randomInteger(min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min)) + min + 1
    return random
}