class MaxHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(item) {
      this.heap.push(item);
      this.heapifyUp(this.heap.length - 1);
    }
  
    heapifyUp(index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (parentIndex >= 0 && this.heap[parentIndex][0] < this.heap[index][0]) {
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index],this.heap[parentIndex],];
        this.heapifyUp(parentIndex);
      }
    }
  
    extractMax() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();
      const max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(0);
      return max;
    }
  
    heapifyDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let largestIndex = index;
  
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex][0] > this.heap[largestIndex][0]
      ) {
        largestIndex = leftChildIndex;
      }
  
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex][0] > this.heap[largestIndex][0]
      ) {
        largestIndex = rightChildIndex;
      }
  
      if (largestIndex !== index) {
        [this.heap[largestIndex], this.heap[index]] = [this.heap[index],this.heap[largestIndex]];
        this.heapifyDown(largestIndex);
      }
    }
  
    size() {
      return this.heap.length;
    }
  }

  module.exports = MaxHeap