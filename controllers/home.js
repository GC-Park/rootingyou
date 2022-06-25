const con = require('../models/mysql');

module.exports = (req, res)=>{
  con.query('SELECT * FROM book', (err, datas, fields)=>{
    let data1 = []
    let data2 = []
    for(i=0; i<16; i++){
      let j=datas.pop();
      if(!j){
        break;
      }
      
      if((i%2)===0){
        data1.unshift(j)
      }else{
        data2.unshift(j)
      }
    }
    res.render('index', {data1, data2});
  })
}