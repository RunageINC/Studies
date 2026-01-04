
Tags: [[Reducing Latency]], [[System Design]]

### Introduction

Databases can be a huge source of latency if not designed properly/optimized as they should.

There are two main things that can be attacked to solve latency issues with database:

- Indexing
- Adjust slow queries

Indexing plays a vital role in improving the efficiency of database queries.

![[Database indexing example.png]]

Indexes reduces the need of scanning the entire table to search for a specific record. Those indexes can be created for a column or a group of columns. This reduces time and resources to process queries. It becomes even more effective the larger the dataset is.