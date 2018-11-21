module.exports = function (loginPart) {
    async function user_login (req, res, next) {

        let user_reg = req.body;
        console.log(user_reg);
        
        try {
            let getUser = await loginPart.getUser();
            console.log(getUser)

            res.json ( {
                status: 'success',
                data: getUser
            });
        }        
        catch (err) {
            next (err)
        }
    }
    return {
        user_login
    }
}