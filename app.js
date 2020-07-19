const express= require("express")
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const morgan=require('morgan')
const connectDB= require('./config/db')
const exphbs = require('express-handlebars')
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const MongoStore= require('connect-mongo')(session)



dotenv.config({path : './config/config.env' })
connectDB()
require('./config/passport')(passport)
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

if (process.env.NODE_ENV==="development")
{
    app.use(morgan('dev'))
}

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection:mongoose.connection })
    
  }))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname,"public")))

app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/bookmarks',require('./routes/bookmarks'))

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log("running "))



