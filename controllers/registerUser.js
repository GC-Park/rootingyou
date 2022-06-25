const con = require('../models/mysql');

module.exports = (req, res)=>{
  const { username, password, passwordCheck } = req.body;
  if(password==passwordCheck){
    con.query(`INSERT INTO usersdb (id, password) VALUES (?, ?)`, [username, password])
    res.redirect('/')
  } else {
    console.log("error")
    return res.redirect('/auth/register')
  }
  
}