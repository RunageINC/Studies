// O(sqrt(n)), as our input grows, the number of operations grows
// at a slower rate making it more efficient than linear and binary
// search.

export default function twoCrystalBalls(breaks: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jumpAmount;

  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) break;
  }

  i -= jumpAmount;

  for (let j = 0; j < jumpAmount && i < breaks.length; ++j, ++i) {
    if (breaks[i]) return i;
  }

  return -1;
}
