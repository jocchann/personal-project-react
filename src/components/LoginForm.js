import React, { Component } from 'react';
import Button from './Button';

class LoginForm extends Component {

	render() {
		const { username, setUsername, submitAttempt, login, submitButtonText } = this.props;

		return (
            <form>
                <div>
                    <label className="display-block">Enter your GitHub username</label>
                    <input className="field-input" type="text" onChange={setUsername} value={username}/>
                </div>

                {(submitAttempt === true && username === '') && <p className="text-red">Please type in a username</p>}

                {(submitAttempt === true && username !== '') && <p className="text-red">Could not get the user</p>}

                <div className="text-center">
                    <Button action={login} text={submitButtonText} />
                </div>
            </form>
		);
	}
}

export default LoginForm;
