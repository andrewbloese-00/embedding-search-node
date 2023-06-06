
const REG_SEARCH_LIMIT = 25000;


//vector math functions 
const { cosineSimilarity , smartVector} = require("./lib/customMath")


//expose the embedding interface using openai api keys
const { EmbeddingInterface } = require("./lib/embeddings")

const MaxHeap = require("./lib/maxheap")


function extractEmbeddingsFromItems(itemsWithEmbeddings){
    return itemsWithEmbeddings.map(item=>item.embedding)
}

//a pretty bad way to deep copy something 
function susDeepCopy(item){
    return JSON.parse(JSON.stringify(item))
}

/**
 * 
 * @param {{[key:string]: any, embedding:number[]}[]} itemsWithEmbeddings - any array of objects containing an 'embedding' attribute. The embedding must be an array of numbers (represents a vector)
 * @param {number[]} queryVector - the embedding of the query to search list  
 * @param {number} threshold - the minimum required similarity between two vectors to be considered 
 * @param {number} n - the max number of responses to include in the response
 * @param {boolean} trackAnomalies - whether to track anomalies
 * @returns {{ranked: {[key:string]: any, score:number}}}
*/
function GetRankedEmbeddingSearch(itemsWithEmbeddings,queryVector, threshold=0.6, n=10){
    let vector_space = extractEmbeddingsFromItems(itemsWithEmbeddings)
    let results = ( vector_space.length < REG_SEARCH_LIMIT )
        ? []
        : new MaxHeap()


    //score the embeddings
    for(let i = 0; i < vector_space.length; i++){
        let s = cosineSimilarity(queryVector, vector_space[i]);
        if(s >= threshold){
            if(vector_space.length < REG_SEARCH_LIMIT){
                results.push([s,i])
            } else { 
                results.insert([s,i])
            }
        } 
    }

    //sort // extract the best scores
    let ranked = []
    if(vector_space.length < REG_SEARCH_LIMIT){ //small spaces use built in sort
        ranked = results.sort(([scoreA,vIA],[scoreB,vIB])=>scoreB-scoreA).slice(0,n)
    } else { 
        for(let i =0; i < n; i++)
            ranked.push(results.extractMax());
    }

    //return an array of size ay most "n" with no null values
    let top =  ranked.filter(i=>!!i).map(([score,idx])=>{
        //map the ranked items back to their items, not including their embeddings 
        //but rather their cosine similarity in the  "score" field
        let res = susDeepCopy(itemsWithEmbeddings[idx])
        res["score"] = score
        delete res["embedding"]
        return res
        
    })
    return top
}


module.exports = { GetRankedEmbeddingSearch, smartVector, EmbeddingInterface  } 


