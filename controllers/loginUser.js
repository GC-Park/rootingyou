const con = require('../models/mysql');
const bcrypt = require('bcrypt');

module.exports = (req, res)=>{
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
}