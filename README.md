# Farms_Sensors_CRUD_App
 
 This is an application that let users track sensors on a Farm's fileds, built with JavaScript, Node.js, Express, MongoDB.
 
 Users are able to create, read, update, delete sensors for a particular field on the farm.
 
 Fields have IDs. Sensor has ID and information including name, longtitude, latitude.
 
 There are four types of authenticated users: Owner, Manager, Officer, and Worker. The first three users have full CRUD access. Worker may only read sensors on the farm.
 
## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`http://localhost:8080/`
