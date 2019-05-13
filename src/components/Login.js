import React, { Component } from 'react';
import { connect } from "react-redux";
import { setUsername, login } from "../store/actions";

class Login extends Component {

	render() {
		const { username, setUsername, submitAttempt, login } = this.props;

		return (
			<div className="text-center flex-center full-height">
				<div>
					<h1>Log in to GitHub</h1>

					<div>
						<label className="display-block">Enter your GitHub username</label>

						<input className="field-input" type="text" onChange={(event) => setUsername(event)} value={username}/>

					</div>

					{(submitAttempt === true && username === '') && <p className="text-red">Please type in a username</p>}

					{(submitAttempt === true && username !== '') && <p className="text-red">Could not get the user</p>}

					<div className="text-center">
						<button onClick={() => login(username)} className="button">Login</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	username: state.username,
	submitAttempt: state.submitAttempt
});

const mapDispatchToProps = {
	setUsername: setUsername,
	login: login
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
