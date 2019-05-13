import React, { Component } from 'react';

import RepoList from './RepoList';
import PullRequestList from './PullRequestList';

class Dashboard extends Component {
	render(props) {
		const { username, repos, pullRequests, logout} = this.props;

		return (
			<div>
				<h1 className="text-center">Welcome, {username}</h1>

				<div className="text-center">
					<button onClick={logout} className="button">logout</button>
				</div>

				<RepoList repos={repos}/>

				<PullRequestList pullRequests={pullRequests}/>
			</div>
		);
	}

}

export default Dashboard;
