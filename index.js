const express = require('express')
const path = require('path')
const ejs = require('ejs')
const con = require('./models/mysql');
const expressSession = require('express-session')
const bcrypt = require('bcrypt')

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


app.get('/', (req, res)=>{
  con.query('SELECT * FROM users', (err, data, fields)=>{
    console.log(data)
  })
  res.render('index');
})

app.get('/login', (req, res)=>{
  res.render('login');
})

app.post('/login/users', (req, res)=>{
  const { username, password } = req.body;

  con.query('SELECT password FROM usersdb WHERE id=?', [username], (err, data, fields)=>{
    bcrypt.compare(password, data[0].password, (error, same)=>{
      console.log(typeof password, typeof data[0].password)
      sam = (password==data[0].password)
      if(sam){
        req.session.userId = username
        console.log(req.session.userId)
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    })
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy(()=>{
      res.redirect('/')
  })
})

app.get('/register', (req, res)=>{
  res.render('register');
})

app.post('/register/users', (req, res)=>{
  const { username, password, passwordCheck } = req.body;
  if(password==passwordCheck){
    con.query(`INSERT INTO usersdb (id, password) VALUES (?, ?)`, [username, password])
    res.redirect('/')
  } else {
    console.log("error")
    return res.redirect('/auth/register')
  }
  
})

app.get('/post', (req, res)=>{
  res.render('post');
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('App listening on port 8000')
})