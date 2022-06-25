const con = require('../models/mysql');


module.exports = (req, res)=>{
  con.query('SELECT * FROM book', (err, datas, fields)=>{
    const len = datas.length-1;
    const i = Math.floor(Math.random() * len )+1;
    let data = []
    data.push(datas[i]);
    console.log(data)
    res.render('recommend', {data});
  })
}