import React, { Component } from 'react';
import { connect } from "react-redux";
import { toggleLoader } from "./store/actions";

import './App.css';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Loader from './components/Loader';

class App extends Component {
	render(props) {
		const { isLoggedIn, isLoading } = this.props;

		return (
			<div className="container">
			{(isLoggedIn === false && isLoading === false) &&
				<Login />
			}

			{isLoading === true && <Loader />}


			{(isLoggedIn === true && isLoading === false) &&
				<Dashboard />
			}
			</div>
		)
	};
}

const mapStateToProps = state => ({
	user: state.user,
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = {
	toggleLoader: toggleLoader
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
