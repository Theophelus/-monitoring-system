Vue.component('add-students', {
    data: function () {
        return {
            userData: {
                full_name: '',
                email: '',
                github_username: '',
                codewars_username: '',
                password: ''
            }
        }
    },
    methods: {
        add_Students: function (params) {

        }
    },
    mounted: function () {

    },
    template: `
    <div class="signup-form">	
    <form action="/examples/actions/confirmation.php" method="post">
		<h2>Create Account</h2>
	
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-user"></i>Full Name</span>
				<input type="text" class="form-control" name="username" placeholder="Username" required="required">
			</div>
        </div>
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-paper-plane"></i>Email</span>
				<input type="email" class="form-control" name="email" placeholder="Email Address" required="required">
			</div>
        </div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-lock"></i>Github Username</span>
				<input type="text" class="form-control" name="password" placeholder="Password" required="required">
			</div>
        </div>

        <div class="form-group">
        <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-lock"></i>CodeWars Username</span>
            <input type="text" class="form-control" name="password" placeholder="Password" required="required">
        </div>
    </div>
      
        <div class="form-group">
        <div class="input-group">
            <span class="input-group-addon">
                <i class="fa fa-lock"></i>
                <i class="fa fa-check"></i>Password
            </span>
            <input type="text" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required">
        </div>
    </div>  
		<div class="form-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">Sign Up</button>
        </div>
	
    </form>
	<div class="text-center">Already have an account? <a href="#">Login here</a>.</div>
</div>
    `
})
