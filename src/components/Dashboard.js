import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from "../store/actions";

import RepoList from './RepoList';
import PullRequestList from './PullRequestList';

class Dashboard extends Component {
	render(props) {
		const { username, logout } = this.props;

		return (
			<div>
				<h1 className="text-center">Welcome, {username}</h1>

				<div className="text-center">
					<button onClick={logout} className="button">logout</button>
				</div>

				<RepoList/>

				<PullRequestList/>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	username: state.username,
	repos: state.repos
});

const mapDispatchToProps = {
	logout: logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
