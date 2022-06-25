const express = require('express')
const path = require('path')
const ejs = require('ejs')
const con = require('./models/mysql');
const expressSession = require('express-session')
const bcrypt = require('bcrypt')

const homeController = require('./controllers/home')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const newUserController = require('./controllers/register')
const storeUserController = require('./controllers/registerUser')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const recommendController = require('./controllers/recommend')

const userMiddleware = require('./middleware/userMiddleware')
const redirectMiddleware = require('./middleware/redirectMiddleware')

const app = new express()
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  expressSession({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
  })
)

global.loggedIn = null

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})


app.get('/', homeController)
app.get('/login', redirectMiddleware, loginController)
app.post('/login/users', redirectMiddleware, loginUserController)
app.get('/logout', logoutController)
app.get('/register', redirectMiddleware, newUserController)
app.post('/register/users', redirectMiddleware, storeUserController)
app.get('/postNew', userMiddleware, newPostController)
app.post('/postNew/users', userMiddleware, storePostController)
app.get('/recommend', recommendController)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('App listening on port 8000')
})