# LiteFarm_Sensors
 To run the application: 
 <br>
 npm install
 <br>
 npm start
 <br>
 
Side Note: 
1. The ConnectionString(DB_HOST) in server.js would need to be replaced with your connectionString in MongoDB, with database name "litefarm", collections as "fields" and "users". The sample documents(JSON) of fields and users that I've created are included in the folder "mongodb_json_files". 

2. For Users. I assumed they were recongnized alreadly. I represented Owners, Managers, Officers and Workers with Role_Code: 1,2,3, 4 to indentify if they have access to operate sensors.

Sorry in advance for any incompletion or mistakes. Thank you for reviewing my submission! 
