
function sumOfSquares(vector){
    let sum = 0;
    for(let v = 0; v < vector.length; v++){
        sum += vector[v]*vector[v] 
    }
    return sum
}

const magnitude = (vector) => Math.sqrt(sumOfSquares(vector));


/**
 * 
 * @param {number[]} u - an array of numbers representing a vector to dot
 * @param {number[]} v - an array of numbers representing a vector to dot
 * @returns {number}
 */
const dot = ( u , v ) => {
    let product = 0
    for(let i = 0; i < u.length; i++){
        product += u[i]*v[i]
    }
    return product
}


//creates a structure that stores the passed in vector, along with calculated magnitude
/**
 * @deprecated
 * @param {number[]} basicVector 
 * @about llm embeddings are already normalized no need to calculate magnitude 
 * @returns {{v:number[]}}
 */
const smartVector = (basicVector)=>{
    // const m = magnitude(basicVector)
    return { v: basicVector } //, m: m}
}


/**
 * @about Calculates the cosine similarity between vectors a and b
 * @about provided vectors must be in "smartVector" format
 * @param {{v:number[],m:number}} a 
 * @param {{v:number[],m:number}} b 
 * @returns 
 */
const cosineSimilarity = ( a,b ) => { 
    return ( dot(a.v,b.v) ) //the cosine similarity is the same as the dot product on two normalized vectors
}


module.exports = {magnitude, dot, sumOfSquares, cosineSimilarity,smartVector}