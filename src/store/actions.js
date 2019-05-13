const githubApi = `https://api.github.com/users`;

export const setUsername = evt => ({
	type: "SET_USERNAME",
	username: evt.target.value
})

export const login = (username) => dispatch => {
	dispatch(toggleLoader(true));

	Promise.all([
		dispatch(getReposFromApi(username)),
		dispatch(getEventsFromApi(username))
	])
	.then(data => {
		const [getRepos, getEvents] = data;

		dispatch(getRepos);
		dispatch(getEvents);
	})
}

export const logout = () => ({
	type: "LOGOUT"
});

export const loggedIn = value => ({
	type: "LOGGED_IN",
	isLoggedIn: value
})

export const hasLoginError = value => ({
	type: "LOGIN_ERROR",
	loginError: value
})

export const loginAttempt = value => ({
	type: "LOGIN_ATTEMPT",
	submitAttempt: value
})

export const toggleLoader = value =>({
	type: "TOGGLE_LOADING",
	isLoading: value
})

export const loginError = () => dispatch => {
	dispatch(loggedIn(false));
	dispatch(hasLoginError(true));
	dispatch(toggleLoader(false));
	dispatch(loginAttempt(true));
}

export const loggedInSuccessfully = () => dispatch => {
	dispatch(toggleLoader(false));
	dispatch(loggedIn(true));
}


export const getEventsFromApi = username => dispatch => {
	return (dispatch) => {
		return fetch(`${githubApi}/${username}/events`)
		.then(res => res.json())
		.then(data => {
			dispatch(getPullRequestFromEvents(data))
			dispatch(loggedInSuccessfully());
		})
		.catch((error) => {
			dispatch(loginError());
		});
	}
}

export const getPullRequestFromEvents = events => dispatch => {
	const prs = events.filter(event => event.type === "PullRequestEvent" && event.payload.action === "opened");
	prs.forEach(pr => dispatch(getPullRequestData(pr.payload.pull_request.url)));
	dispatch(setPullRequestUrls(prs));
}

export const getPullRequestData = pr => dispatch => {
	fetch(`${pr}`)
	.then(res => res.json())
	.then(data => dispatch(setPullRequestData(data)));
}

export const setPullRequestUrls = prs => ({
	type: "SET_PULL_REQUEST_URLS",
	pullRequestUrls: prs
})

export const setPullRequestData = pr => ({
	type: "SET_PULL_REQUEST_DATA",
	pullRequests: pr
})


export const getReposFromApi = user => dispatch => {
	return dispatch => {
		return fetch(`${githubApi}/${user}/repos`)
		.then(res => res.json())
		.then(data => {
			dispatch(getForkedRepos(data));
			dispatch(loggedInSuccessfully());
		})
		.catch((error) => {
			dispatch(loginError());
		});
	}
}

export const getForkedRepos = repos => dispatch => {
	const forkedRepos = repos.filter(repo => repo.fork);
	dispatch(setRepos(forkedRepos));
}

export const setRepos = forkedRepos => ({
	type: "SET_REPOS",
	repos: forkedRepos
})
