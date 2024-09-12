const express = require("express");
const app = express();
//============================
//1. Be Polite, Greet the User
//============================
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.status(200).send(`Hello there，${username}！`);
});
//================================================

//============================
//2. Rolling the Dice
//============================
app.get("/roll/:number", (req, res) => {
  const number = req.params.number;

  if (isNaN(number)) {
    return res.status(400).send("Sorry you must enter a Number");
  }

  const rolling = Math.floor(Math.random() * (parseInt(number) + 1));
  res.status(200).send(` You rolled a ${rolling}.`);
});

//================================================

//============================
//3. I Want THAT One!
//============================
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index - 1;

  if (index >= collectibles.length) {
    return res.status(400).send("This item is not yet in stock. Check back soon!");
  } else if (index <= 0 || !Number.isInteger(index)) {
    return res.status(400).send("Please enter a valid positive integer number.");
  }

  const items = collectibles[index];
  res.status(200).send( `So, you want the ${items.name}?  For ${items.price}, it can be yours!`);
});

//================================================

//===================================
//4. Filter Shoes by Query Parameters
//===================================
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
    const minPrice = parseFloat(req.query['min-price']); 
    const maxPrice = parseFloat(req.query['max-price']); 
    const type = req.query['type'];

    res.status(200).json(shoes.filter(shoe => isNaN(minPrice) || shoe.price >= minPrice)
    .filter(shoe => isNaN(maxPrice) || shoe.price <= maxPrice)
    .filter(shoe => !type || shoe.type === type)               
    );

});
//================================================
app.listen(3000, () => {
  console.log("port 3000 running");
});
