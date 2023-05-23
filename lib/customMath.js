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
const smartVector = (basicVector)=>{
    const m = magnitude(basicVector)
    return { v: basicVector, m: m}
}


/**
 * 
 * @param {{v:number[],m:number}} a 
 * @param {{v:number[],m:number}} b 
 * @returns 
 */
const cosineSimilarity = ( a,b ) => { 
    // let mA = magnitude(a), mB = magnitude(b)
    if(a.m === 0 || b.m === 0 ) return 0
    return ( dot(a.v,b.v) / (a.m * b.m) )
}


module.exports = {magnitude, dot, sumOfSquares, cosineSimilarity,smartVector}