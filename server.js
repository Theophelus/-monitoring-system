const express = require('express');
const bodyParser = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }));

// app.use(flash());

//database connection 
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/monitoring_db'

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

app.get('/api/get/students',async function (req,res) {
   let found = await pool.query('SELECT * FROM students');
   if (found.rowCount===0) {
       return res.json({
           success: false,
           data :[]
       })
   }
    return res.json({success:true,
                   data:found.rows})
})




app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.listen(PORT, () => console.log('App starting on port', PORT))