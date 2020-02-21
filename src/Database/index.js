const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jayme',
    password: '0206006102Hd!',
    database: 'mei'
});


connection.connect(err => {
    if (err) {
        console.log('Error on connecting: ' + err.stack);
        return;
    }
    console.log('Connection success with id: ' + connection.threadId);
})

module.exports = connection;