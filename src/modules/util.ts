export function rand(min: number = 111111111, max: number = 999999999): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
