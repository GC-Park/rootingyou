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
  con.query('SELECT * FROM book', (err, datas, fields)=>{
    let data1 = []
    let data2 = []
    for(i=0; i<16; i++){
      let j=datas.pop();
      if(!j){
        break;
      }
      
      if((i%2)===0){
        data1.push(j)
      }else{
        data2.push(j)
      }
    }
    
    res.render('index', {data1, data2});
  })
  
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

app.get('/postNew', (req, res)=>{
  res.render('post');
})

app.post('/postNew/users', (req, res)=>{
  const { tag, author, quote } = req.body;
  if(!tag || !author || !quote){
    return res.redirect('/postNew')
  }
  con.query(`INSERT INTO book (tag, author, quote) VALUES (?, ?, ?)`, [tag, author, quote])
  res.redirect('/')
})

app.get('/recommend', (req, res)=>{
  con.query('SELECT * FROM book', (err, datas, fields)=>{
    const len = datas.length-1;
    const i = Math.floor(Math.random() * len )+1;
    let data = []
    data.push(datas[i]);
    console.log(data)
    res.render('recommend', {data});
  })
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('App listening on port 8000')
})