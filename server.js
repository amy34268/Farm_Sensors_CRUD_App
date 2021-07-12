// Express setup 
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')

const CRUD = require('./routes/CRUD.js')

// MongoDB setup 
const {MongoClient, ObjectId} = require('mongodb')  
let DB_HOST=
"mongodb+srv://amy34268:20212021@cluster0.kduzk.mongodb.net/test"


// Connection to MongoDB & Initialize Express server:
MongoClient.connect( DB_HOST, { useUnifiedTopology: true,  useNewUrlParser: true } )
.then( dbClient =>{
    
   const db = dbClient.db('litefarm')
   const table = db.collection('fields')

   // Cross Original Resource Sharing (CORS) 
      app.use(cors( { origin: "http://localhost:8081"   } ));
   // to support JSON-encoded bodies
      app.use( bodyParser.json() );  
   // to support URL-encoded bodies
      app.use(bodyParser.urlencoded({ extended: true   })); 



     // root route
        app.get("/", (req, res) => {
            // res.json({ message: "Welcome to the LiteFarm application by Amy Lee" });
               res.sendFile(__dirname + '/index.html')
        });

     // Read a field [user/field]
        app.get("/field/:fieldId", (req, res) => {
                   CRUD.read_field(req, res, table )
        });

     // Read a field [user/field/sensor]
        app.get("/field/:fieldId/sensor/:sensorId", (req, res) => {
                 CRUD.read_field_sensor(req, res, table)
        });


     // Add a new field  [only authorized user]
        app.post('/user/:userId/field/:fieldId/sensor/:sensorId', (req, res) => {   
            CRUD.create_field_sensor(req, res, table, db)
        });

     // Update a field   [only authorized user]
        app.patch('/user/:userId/field/:fieldId/sensor/:sensorId', (req, res) => {                 
            CRUD.update_field_sensor(req, res, table, db)
           
        });

     // Delete a sensor  [only authorized user]
        app.delete('/user/:userId/field/:fieldId/sensor/:sensorId', (req, res) => {           
            CRUD.delete_field_sensor(req, res, table, db)

        });


   // set port, listen to requests
      const PORT = 8080;
      app.listen(PORT, ()=>{
               console.log(`Server is running on port ${PORT}.`);
      });

})  
