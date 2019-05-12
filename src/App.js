import React, { Component } from 'react';
import './App.css';

import Loader from './components/Loader';
import RepoList from './components/RepoList';
import PullRequestList from './components/PullRequestList';

const githubApi = `https://api.github.com/users`;


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			user: '',
			repos: [],
			pullRequestUrls: [],
			pullRequests: [],
			isLoading: false,
			loginError: false,
			submitAttempt: false
		}
	}

	setUsername(val) {
		this.setState({
			user: val
		});
	};

	updateStateWithData(data) {
		//updates the state by recieving an object of objects based on key = state name
		const stateName = Object.keys(data);

		stateName.forEach(state => {
			this.setState({
				[state]: data[state]
			});
		});

	}

	filterPullRequests(events) {
		//get pull request events that were opened
		//skips closed or other events as those are not the user's pull requests they opened
		return events.filter(event => event.type === "PullRequestEvent" && event.payload.action === "opened");
	}

	filterForkedRepos(repos) {
		//return all forked repos
		return repos.filter(repo => repo.fork);
	}

	pullRequestsPromise(prs) {
		//fetch the pull request information from the api
		return new Promise((resolve, reject) => {
			fetch(`${prs}`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {
				resolve(data);
			})
			.catch((error) => {

				// this.setState({
				// 	loginError: true
				// });

				console.log('error: ' + error);


				reject(error);
			});
		});
	}

	eventsPromise(user) {
		//fetch the list of user events
		return new Promise((resolve, reject) => {
			fetch(`${githubApi}/${user}/events`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {
				//filter for pull requests
				const filteredRequests = this.filterPullRequests(data);

				const resData = {
					pullRequestUrls: filteredRequests
				}
				resolve(resData);
			})
			.catch((error) => {

				this.setState({
					loginError: true
				});

				reject(error);
			});
		});
	}

	reposPromise(user) {
		//fetch the user's repos from the api
		return new Promise((resolve, reject) => {
			fetch(`${githubApi}/${user}/repos`)
			.then(res => {
				return res.ok ? res.json() : reject(res.status);
			})
			.then(data => {
				//filter for user's forked repos
				const filteredRepos = this.filterForkedRepos(data);
				const resData = {
					repos: filteredRepos
				}
				resolve(resData);
			})
			.catch((error) => {

				this.setState({
					loginError: true
				});

				reject(error);
			});
		});
	}

	login(user) {
		//show loading state while promises are being fufilled / rejected
		this.setState({
			isLoading: true,
			submitAttempt: false
		});

		//call the event and repo promises using the user inputted value and wait for
		//both promises to complete
		Promise.all([this.eventsPromise(this.state.user), this.reposPromise(this.state.user)])
		.then((data) => {
			//update the state with the returned data from the completed promises
			data.forEach(d => this.updateStateWithData(d));
		})
		.then(() => {
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
				isLoggedIn: false,
				isLoading: false,
				submitAttempt: true
			});
		});

	}


	logout() {
		//reset the state
		this.setState({
			isLoggedIn: false,
			user: '',
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
				<div  className="text-center flex-center full-height">
					<div>

						<h1>Log in to GitHub</h1>

						<div>
							<label className="display-block">Enter your GitHub username</label>

							<input className="field-input" type="text" onChange={({ target: { value } }) => this.setUsername(value)} value={this.state.user}/>
						</div>

						{(this.state.submitAttempt === true && this.state.user === '') && <p className="text-red">Please type in a username</p>}

						{(this.state.submitAttempt === true && this.state.user !== '') && <p className="text-red">Could not get the user</p>}

						<div className="text-center">
							<button onClick={() => this.login(this.state.user)} className="button">Login</button>
						</div>
					</div>
				</div>
			)}


			{this.state.isLoading === true && <Loader />}


			{this.state.isLoggedIn === true && this.state.isLoading === false && (
				<div>
					<h1 className="text-center">Welcome, {this.state.user}</h1>

					<div className="text-center">
						<button onClick={() => this.logout()} className="button">logout</button>
					</div>

					<RepoList repos={this.state.repos} />

					<PullRequestList pullRequests={this.state.pullRequests} />
				</div>
			)}

			</div>
		)
	};
}

export default App;
