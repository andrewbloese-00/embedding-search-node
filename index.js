/*
 * Author: Andrew Bloese
 * Description: A function that enables searching javascript objects that have attached vector embeddings. 
 * */



//math helpers


function sumOfSquares(vector){
    let sum = 0;
    for(let v = 0; v < vector.length; v++){
        sum += vector[v]*vector[v] 
    }
    return sum
}

const magnitude = (vector) => Math.sqrt(sumOfSquares(vector));
const dot = ( u , v ) => {
    let product = 0
    for(let i = 0; i < u.length; i++){
        product += u[i]*v[i]
    }
    return product
}


const cosineSimilarity = ( a,b ) => { 
    let mA = magnitude(a), mB = magnitude(b)
    if(mA === 0 || mB === 0) return 0
    return dot(a,b) / (mA*mB)
}


//end math helpers

//modified merge_sort

function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i][0] >= R[j][0]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
 

function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}

// end modified merge_sort



/**
 * 
 * @param {{[key:string]: any, embedding:number[]}[]} itemsWithEmbeddings - any array of objects containing an 'embedding' attribute. The embedding must be an array of numbers (represents a vector)
 * @param {number[]} queryVector - the embedding of the query to search list  
 * @param {number} threshold - the minimum required similarity between two vectors to be considered 
 * @param {number} n - the max number of responses to include in the response
 * @returns 
 */
function GetRankedEmbeddingSearch(itemsWithEmbeddings,queryVector, threshold=0.75, n=10){
    let vex = itemsWithEmbeddings.map((item)=>item.embedding)
    let results = []
    //compare the vectors in the space
    for(let v = 0; v < vex.length; v++){
        let sim = cosineSimilarity(queryVector, vex[v])
        if(sim > threshold){
            results.push([sim,v])
        }
    }
    //in place sort the results
    mergeSort(results,0,results.length-1);
    //transform results back into their respective vector items
    return results.slice(0,n).map(([score,i])=>({
       item: itemsWithEmbeddings[i],
       similarity: score
    }))
}


module.exports = { GetRankedEmbeddingSearch, cosineSimilarity} 
