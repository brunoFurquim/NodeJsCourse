const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

//process.mainModule.fileName returns the path to the file that is responsible for running the app