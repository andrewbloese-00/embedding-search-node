

const { cosineSimilarity } = require("./lib/customMath")
const MaxHeap = require("./lib/maxheap")


/**
 * 
 * @param {{[key:string]: any, embedding:number[]}[]} itemsWithEmbeddings - any array of objects containing an 'embedding' attribute. The embedding must be an array of numbers (represents a vector)
 * @param {number[]} queryVector - the embedding of the query to search list  
 * @param {number} threshold - the minimum required similarity between two vectors to be considered 
 * @param {number} n - the max number of responses to include in the response
 * @returns 
*/
function GetRankedEmbeddingSearch(itemsWithEmbeddings,queryVector, threshold=0.6, n=10){
    let vex = itemsWithEmbeddings.map((item)=>item.embedding)
    let results;

    if(vex.length < 20000){ //use basic array sort for smaller spaces
        results =[]
    }  else {
        results = new MaxHeap()
    }

    //score the embeddings
    for(let i = 0; i < vex.length; i++){
        let s = cosineSimilarity(queryVector, vex[i]);
        if(s >= threshold){
            if(vex.length < 20000){
                results.push([s,i])
            } else { 
                results.insert([s,i])
            }
        };
    }

    //sort // extract the best scores
    let ranked = []
    if(vex.length < 20000){ //small spaces use built in sort
        ranked = results.sort(([scoreA,vIA],[scoreB,vIB])=>scoreB-scoreA).slice(0,n)
    } else { 
        for(let i =0; i < n; i++)
            ranked.push(results.extractMax());
    }

    //return an array of size ay most "n" with no null values
    return ranked.filter(i=>!!i)
}


module.exports = { GetRankedEmbeddingSearch } 


