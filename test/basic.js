const {GetRankedEmbeddingSearch} = require("../index")
const { smartVector } = require("../lib/customMath")

const SEARCH_SPACE_SIZE = 163000
const SEARCH_SPACE_EMBEDDING_DIM = 1536

let vectorItems = []

//function to generate a 'vector' array of specified length
function vectorFactory(length){
    let vector = Array(length).fill(0)
    for(let i = 0; i < length; i++){
        vector[i] = Math.random()
    }
    const smartv = smartVector(vector)
    vectorItems.push({embedding:smartv, text: `${Math.random().toFixed(2)}`})
}



//build the vectors
console.time(`Build Search Space`)
for(i = 0; i < SEARCH_SPACE_SIZE; i++){

    vectorFactory(SEARCH_SPACE_EMBEDDING_DIM)

}
console.timeEnd(`Build Search Space`)
console.log("Built " , SEARCH_SPACE_SIZE , " random vectors.")


function runSingleTest(spaceSize){
    const s = performance.now()
    if(spaceSize > SEARCH_SPACE_SIZE) throw new Error("Overflow, cannot support sizes > " + SEARCH_SPACE_SIZE)
    const space = vectorItems.slice(0,spaceSize)
    const r = Math.floor(Math.random() * (space.length-1))
    const {embedding} = space[r]
    const ranked = GetRankedEmbeddingSearch(space,embedding,0.65,10)
    return performance.now( ) - s

}


function avg(nums){
    let s = 0
    for(let num of nums) s += num;
    return s/nums.length
}

(async function main(x){

    //cold test 
    const coldTime = runSingleTest(50000)

    let sizes = [10,100,1000,2500,5000,10000,25000,30000,40000,50000,80000,130000,SEARCH_SPACE_SIZE]
    let records = {}
    //for a variety of sizes
    for(let size of sizes ){
        //run x tests each
        for(let i = 0; i < x; i++){
            console.log(`Running test ${i+1} on space [${size}]`)
            i ==0 
              ? records[`${size}`] = [runSingleTest(size,true)]
              : records[`${size}`].push(runSingleTest(size))
        }
    }
    // console.log(records)
    console.log('cold start on 50000 items', coldTime )
    console.log("Average running times for each search space")
    for(let size in records){
        let averageTime = avg(records[size])
        console.log(`${size} -> ${averageTime.toFixed(3)}ms`)
    }
})(10)