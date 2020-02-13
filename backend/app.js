const express = require('express')
const cors = require('cors')

const config = require('./config/config')

let app = express()
app.use(cors())

//Routing
let mainRoute = require('./routes/mainRoute')
app.use('/', mainRoute)

 
app.listen(9000, function() {
    console.log('Express app - listening on port 9000!')
})
