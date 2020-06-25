const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

// const pass = process.env.DB_PASS ;
// const dbUser = process.env.DB_USER;
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Kamir', 'Sorna', 'Jorna', 'Rian', 'kamir'];
//database new

app.get('/products',(req, res)=>{
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("redOnion").collection("products");
    collection.find().limit(5).toArray((err,documents)=>{
      if(err){
          console.log(err)
          res.status(500).send({message:err});
      }
      else{
        res.send(documents);
      }
    });
    client.close();
  });
}); 

app.get('/users/:id',(req, res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

//post
app.post('/addProduct', (req, res)=>{
  

    const product = req.body;
   
    client = new MongoClient(uri, { useNewUrlParser: true });  
    client.connect(err => {
    const collection = client.db("redOnion").collection("products");
    collection.insertOne(product,(err,result)=>{
      if(err){
          console.log(err)
          res.status(500).send({message:err});
      }
      else{
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});
const port = process.env.PORT || 4200;
app.listen(port,()=> console.log('Listening to port 4200'));