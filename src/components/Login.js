import React, { Component } from 'react';

class Login extends Component {

	render() {
		const { username, setUsername, submitAttempt, login } = this.props;

		return (
			<div className="text-center flex-center full-height">
				<div>
					<h1>Log in to GitHub</h1>

					<div>
						<label className="display-block">Enter your GitHub username</label>

						<input className="field-input" type="text" onChange={setUsername} value={username}/>

					</div>

					{(submitAttempt === true && username === '') && <p className="text-red">Please type in a username</p>}

					{(submitAttempt === true && username !== '') && <p className="text-red">Could not get the user</p>}

					<div className="text-center">
						<button onClick={login} className="button">Login</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
