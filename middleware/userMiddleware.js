const con = require('../models/mysql');

module.exports = (req, res, next) => {
  con.query('SELECT * FROM usersdb where id=?', [req.session.userId], (err, data, fields) =>{
    if(data){
      next()
    } else{
      return res.redirect('/')
    }
  }
)}