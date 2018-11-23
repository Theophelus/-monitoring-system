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


const connectionString = process.env.DATABASE_URL || 'postgresql://trinesh:Trinesh1997@@localhost:5432/monitoringdb'

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.post('/api/add/new/students', async function (req, res) {
    try {
        const {
            full_name,
            email,
            github_username,
            codewars_username
        } = req.body;

        let isUserExists = await pool.query('SELECT * FROM students WHERE email=$1', [email]);
        if (isUserExists.rowCount > 0) {
            return res.json({
                success: false,
                msg: 'email already exits'
            })
        }
        await pool.query(`INSERT INTO students 
              (full_name,email,github_username,codewars_username)
               VALUES ($1,$2,$3,$4)`, [full_name, email, github_username, codewars_username]);
        return res.json({
            success: true,
            msg: `${full_name} is sucessfully added`
        })
    } catch (error) {
        console.log(error)
    }

})

app.get('/api/get/repos/latest', async function (req, res) {
    let found = await pool.query('SELECT * FROM students');
    if (found.rowCount === 0) {
        return res.json({
            success: false,
            data: []
        })
    }

    const students = found.rows;

    let studentList = students.map((student) => getLatestRepoForUser(student.github_username));

    let reposForUsers = await Promise.all(studentList);
    
    let repoData = reposForUsers.map((repoRows) => {
        let row = repoRows[0];
        return {
            project_name: row.name,
            full_name : row.full_name,
            created_at : row.created_at
        }
    })

    return res.json({
        success: true,
        data: repoData
    })
})


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

//Define an api to get all projects
app.get('/api/get/projects', async (req, res) => {
    try {
        let results = await pool.query('select * from projects');

        if (results.rowCount === 0) {
            return res.json({
                success: false,
                data: []
            })
        }
        return res.json({
            success: true,
            data: results.rows
        });
    } catch (error) {
        console.log(error);

    }

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


async function getLatestRepoForUser(username) {
    const assess = {
        //e5007befceaf9ffeedb7,
        //e74dda058d0f71ec28c2893504b29742a9a17461,
        clientId: "5d92f07086bef1948fce",
        clientSecret: "1a1ebb12a2eba9ac37dd93a6574bd7f5a93a857a",
        // clientId: "5d92f07086bef1948fce",
        // clientSecret: "1a1ebb12a2eba9ac37dd93a6574bd7f5a93a857a",
        count: 1,
        sort: "created: asc",
        repos: []
    };
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=${assess.count}&sort=${assess.sort}
    &client_id=${assess.clientId}
    &client_secret=${assess.clientSecret}`);
    return response.data;
}

// find all lastest repos for each user
app.get('/api/get/lastest/repos/:username', async function (req, res) {
    const {
        username
    } = req.params;
    try {
        const response = await getLatestRepoForUser(username);
        let lastestRepos = [];
        lastestRepos.push(response.data[0]);
        return res.json({
            lastestRepos
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error.stack
        });
    }

});



app.get('/api/by/project/:name', async function (req, res) {
    const {
        name
    } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/users/${name}/repos`);
        let projects = response.data;
        for (let current of projects) {
            let projectName = current.name;
            // ???
            if (projectName.includes(name)) {
                return res.json({
                    success: true,
                    data: current
                });
            }
        }
        return {
            success: false
        }

    } catch (err) {
        return res.json({
            error: error.stack
        })
    }




})

app.get('/api/coderwars/users/rank/:users', function (req, res) {
    const {
        users
    } = req.params
    axios.get(`https://www.codewars.com/api/v1/users/${users}`)
        .then(function (response) {
            let projects = response.data;
            return res.json({
                success: true,
                data: projects
            })
        })
        .catch(function () {
            return res.json({
                error: error.stack
            })
        })



})



app.listen(PORT, () => console.log('App starting on port', PORT))