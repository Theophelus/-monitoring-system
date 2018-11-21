let bcrypt = require('bcrypt-nodejs');


let validateRegistration = require('./validation/registration');
let validateLogin = require('./validation/login');

module.exports = function (pool) {
    async function getUser() {
        let result = await pool.query('select * from users');
        return result.rows;
    }


    async function registration(registration) {
        const {full_name, position, password, email} = registration;

        let hash = bcrypt.hashSync(password);
        if (!hash) {
            return "Something is wrong with password entered";
        }
        await pool.query(`INSERT INTO users (full_name, position, password, email, joined_date) VALUES($1,$2,$3,$4,$5)`,
              [user_name, full_name, position, password, email]);
        
          }
    async function signIn() {


    }

    async function checkUserValidation({full_name, password}){





    }

    return {
        getUser,
        addUser,
        signIn,
        checkUserValidation,
        registration
    }

}