const { Client } = require('pg')
const express = require("express")

app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'reservationsdemo',
    password: 'xxx',
    port: 5432,
})

client.connect()


app.post("/attendees", (req, resp) => {
    console.log("In /attendeess POST");

    const myQuery = {
        text: "INSERT INTO attendees (fullname, company, experience, email) VALUES ($1, $2, $3, $4)",
        values: [req.body.fullname, req.body.company, req.body.experience, req.body.email]
    }

    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json"
            });
            resp.write(JSON.stringify("ok"));
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
})

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
