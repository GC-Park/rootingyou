require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createConnection(`mysql://mzdtqvpnp9ru:pscale_pw_BvZ-lLti7gUZjfFjnMdW4cD3rW7rvXYut9pBGeuGCC0@mdo5v6rbycsb.ap-northeast-2.psdb.cloud/parkdb?ssl={"rejectUnauthorized":true}`);

con.connect(function(err) {
  if(err) throw err;
  console.log("[mysql] : data db connection success")
})

module.exports = con;