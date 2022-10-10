require('dotenv').config()
const mysql = require('mysql2')

const con = mysql.createConnection(
    `mysql://5d1ucrw69n0vrrncn93p:pscale_pw_siXk05D0rEGMaqxge5MSE8s1edIEqtuGIoUSpA6qlmz@ap-northeast.connect.psdb.cloud/parkdb?ssl={"rejectUnauthorized":true}`
)

con.connect(function (err) {
    if (err) throw err
    console.log('[mysql] : data db connection success')
})

module.exports = con
