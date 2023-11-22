export function rand(min = 111111111, max = 999999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
