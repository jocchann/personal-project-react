import React, { Component } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Loader from './components/Loader';

const githubApi = `https://api.github.com/users`;


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			username: '',
			repos: [],
			pullRequestUrls: [],
			pullRequests: [],
			isLoading: false,
			loginError: false,
			submitAttempt: false
		}

		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
		this.setUsername = this.setUsername.bind(this);
	}

	setUsername(val) {
		this.setState({
			username: val.target.value
		});
	};


	//get pull request events that were opened
	//skips closed or other events as those are not the user's pull requests they opened
	filterPullRequests(events) {
		return events.filter(event => event.type === "PullRequestEvent" && event.payload.action === "opened");
	}

	//return all forked repos
	filterForkedRepos(repos) {
		return repos.filter(repo => repo.fork);
	}

	//fetch the pull request information from the api
	pullRequestsPromise(prs) {
		return new Promise((resolve, reject) => {
			fetch(`${prs}`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	//fetch the list of user events
	eventsPromise(user) {
		return new Promise((resolve, reject) => {
			fetch(`${githubApi}/${user}/events`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {

				//filter for pull requests
				const filteredRequests = this.filterPullRequests(data);

				resolve(filteredRequests);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	//fetch the user's repos from the api
	reposPromise(user) {
		return new Promise((resolve, reject) => {
			fetch(`${githubApi}/${user}/repos`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {
				//filter for user's forked repos
				const filteredRepos = this.filterForkedRepos(data);

				resolve(filteredRepos);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	login(user) {
		//show loading state while promises are being fufilled / rejected
		this.setState({
			isLoading: true,
			submitAttempt: false,
			loginError: false
		});

		//call the event and repo promises using the user inputted value and wait for
		//both promises to complete
		Promise.all([
			this.eventsPromise(this.state.username),
			this.reposPromise(this.state.username)
		])
		.then((data) => {

			//update the state with the returned data from the completed promises
			const [pullRequestEvents, forkedRepos] = data;

			this.setState({
				pullRequestUrls: pullRequestEvents,
				repos: forkedRepos,
			})
		})
		.then(() => {

			//get each pull request event's pr data so the status can be determined
			//create an array of pull request events that will call promises so .all can be called on them
			//and complete together instead of asynchronously
			let prPromises = (this.state.pullRequestUrls).reduce((acc, prLink) => {
				acc.push(this.pullRequestsPromise(prLink.payload.pull_request.url));
				return acc;
			}, []);

			return Promise.all(prPromises);
		})
		.then(res => {

			//update state with the pull request info
			//completed api fetches successfully, hide loader and show the "logged in" page
			this.setState({
				pullRequests: res,
				isLoggedIn: true,
				isLoading: false
			});
		})
		.catch((error) => {

			//catch any issues from the api - if events and repos return an error,
			//don't let the user log in and show an error message
			this.setState({
				loginError: true,
				isLoggedIn: false,
				isLoading: false,
				submitAttempt: true
			});
		});

	}


	logout() {
		//reset the state and clear the data
		this.setState({
			isLoggedIn: false,
			username: '',
			repos: [],
			pullRequestUrls: [],
			pullRequests: [],
			isLoading: false,
			loginError: false,
			submitAttempt: false
		});
	}


	render() {
		return (
			<div className="container">
			{this.state.isLoggedIn === false && this.state.isLoading === false && (
				<Login
					username={this.state.username}
					setUsername={this.setUsername}
					submitAttempt={this.state.submitAttempt}
					login={this.login}
				/>
			)}


			{this.state.isLoading === true && <Loader />}


			{(this.state.isLoggedIn === true && this.state.isLoading === false) &&
				<Dashboard
					username={this.state.username}
					repos={this.state.repos}
					pullRequests={this.state.pullRequests}
					logout={this.logout}

				/>
			}

			</div>
		)
	};
}

export default App;
