//načtení modulu express
const express = require("express");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const fs = require('fs');
const { url } = require("inspector");
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

const uri = 'mongodb://localhost:27017/mydatabase';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.Promise = global.Promise;
mongoose.connect(uri, options)
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => console.log(err));


 app.post('/recipes', (req, res) => {
          const newRecipe = req.body;
    
      // Insert the new recipe into the MongoDB database
      db.collection('recipes').insertOne(newRecipe, (err, result) => {
        if (err) {
          res.status(500).send({ error: 'Error creating new recipe' });
        } else {
          res.send(result.ops[0]);
        }
      });
    });


 app.listen(port, () => {
    console.log(`Your server available at http://localhost:${port}`);
})
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const recipeSchema = {
  name: String,
  description: String,
  ingredients: [String],
  instructions: String,
  image: String,
}
// MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
//   if (err) throw err;

//   const db = client.db('mydatabase');

//   const newRecipe = {
//     title: 'Spaghetti Carbonara',
//     description: 'Classic Italian pasta dish with bacon, eggs, and cheese',
//     ingredients: ['spaghetti', 'bacon', 'eggs', 'parmesan cheese', 'black pepper'],
//     steps: ['Cook spaghetti according to package instructions', 'Fry bacon until crispy', 'Beat eggs and cheese in a bowl', 'Add cooked spaghetti to the bacon and stir', 'Remove from heat and add the egg mixture', 'Stir until the eggs are cooked', 'Serve with black pepper on top'],
//     servings: 4
//   };

//   app.get('/recipes', (req, res) => {
//     client.connect(err => {
//       const collection = client.db("mydatabase").collection("recipes");
//       collection.find({}).toArray((err, recipes) => {
//         res.send(recipes);
//         client.close();
//       });
//     });
//   });

//   app.post('/recipes', (req, res) => {
//         const newRecipe = req.body;
  
//     // Insert the new recipe into the MongoDB database
//     db.collection('recipes').insertOne(newRecipe, (err, result) => {
//       if (err) {
//         res.status(500).send({ error: 'Error creating new recipe' });
//       } else {
//         res.send(result.ops[0]);
//       }
//     });
//   });
  
//   app.put("/recipes/:id", (req, res) => {
//     const id = req.params.id;
//     const updatedRecipe = req.body;
  
//     db.collection("recipes").updateOne({ _id: mongodb.ObjectID(id) }, { $set: updatedRecipe }, (err, result) => {
//       if (err) throw err;
  
//       res.json(result);
//     });
//   });
  
//   app.delete("/recipes/:id", (req, res) => {
//     const id = req.params.id;
  
//     db.collection("recipes").deleteOne({ _id: mongodb.ObjectID(id) }, (err, result) => {
//       if (err) throw err;
  
//       res.json(result);
//     });
//   });

//   db.collection('recipes').insertOne(newRecipe, (err, result) => {
//     if (err) throw err;

//     console.log(`Inserted new recipe with ID ${result.insertedId}`);
//     client.close();
//   });

//   client.close();
// });

app.get("/*", (req, res) => {
  res.send("Unknown path!");
});

//nastavení portu, na kterém má běžet HTTP server
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
//41111111?param1=1234&param2=42