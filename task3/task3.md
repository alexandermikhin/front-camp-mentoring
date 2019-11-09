# Task 3

## 3. Querying Restaurants Collection

### 1. How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?

Query:
```js
db.restaurants.find({ "borough": "Queens", "cuisine": "Chinese" }).count()
```
Result:
```js
728
```

### 2. What is the _id of the restaurant which has the grade with the highest ever score?

Query:
```js
db.restaurants.find({}, { _id: 1}).sort({ "grades.score": -1 }).limit(1)
```
Result:
```js
{ "_id" : ObjectId("5dc573c40b10acc9bb6aa9ce") }
```

### 3. Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough).

Query:
```js
db.restaurants.updateMany({ borough: "Manhattan" }, { $push: { grades: { grade: "A", score: 7, date: ISODate() } } })
```
Result:
```js
{ "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
```

### 4. What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id.

Query:
```js
db.restaurants.find({ "grades.8.score": { $lt: 7 } },{ _id: 0, "name": 1 })
```
Result:
```js
{ "name" : "Silver Krust West Indian Restaurant" }
{ "name" : "Pure Food" }
```

### 5. What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

Query:
```js
db.restaurants.find({cuisine:"Seafood",grades:{$elemMatch:{$and:[{date:{$gt:ISODate("2014-02-01")}},{date:{$lt:ISODate("2014-03-01")}},{grade:"B"}]}}},{_id:1,borough:1})
```
Result:
```js
{ "_id" : ObjectId("5dc573c50b10acc9bb6addcc"), "borough" : "Bronx" }
{ "_id" : ObjectId("5dc573c50b10acc9bb6ae044"), "borough" : "Manhattan" }
```
