
#Algorithms

Big O is a way to categorize algorithm on time/memory requirements based on input. It generalizes the growth of your algorithm.

$$
O(n) -> Linear
$$

Generally, it helps us make decisions about what data structures to use and not to.

```typescript
function sumCharCodes(n: string): number {
	let sum = 0;
	
	for (let i = 0; i < n.length; ++i) {
		sum += n.charCodeAt(i);
	}
	
	for (let i = 0; i < n.length; ++i) {
		sum += n.charCodeAt(i);
	}

	return sum;
}
```

There's no way to create a free trade-off. You cannot create memory without some time.

The complexity of the above algorithm is O(n). Many people can actually say it is O(2n) but when we are talking about Big O, we mean to describe the upper bound of the algorithm, so the constant becomes irrelevant

$$
[N = 1]->[O(10N) = 10]and[O(N^2) = 1]
$$
$$
[N = 5]->[O(10N) = 50]and[O(N^2) = 25]
$$
$$
[N = 100]->[O(10N) = 1000]and[O(N^2) = 10000]
$$
$$
[N = 1000]->[O(10N) = 100000]and[O(N^2) = 100000000]
$$

That's why constants becomes irrelevant. When you take a look at the constants, it grows disproportionally larger the bigger the constant is, but it is not an exact precise math, as we are not trying to measure cycles, memory, any resource.

**There is a practical vs theoretical differences**.

Just because N is faster than N^2 does not mean it is always faster for smaller inputs. 

```typescript
function sumCharCodes(n: string): number {
	let sum = 0;
	
	for (let i = 0; i < n.length; ++i) {
		const charCode = n.charCodeAt(i);

		// Capital E
		if (charCode === 69) {
			return sum;
		}
		
		sum += charCode
	}

	return sum;
}
```

The above code is still O(n). We always consider the worst case. In the worst case, the capital E will be the last letter, and it is still O(n).

![[Screenshot 2025-02-06 at 08.38.41.png]]

Every loop isO(n) and decision is O(1). As we are always looking at the worst case, the algorithm ends up being O(1) (more on that later).

### O(n^2) and O(n^3)

```typescript
function sumCharCodes(n: string): number {
	let sum = 0;
	
	for (let i = 0; i < n.length; ++i) {
		for (let j = 0; j < n.length; ++j) {
			sum += n.charCodeAt(i);
		}
	}

	return sum;
}
```

Loops inside loops creates a square complexity. If there was a 3rd loop, it would be cubic complexity. It is used mostly on sortings.

### O(n log n)

Quicksorts. For every time you go over, you halve the amount of spaces, but you need to search the entire space every time.

### O(log n)

Binary search trees. You halve the amount but only look at one place at a time.

### O(n)

Most search algorithms. As the length of the arrays grows, so does our search.

### O(sqrt(n))

Only one algorithm. The craziest of all.

React most common way of passing props: <Component {...props} /> Is a huge memory damager.

### O(1)

Constant times means that we are always performing the same amount of steps no matter what the number of inputs are.

For example: searching an index in array
