const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect Database
connectDB()

// Init middleware
app.use(express.json({extended: false}))

app.use('/api/users' , require('./routes/user'))
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/contacts' , require('./routes/contacts'))

const PORT = 5000

app.listen(PORT , ()=> console.log(`Server started on port ${PORT}`))