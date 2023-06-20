const mongoose = require('mongoose');

mongoose.connect("mongodb://besto:kautsarabid1234@ac-jhmlh9w-shard-00-00.swdo2yu.mongodb.net:27017,ac-jhmlh9w-shard-00-01.swdo2yu.mongodb.net:27017,ac-jhmlh9w-shard-00-02.swdo2yu.mongodb.net:27017/?ssl=true&replicaSet=atlas-woi1b8-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log('Connected!'));