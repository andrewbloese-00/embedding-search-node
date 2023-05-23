const MaxHeap = require("./maxheap")

/**
 * 
 * @param {MaxHeap} heap 
 * @param {*} n 
 */
function ranker(heap, n){
    const result = []
    for(let i = 0; i < n; i++){
        result.push(heap.extractMax())
    }
    return result
}
module.exports = ranker