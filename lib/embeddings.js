const { Configuration , OpenAIApi } = require("openai")
const  { smartVector } = require("./customMath")

class EmbeddingInterface { 
    static EmbeddingsModel = "text-embedding-ada-002";
    static EmbeddingCostPerToken = 0.0000004;
    constructor(openaiApiKey, openaiOrg=undefined){
        if(!openaiApiKey)
            throw new Error('Must provide an openai api key to initialize the embedding interface');
        
        let options = openaiOrg != undefined 
            ? {  apiKey: openaiApiKey,organization: openaiOrg } 
            : { apiKey: openaiApiKey }
        
        try {
            const config = new Configuration(options);
            this.openai = new OpenAIApi(config);
        } catch (error) {
            console.error(error)
            throw error
        }
            
    }

    /**
     * 
     * @param {string} text the text to generate an embedding vector for
     * @returns {{embedding: {v:number[],m:number}}|{error:Error}} On success returns the embedding vector wrapped in a 'smartVector' with its calculated magnitude. 
     */
    async GetEmbeddingVector(text){
        try {
            const response = await this.openai.createEmbedding({
                model: EmbeddingInterface.EmbeddingsModel,
                input: text
            })
            return { embedding: response.data.data[0].embedding}
        } catch (error) {
            console.error(error)
            return { error }
        }
    }
    predictCost(text){
        const numTokens = Math.ceil(text.length / 4)
        return { cost: (numTokens * EmbeddingInterface.EmbeddingCostPerToken), tokens: numTokens}
    }
    
    

}




module.exports ={EmbeddingInterface}