import React, { Component } from 'react';
import Button from './Button';
import RepoList from './RepoList';
import PullRequestList from './PullRequestList';

class Dashboard extends Component {
	render(props) {
		const { username, repos, pullRequests, logout } = this.props;

		return (
			<div>
				<h1 className="text-center">Welcome, {username}</h1>

				<div className="text-center">
					<Button action={logout} text="Log out"/>
				</div>

				<RepoList repos={repos}/>

				<PullRequestList pullRequests={pullRequests}/>
			</div>
		);
	}

}

export default Dashboard;
