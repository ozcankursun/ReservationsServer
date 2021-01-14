const { Client } = require('pg')
const express = require("express")

app = express();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'reservationsdemo',
    password: 'xxx',
    port: 5432,
})

client.connect()

app.get("/attendees", (req, resp) => {
    let filterName = req.query.filterName;

    const myQuery = {
        text: "SELECT * FROM attendees WHERE fullname LIKE $1",
        values: ["%"+filterName+"%"]
    }


    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json"
            });
            resp.write(JSON.stringify(resuits.rows));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json"
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
});

app.get("/", (req, resp) => {
    resp.write("In GET /");
    resp.end();
})

const port = 3000;
app.listen(port, () => { console.log("Server started and listening to port " + port) });
