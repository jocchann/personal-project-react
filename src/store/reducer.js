const initialState = {
	isLoggedIn: false,
	username: '',
	repos: [],
	pullRequestUrls: [],
	pullRequests: [],
	isLoading: false,
	loginError: false,
	submitAttempt: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				username: action.username
			};
		case "LOGIN_ERROR":
			return {
				...state,
				loginError: action.loginError
			};
		case "LOGIN_ATTEMPT":
			return {
				...state,
				submitAttempt: action.submitAttempt
			};
		case "LOGGED_IN":
			return {
				...state,
				isLoggedIn: action.isLoggedIn
			};
		case "LOGOUT":
			return {
				isLoggedIn: false,
				username: '',
				repos: [],
				pullRequestUrls: [],
				pullRequests: [],
				isLoading: false,
				loginError: false,
				submitAttempt: false
			};
		case "SET_USERNAME":
			return {
				...state,
				username: action.username
			};
		case "SET_PULL_REQUEST_URLS":
			return {
				...state,
				pullRequestUrls: action.pullRequestUrls
			};
		case "SET_PULL_REQUEST_DATA":
			return {
				...state,
				pullRequests: [...state.pullRequests, action.pullRequests]
			};
		case "SET_REPOS":
			return {
				...state,
				repos: action.repos
			};
		case "TOGGLE_LOADING":
			return {
				...state,
				isLoading: action.isLoading
			};
		default:
			return state;
	}
};

export default reducer;
