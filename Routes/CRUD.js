
// Read all sensors for a fild: "/field/:fieldId"
const read_field = (req, res, table ) =>{

    const { fieldId  } = req.params
    const queryObj = { "Field_Id": parseInt(fieldId) } 
    
    table.find( queryObj ).toArray()
    .then( result =>{
        if (result.length === 0){
                res.status(404).json( " User Not found" )   
        } 
        else {
                res.status(200).json( result ) 
        }
    })       
}


// Read a sensor: "/field/:fieldId/sensor/:sensorId"
const read_field_sensor = (req, res, table ) =>{

  const { fieldId, sensorId  } = req.params

   console.log( "req.params:", req.params )            
// example  http://localhost:8080/field/1/sensor/5    
// req.params: { userId: 'Adam', fieldId: '1', sensorId: '5' }

        
// let fieldId  =  parseInt( req.params.fieldId  )
// let sensorId =  parseInt( req.params.sensorId )

// passed parameters string type => fieldId, sensorId convered to Integer  
    let queryObj = { 
        $and: [ {"Field_Id": parseInt(fieldId) }, {"Sensor_Id": parseInt(sensorId) } ] 
    } 

    table.find( queryObj ).toArray()
    .then( result =>{
        // console.log('result', result)
        if (result.length === 0){
            res.status(404).json( "User Not found" ) 
            // 404 Not found
        } 
        else {
            res.status(200).json( result )      // 200 OK
            // res.send( ' Result:' + JSON.stringify(result) )  
        }        
    })       
    
}

// Create: "/user/:userId/field/:fieldId/sensor/:sensorId"  
const create_field_sensor = (req, res, table, db ) =>{

    const user_table = db.collection('users')
    const { userId } = req.params
    
    user_table.find ( { User_Id : userId }).toArray()
    .then( record => {
        
        if (record.length <= 0){  
            res.status(403).json("Not authorized to create a sensor!") 
            console.log( "Not authorized to add!"  )
            return false
        }   // return error 
        

        let Role_Code = record[0].Role_Code
                        
        // 1 Owner 2 Manager  3 Extension Officer  4 Worker
        if ( Role_Code <= 3){  

            const { fieldId, sensorId, sensorName,  lon, lat  } = req.body    
// e.g { fieldId: '4', sensorId: '2', sensorName:'4-2 Sensor', lon: '2', lat: '2' }
            
            let docObj = {
                "Field_Id": parseInt(fieldId),    // convert string to integer 
                "Sensor_Id": parseInt(sensorId),  // convert string to integer 
                "Sensor_Name": sensorName,
                "Sensor_location": { "lon": lon, "lat": lat }
            }

            let queryObj = { 
                $and: [ {"Field_Id": parseInt(fieldId) }, 
                {"Sensor_Id": parseInt(sensorId) } ] 
            } 

            console.log( 'queryObj', queryObj )
            
            table.find ( queryObj ).toArray()
            .then( record => {
                console.log('record length', record.length )
                if (record.length >= 1 ){
                    res.status(304).json("Record exists already!") // Not modified
                    console.log( "Record exists already!"  )
                } else {
                    // always insert a new one, even the key Ids are the same !! 
                    table.insertOne( docObj )                  
                    res.status(201).json(req.body);  // 201 Created
                    console.log( "Added !"  )
                }

            })

        } else {
                res.status(403).json("Not authorized to create a sensor!") 
                console.log( "Not authorized to add!"  )
        }

    })

            
}


    
// Update: "/user/:userId/field/:fieldId/sensor/:sensorId" 
const update_field_sensor = (req, res, table, db ) =>{

    const user_table = db.collection('users')
    const { userId } = req.params

    user_table.find ( { User_Id : userId }).toArray()
    .then( record => {

        if (record.length <= 0){  
            console.log( "User not found !"  )
            res.status(403).json("Not authorized to update a sensor!") 
            return false 
        }   // return error 
                
        console.log(record[0] )
        let Role_Code = record[0].Role_Code
        console.log( Role_Code )

        
        if ( Role_Code <= 3){  
            // 1 Owner  2 Farm Manager  3 Extension Officer  4 Worker

            const { fieldId, sensorId, sensorName,  lon, lat  } = req.body
                
            let docObj = {
                            "Sensor_Name": sensorName,
                            "Sensor_location": { "lon": lon, "lat": lat }
            }

            let queryObj = { 
                $and: [ {"Field_Id": parseInt(fieldId) }, 
                        {"Sensor_Id": parseInt(sensorId) } ] 
            } 
                    
            let updateObj = { $set: docObj }
            let options = { upsert: true };
            // update an existing one or insert a new one     
            table.updateOne( queryObj, updateObj , options)    

            res.status(200).json(req.body);
            console.log( "Updated !"  )

        } else {
            res.status(403).json("Not authorized to update a sensor!") 
            console.log( "Not authorized to update !"  )
        } 

    })                                
}


// Delete: "/user/:userId/field/:fieldId/sensor/:sensorId" 
const delete_field_sensor = (req, res, table, db ) =>{

    const user_table = db.collection('users')
    const { userId } = req.params

    user_table.find ( { User_Id : userId }).toArray()
    .then( record => {

        if (record.length <= 0){  
            res.status(304).json("Not authorized to update a sensor!") 
            console.log( "User not found !"  )
        }   // return error 
                
        console.log(record[0] )
        let Role_Code = record[0].Role_Code
        console.log( Role_Code )

        
        // 1 Owner  2 Farm Manager  3 Extension Officer  4 Worker
        if ( Role_Code <= 3){  

            const { fieldId, sensorId  } = req.params
        
            let queryObj = { 
                $and: [ {"Field_Id": parseInt(fieldId) }, 
                        {"Sensor_Id": parseInt(sensorId) } ] 
            } 
              

            table.deleteOne( queryObj )     // delete an existing one     

            res.status(200).json({ deleted: [fieldId, sensorId] })
            console.log( "Updated !"  )

        } else {
                res.status(304).json("Not authorized to delete a sensor!") 
                console.log( "Not authorized to delete!"  )
        } 

    })           
}





// export 
module.exports = { read_field, read_field_sensor, 
                   create_field_sensor , 
                   update_field_sensor, delete_field_sensor }