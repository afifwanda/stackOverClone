const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./router/router.js')
const errorHandler = require('./middleware/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',router)
app.use(errorHandler)


app.listen(port,function(){
    console.log("youre listening to port " + port)
})

module.exports = app