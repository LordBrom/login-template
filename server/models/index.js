const mongoose = require('mongoose');
const UsersSchema = require('./Users');

mongoose.model('Users', UsersSchema);
