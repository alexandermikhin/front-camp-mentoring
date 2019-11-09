# Task 3

## 3. Querying Restaurants Collection

### 1. How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?

Query:

```bash
db.restaurants.find({ "borough": "Queens", "cuisine": "Chinese" }).count()
```

Result:

```bash
728
```

### 2. What is the \_id of the restaurant which has the grade with the highest ever score?

Query:

```bash
db.restaurants.find({}, { _id: 1 }).sort({ "grades.score": -1 }).limit(1)
```

Result:

```js
{ "_id" : ObjectId("5dc573c40b10acc9bb6aa9ce") }
```

### 3. Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough).

Query:

```bash
db.restaurants.updateMany({ borough: "Manhattan" }, { $push: { grades: { grade: "A", score: 7, date: ISODate() } } })
```

Result:

```js
{ "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
```

### 4. What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without \_id.

Query:

```bash
db.restaurants.find({ "grades.8.score": { $lt: 7 } }, { _id: 0, "name": 1 })
```

Result:

```js
{ "name" : "Silver Krust West Indian Restaurant" }
{ "name" : "Pure Food" }
```

### 5. What are \_id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only \_id and borough.

Query:

```bash
db.restaurants.find({ cuisine: "Seafood", grades: { $elemMatch: { $and: [ { date: { $gt: ISODate("2014-02-01") } }, { date: { $lt: ISODate("2014-03-01") } }, { grade: "B" } ] } } }, { _id: 1, borough: 1 })
```

Result:

```js
{ "_id" : ObjectId("5dc573c50b10acc9bb6addcc"), "borough" : "Bronx" }
{ "_id" : ObjectId("5dc573c50b10acc9bb6ae044"), "borough" : "Manhattan" }
```

## 4. Indexing Restaurants Collection

### 1. Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan:

```bash
db.restaurants.find({ name: "Glorious Food" })
```

Implementation:

```bash
db.restaurants.createIndex({ name: 1 })
```

```json
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}
```

```bash
db.restaurants.explain().find({ name: "Glorious Food" })
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "name": {
        "$eq": "Glorious Food"
      }
    },
    "queryHash": "01AEE5EC",
    "planCacheKey": "4C5AEA2C",
    "winningPlan": {
      "stage": "FETCH",
      "inputStage": {
        "stage": "IXSCAN",
        "keyPattern": {
          "name": 1
        },
        "indexName": "name_1",
        "isMultiKey": false,
        "multiKeyPaths": {
          "name": []
        },
        "isUnique": false,
        "isSparse": false,
        "isPartial": false,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": {
          "name": ["[\"Glorious Food\", \"GloriousFood\"]"]
        }
      }
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```

### 2. Drop index from task 4.1

Implementation:

```bash
db.restaurants.dropIndex({ name: 1 })
```

```json
{ "nIndexesWas": 2, "ok": 1 }
```

### 3. Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered:

```bash
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })
```

Implementation:

```bash
db.restaurants.createIndex({ restaurant_id: 1, borough: 1 })
```

```json
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}
```

```bash
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 }).explain()
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "restaurant_id": {
        "$eq": "41098650"
      }
    },
    "queryHash": "11B8AFCC",
    "planCacheKey": "A2837C36",
    "winningPlan": {
      "stage": "PROJECTION_COVERED",
      "transformBy": {
        "_id": 0,
        "borough": 1
      },
      "inputStage": {
        "stage": "IXSCAN",
        "keyPattern": {
          "restaurant_id": 1,
          "borough": 1
        },
        "indexName": "restaurant_id_1_borough_1",
        "isMultiKey": false,
        "multiKeyPaths": {
          "restaurant_id": [],
          "borough": []
        },
        "isUnique": false,
        "isSparse": false,
        "isPartial": false,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": {
          "restaurant_id": ["[\"41098650\", \"41098650\"]"],
          "borough": ["[MinKey, MaxKey]"]
        }
      }
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```

### 4. Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”:

```bash
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index
```

Implementation:

```bash
db.restaurants.createIndex({ cuisine: 1 },{ partialFilterExpression: { borough: "Staten Island" } })
```

```json
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}
```

```bash
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain()
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "borough": {
            "$eq": "Staten Island"
          }
        },
        {
          "cuisine": {
            "$eq": "American"
          }
        }
      ]
    },
    "queryHash": "DBDC0200",
    "planCacheKey": "C53EF8BB",
    "winningPlan": {
      "stage": "FETCH",
      "filter": {
        "borough": {
          "$eq": "Staten Island"
        }
      },
      "inputStage": {
        "stage": "IXSCAN",
        "keyPattern": {
          "cuisine": 1
        },
        "indexName": "cuisine_1",
        "isMultiKey": false,
        "multiKeyPaths": {
          "cuisine": []
        },
        "isUnique": false,
        "isSparse": false,
        "isPartial": true,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": {
          "cuisine": ["[\"American\", \"American\"]"]
        }
      }
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```

```bash
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain()
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "borough": {
            "$eq": "Staten Island"
          }
        },
        {
          "name": {
            "$eq": "Bagel Land"
          }
        }
      ]
    },
    "queryHash": "D9E6DF40",
    "planCacheKey": "7175E33A",
    "winningPlan": {
      "stage": "COLLSCAN",
      "filter": {
        "$and": [
          {
            "borough": {
              "$eq": "Staten Island"
            }
          },
          {
            "name": {
              "$eq": "Bagel Land"
            }
          }
        ]
      },
      "direction": "forward"
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```

```bash
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain()
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "borough": {
            "$eq": "Queens"
          }
        },
        {
          "cuisine": {
            "$eq": "Pizza"
          }
        }
      ]
    },
    "queryHash": "DBDC0200",
    "planCacheKey": "037B0B97",
    "winningPlan": {
      "stage": "COLLSCAN",
      "filter": {
        "$and": [
          {
            "borough": {
              "$eq": "Queens"
            }
          },
          {
            "cuisine": {
              "$eq": "Pizza"
            }
          }
        ]
      },
      "direction": "forward"
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```

### 5. Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered

Implementation:

```bash
db.restaurants.createIndex({ borough: 1, cuisine: 1 }, { partialFilterExpression: { borough: "Staten Island" } })
```

```json
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}
```

```bash
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }, { _id: 0, borough: 1, cuisine: 1 }).explain()
```

```json
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "frontcamp.restaurants",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "borough": {
            "$eq": "Staten Island"
          }
        },
        {
          "cuisine": {
            "$eq": "American"
          }
        }
      ]
    },
    "queryHash": "7D1A0F0A",
    "planCacheKey": "F6601927",
    "winningPlan": {
      "stage": "PROJECTION_COVERED",
      "transformBy": {
        "_id": 0,
        "borough": 1,
        "cuisine": 1
      },
      "inputStage": {
        "stage": "IXSCAN",
        "keyPattern": {
          "borough": 1,
          "cuisine": 1
        },
        "indexName": "borough_1_cuisine_1",
        "isMultiKey": false,
        "multiKeyPaths": {
          "borough": [],
          "cuisine": []
        },
        "isUnique": false,
        "isSparse": false,
        "isPartial": true,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": {
          "borough": ["[\"Staten Island\", \"Staten Island\"]"],
          "cuisine": ["[\"American\", \"American\"]"]
        }
      }
    },
    "rejectedPlans": []
  },
  "serverInfo": {
    "host": "EPBYMINW4799",
    "port": 27017,
    "version": "4.2.1",
    "gitVersion": "edf6d45851c0b9ee15548f0f847df141764a317e"
  },
  "ok": 1
}
```
