/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/


function calculateTotalSpentByCategory(transactions) {
  let output = []

  for(let i = 0; i<transactions.length; i++){
    let a = transactions[i]["category"]
    let b = transactions[i]["price"]
    
    let found = false;
    for(let j =0; j<output.length; j++){
      if(a == output[j]["category"]){
        output[j]["totalSpent"] += b
        found = true
        break
      }
    }

    if (!found) {
      let entry = {};
      entry["category"] = a;
      entry["totalSpent"] = b;
      output.push(entry);
    }
  }
  return output;
}

module.exports = calculateTotalSpentByCategory;
