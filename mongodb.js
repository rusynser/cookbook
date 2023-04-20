const express = require("express");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const fs = require('fs');
const { url } = require("inspector");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
// Defining User schema
const userSchema = new Schema(
  { name: String, age: Number, email: String }
)

// Defining User model
const User = mongoose.model('User111', userSchema);

// Create collection of Model
User.createCollection().then(function (collection) {
  console.log('Collection is created!');
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