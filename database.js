const mongoose = require('mongoose')
const URI = 'mongodb+srv://giantex5_db_user:W2lnZrt5MwvwVAkL@cluster0.xadcg0v.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(URI)
.then(db => console.log("DB conectada"))
.catch(err => console.log(err))

module.exports.mongoose