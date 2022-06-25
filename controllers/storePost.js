const con = require('../models/mysql');

module.exports = (req, res)=>{
  const { tag, author, quote } = req.body;
  if(!tag || !author || !quote){
    return res.redirect('/postNew')
  }
  con.query(`INSERT INTO book (tag, author, quote) VALUES (?, ?, ?)`, [tag, author, quote])
  res.redirect('/')
}