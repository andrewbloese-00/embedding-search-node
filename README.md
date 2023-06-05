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




### Running Time v0.0.2
>![Version 0.0.2](https://github.com/andrewbloese-00/embedding-search-node/blob/main/test/tables/optimized_v1.png?raw=true) Running Time(ms) over search space size (n). Improvements include implementation of max heap for ranking. Removed mergesort step. 

### Running Time v0.0.3
>![Version 0.0.3](https://github.com/andrewbloese-00/embedding-search-node/blob/main/test/tables/experiment_graph_v2.png?raw=true) Running Time(ms) over search space size (n). Improvements include implementation of "smartVector" format to reduce calls to expensive "magnitude" function. For small n (n ≤ 20000), use builtin sort to prevent heap overhead. 

### Insights

* Variability: Some data points deviate from the overall increasing trend, indicating that factors other than search space alone can influence the algorithm's performance. This can likely be attributed to the fact that the sorting step is determined by the number of "over threshold" similarity elements included in the search space.


--- 

## How is this useful? 
The advent of embedding-based vector search has ushered in a new era of search capabilities, offering unprecedented advantages in various domains. By harnessing the power of high-dimensional vector spaces and semantic similarities, this approach enables accurate and context-aware searches, paving the way for enhanced user experiences, personalized recommendations, and advanced data analytics. With embedding-based vector search, businesses and researchers can delve deeper into the intricacies of their data, uncovering hidden patterns and associations that were previously inaccessible. As this technology continues to evolve and mature, we can expect even more groundbreaking applications and transformative advancements in search methodologies, propelling us into a future where information retrieval is faster, more accurate, and more intuitive than ever before.
