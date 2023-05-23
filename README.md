# About

A vector search utility written purely in javascript with no dependencies. Allows for the searching/ranking of a list of javascript objects with "embedding" fields. 

# Experiment
This experiment aimed to assess the performance of a vector comparison and ranking function that utilizes cosine similarity for determining the similarity between embedding vectors. The function was evaluated on various search space sizes, ranging from 10 to 150,000 items. Average execution times were measured for each search space size, and the distribution of computation time between vector comparisons and the merge sort step was analyzed. Currently the maximum searchable vectors in one call of the function is 15000, without running out of memory and the process crashing. 

## Experiment Results Average
> Note: The averages are of 100 different running times for each space size. 

| Search Space Size | Average Time (ms) |
|-------------------|------------------|
| 10                | 0.108            |
| 100               | 0.467            |
| 1,000             | 4.522            |
| 10,000            | 46.124           |
| 100,000           | 489.528          |
| 125,000           | 634.274          |
| 150,000           | 717.302          |


