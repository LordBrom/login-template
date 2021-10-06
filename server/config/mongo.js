const mongoose = require('mongoose');
const mongoDbUri = process.env.MONGODB_URI || 5000;
//mongoose.promise = global.Promise;

mongoose.connect(mongoDbUri)
	.then(() => { console.log('DB connected'); })
	.catch((err) => { console.log(`DB NOT connected ${err}`); });
mongoose.set('debug', true);
