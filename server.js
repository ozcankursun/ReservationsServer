const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'reservationsdemo',
    password: 'xxx',
    port: 5432,
})

client.connect()
client
    .query('SELECT * FROM attendees')
    .then(function (resuits) {
        console.log("Success!");
        console.log(resuits.rowCount);
        client.end();
    })
    .catch(function (error) {
        console.log("Ooops!");
        console.log(err);
        client.end();
    });

console.log("Server is finishing");