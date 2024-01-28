
// Question1 - You have to create a function called createMenu that will take name as first argument of the
//  function and from second parameter onwards objects of menu items. Each menu object can have name, price 
// or category. This function should return an array by grouping the Category of the menu items.;

// CreateMenu(
//   "Fresh Slice",
//   { name: "Chicken Pesto pizza", category: "Pizza", price: "$2" },
//   { name: "Fried Chicken Wings", category: "Wings", price: "$10" },
//   { name: "Diet Coke", category: "Beverage", price: "$2.5" },
//   { name: "Garden Fresh pizza", category: "Pizza", price: "$2.5" },
//   { name: "Baked Chicken Wngs", category: "Wings", price: "$12" }

// )

// // OUTPUT: 
// [
//   {
//     Category: "Pizza",
//     items: [
//       { name: "Chicken Pesto pizza", category: "Pizza", price: "$2" },
//       { name: "Garden Fresh pizza", category: "Pizza", price: "$2.5" },
//     ],
//   },
//   {
//     Category: "Wings",
//     items: [
//         { name: "Fried Chicken Wings", category: "Wings", price: "$10" },
//         { name: "Baked Chicken Wings", category: "Wings", price: "$12" },
//         ]
//   },
//   {
//     Category: "Beverage",
//     items: [
//         { name: "Diet Coke", category: "Beverage", price: "$2.5" },
//         ]
//   }
// ]

////////////////////////////////////////////////////////// Q1
function CreateMenu(name, ...Foods)
{
  arrFoodCategoriedList = Foods.reduce((accumulator, objFood)=>{

                            const szCAT = objFood.category;

                            objCAT = accumulator.find(objFoodCAT=>objFoodCAT.Category === szCAT);
                            if (!objCAT)
                            {
                              objNewCAT = {};
                              objNewCAT["Category"] = szCAT;
                              objNewCAT["items"] = [objFood];
                              accumulator.push(objNewCAT);
                            }
                            else
                            {
                              // the objCAT was an reference from the accumulator of that Category
                              objCAT["items"].push(objFood);
                            }
                            return accumulator;
                        }, []);

  return arrFoodCategoriedList;
}

console.log(JSON.stringify(CreateMenu(
            "Fresh Slice",
            { name: "Chicken Pesto pizza", category: "Pizza", price: "$2" },
            { name: "Fried Chicken Wings", category: "Wings", price: "$10" },
            { name: "Diet Coke", category: "Beverage", price: "$2.5" },
            { name: "Garden Fresh pizza", category: "Pizza", price: "$2.5" },
            { name: "Baked Chicken Wngs", category: "Wings", price: "$12" }), null, 3)
);



// Question2 You have to solve the same problem above but it should sorted by name of the item (ADVANCE)
// You might need to learn how Sort functon in Higher order functions works.

////////////////////////////////////////////////////////// Q2
function CreateMenuSorted(name, ...Foods)
{
  arrFoodCategoriedList = Foods.reduce((accumulator, objFood)=>{

                            const szCAT = objFood.category;

                            objCAT = accumulator.find(objFoodCAT=>objFoodCAT.Category === szCAT);
                            if (!objCAT)
                            {
                              objNewCAT = {};
                              objNewCAT["Category"] = szCAT;
                              objNewCAT["items"] = [objFood];
                              accumulator.push(objNewCAT);
                            }
                            else
                            {
                              objItemlist = objCAT["items"];

                              // find the list index that the current objFood name is former than the existed item obj name under ASCII
                              indexToInsert = objItemlist.findIndex(objItem=>objFood.name.localeCompare(objItem.name) < 0);
                              
                              // If find a place is former than the origin item
                              if (indexToInsert >= 0)
                              {
                                // Insert the objFood
                                objItemlist.splice(indexToInsert, 0, objFood);
                              }
                              else
                              {
                                objItemlist.push(objFood);
                              }
                            }
                            return accumulator;
                        }, []);

  return arrFoodCategoriedList;
}

console.log(JSON.stringify(CreateMenuSorted(
  "Fresh Slice",
  { name: "ZZZZZZZaked Chicken Wngs", category: "Wings", price: "$12" },
  { name: "EEEEEhicken Pesto pizza", category: "Pizza", price: "$20" },
  { name: "Chicken Pesto pizza", category: "Pizza", price: "$2" },
  { name: "Fried Chicken Wings", category: "Wings", price: "$10" },
  { name: "Diet Coke", category: "Beverage", price: "$2.5" },
  { name: "Garden Fresh pizza", category: "Pizza", price: "$2.5" },
  { name: "Baked Chicken Wngs", category: "Wings", price: "$12" },
  { name: "KKKKKKKiet Coke", category: "Beverage", price: "$5" }), null, 3)
);