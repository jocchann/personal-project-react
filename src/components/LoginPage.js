import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {

	render() {
		const { username, setUsername, submitAttempt, login } = this.props;

		return (
			<div className="text-center flex-center full-height">
				<div>
					<h1>Log in to GitHub</h1>

					<LoginForm 
						setUsername={setUsername} 
						username={username} 
						submitAttempt={submitAttempt}
						login={login}
						submitButtonText="Login"
					/>
				</div>
			</div>
		);
	}
}

export default Login;
