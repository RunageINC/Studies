//O(n), as our input grows, so does the number of operations

export default function linearSearch(haystack: [], needle: number): boolean {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true;
    }
  }

  return false;
}

//for good practices, it is good not to return in for loop
// Returning in a loop is a bad practice because it can lead to unexpected behavior.
// such as hardr debugging, and it is not clear what the function is doing

export function linearSearchGoodPractice(
  haystack: [],
  needle: number
): boolean {
  let found = false;

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      found = true;
      break;
    }
  }

  return found;
}
