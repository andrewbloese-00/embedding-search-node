// Function to perform merge sort on an array
async function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    // Parallelize the sorting of left and right subarrays
    const [sortedLeft, sortedRight] = await Promise.all([
      mergeSort(left),
      mergeSort(right)
    ]);
  
    // Merge the sorted subarrays
    return merge(sortedLeft, sortedRight);
  }
  
  // Function to merge two sorted arrays
  function merge(left, right) {
    let merged = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][0] > right[rightIndex][0]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // Add remaining elements from left or right array
    return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  // Example usage
  const input = [[3, 'A'], [1, 'B'], [5, 'C'], [2, 'D'], [4, 'E']];
  
  async function main() {
    const sorted = await mergeSort(input);
    console.log(sorted);
  }
  
  main().catch(console.error);