This directory contains one express servers:
* AppServer.ts - express web server with parameter support
* App.ts - express server class that is constructed via AppServer.ts

Make sure you install the node.js server software.  Ensure your path variable contains the execution path of the node.js binary.

To execute the server run the following commands:

1. install prerequisites: npm install

2. compile AppServer.ts: tsc AppServer.ts

3. execute AppServer: node AppServer.js

To test static server routes, try the following URL on the browser while the server is running:
* http://localhost:8080/
* http://localhost:8080/index.html
* http://localhost:8080/images/image1.png

To test dynaic server routes, try the following URL on the browser while the server is running:
* http://localhost:8080/one
* http://localhost:8080/add?var1=1&var2=2
* http://localhost:8080/name/israelh
* http://localhost:8080/name/hello



MongooseDB
This directory contains one express servers:
* Server.js + App.js - Encapsulated Node/Express web server w/ Mongo Access

File content:
* Server.ts - based http server
* App.ts - express server
* DbClient.ts - mongo db client
* DB population files are stored on the createDB file

Make sure you install the node.js server and Mongo DB sofware from the side.  Ensure your path variable contains the execution path of the node.js and mongo binary.

To execute the server db and then the node server with the following commands:

//create the db file directory
0. md SkillSphereDb

//Starts the DB server on port 3000
1. .\start.SkillSphereSample.cmd

//populate the DB server with sample data
2. .\startdbClient.SkillSphereSample2.cmd
>load ('createDB/createSkillSphereSampleData.js');
>load ('createDB/createAdminUser.js');
>exit

//install npm packages
3. npm install

//Compile Node/Express Server.  You may need to go to all subdirectories and compile the ts files.
4. tsc AppServer.ts

//Execute Node/Express server on port 8080
5. node AppServer.js 

To test server #3, try the following URL on the browser, while the server is running:
* http://localhost:8080/
* http://localhost:8080/app/list
* http://localhost:8080/app/list/1
