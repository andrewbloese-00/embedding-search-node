# About
This repository contains the code and data for a JavaScript vector search algorithm, along with an analysis of its running times for different search space sizes. Allows for the searching/ranking of a list of javascript objects with "embedding" fields. 

| [Notes](#notes) | [Test](#experiment) | [Data](#data)
|-----------------|---------------------|--------------|



# Usage 
Either clone this repository to your project or use 
`npm i embedding-search-node`


---


# Notes
### Avoiding senseless sorting 
Previously, every comparison result was stored to be sorted, however by incorporating a "threshold" parameter, we can omit clearly irrelevant results from being included in the list to be sorted. For n < 20,000 items, the builtin javascript sort function proved performant enough. 

### Maxheap for large n
for search spaces with more than 20,000 items, a maxheap is utilized. Introducing parameter "m" as the max number of results, instead of sorting through all "n" items, we simply perform "m" heap extractions. 

### Performance gains with "smart vectors"
In the prior implementation, magnitudes of vectors were recomputed each time a vector comparison was performed. In order to optimize this, I implemented a "smartVector" function that takes a regular number[] and converts it into an object with the format
```
{
    v: number[] //the original vector array
    m: number // the magnitude of the vector 
}
```

By computing the magnitude of the vector at creation, we save the comparison function from 2n calls to magnitude (previously each comparison performed 2 calls to magnitude for each of the n vectors). 




# Experiment
This experiment aimed to assess the performance of a vector comparison and ranking function that utilizes cosine similarity for determining the similarity between embedding vectors. The function was evaluated on various search space sizes, ranging from 10 to 163,000 items. Average execution times were measured for each search space size, and the distribution of computation time between vector comparisons and the merge sort step was analyzed. Currently the maximum searchable vectors in one call of the function is 163000 vectors of length 1536 ( without running out of memory and the process crashing ). 

The experiement was run on my 2020 M1 Macbook Air, using Node v19.8.1


### Data

The provided data includes average running times (in milliseconds) for the algorithm's execution on various search space sizes. The collected data points are as follows:

| Search Space | Running Time (ms) |
|--------------|------------------|
|     10       |     0.026        |
|     100      |     0.185        |
|    1000      |     2.610        |
|    2500      |     6.108        |
|    5000      |     12.216       |
|   10000      |     23.942       |
|   25000      |     52.884       |
|   30000      |     67.020       |
|   40000      |     192.223      |
|   50000      |     126.527      |
|   80000      |     160.684      |
|   130000     |     284.091      |
|   163000     |     344.077      |



#### Graph
Graph of the test results

### Insights

* Variability: Some data points deviate from the overall increasing trend, indicating that factors other than search space alone can influence the algorithm's performance. This can likely be attributed to the fact that the sorting step is determined by the number of "over threshold" similarity elements included in the search space.


--- 

## How is this useful? 
The advent of embedding-based vector search has ushered in a new era of search capabilities, offering unprecedented advantages in various domains. By harnessing the power of high-dimensional vector spaces and semantic similarities, this approach enables accurate and context-aware searches, paving the way for enhanced user experiences, personalized recommendations, and advanced data analytics. With embedding-based vector search, businesses and researchers can delve deeper into the intricacies of their data, uncovering hidden patterns and associations that were previously inaccessible. As this technology continues to evolve and mature, we can expect even more groundbreaking applications and transformative advancements in search methodologies, propelling us into a future where information retrieval is faster, more accurate, and more intuitive than ever before.

### Potential Use Cases
* Recommendation Systems: Embedding-based vector search enables personalized recommendations by capturing user preferences and item similarities. It powers recommendation engines in e-commerce platforms, music and video streaming services, content platforms, and social media platforms, delivering tailored recommendations to users based on their preferences and behavior.
* Image and Video Retrieval: By representing images and videos as vectors, embedding-based search allows for similarity-based retrieval. It finds applications in reverse image search, content-based image retrieval, visual recommendation systems, video summarization, and object recognition, enabling more accurate and efficient searches in multimedia databases.
* Anomaly Detection: Embedding-based vector search can identify anomalies by comparing data points against normal patterns. This is applied in fraud detection, network intrusion detection, predictive maintenance, and cybersecurity, where abnormal behavior can be identified by measuring the distance or similarity of vectors.
* Content Search and Discovery: Embedding-based search can enhance content discovery platforms, enabling users to find relevant articles, documents, research papers, or products by leveraging semantic similarities. It improves search engines, digital libraries, content management systems, and knowledge bases, making information retrieval more precise and context-aware.
* Personalization and User Profiling: By embedding user profiles and preferences into a vector space, embedding-based search can create personalized experiences. It enables personalized search results, targeted advertising, user segmentation, and user similarity-based recommendations, tailoring digital experiences to individual preferences.
* Genomics and Bioinformatics: Embedding-based vector search is utilized in genomics research to analyze DNA sequences, identify genetic variations, and classify genes based on their similarities. It aids in drug discovery, precision medicine, and understanding genetic relationships, offering insights into complex biological data.