const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// const flash = require('express-flash');
// const session = require('express-session');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// app.use(express.static(__dirname+'/public/'));
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


const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/monitoringdb'

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.get('/api/get/students', async function (req, res) {
    let found = await pool.query('SELECT * FROM students');
    if (found.rowCount === 0) {
        return res.json({
            success: false,
            data: []
        })
    }
    return res.json({
        success: true,
        data: found.rows
    })
})


app.get('/api/get/github/:username', async function (req, res) {
    const {
        username
    } = req.params;
    let found = await pool.query('SELECT id FROM students WHERE github_username=$1', [username]);
    if (found.rowCount == 0) {
        return res.json({
            success: false,
            msg: 'user is not found'
        })
    }

    return res.json({
        success: true,
        data: found.rows[0].id
    })

})

// find all lastest repos for each user
app.get('/api/get/lastest/repos/:username', function (req, res) {
    const {
        username
    } = req.params;
    const assess = {
        // clientId: "e5007befceaf9ffeedb7",
        // clientSecret: "e74dda058d0f71ec28c2893504b29742a9a17461",
        clientId: "5d92f07086bef1948fce",
        clientSecret: "1a1ebb12a2eba9ac37dd93a6574bd7f5a93a857a",
        count: 1,
        sort: "created: asc",
        repos: []
    };
    axios.get(`https://api.github.com/users/${username}/repos?per_page=${assess.count}&sort=${assess.sort}
    &client_id=${assess.clientId}
    &client_secret=${assess.clientSecret}`)
        .then(function (response) {
            let lastestRepos = [];
            lastestRepos.push(response.data[0]);
            return res.json({
                lastestRepos
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.json({
                error: error.stack
            })
        });
});







app.listen(PORT, () => console.log('App starting on port', PORT))