import React, { Component } from 'react';

class RepoList extends Component {
	render(props) {
		const { repos } = this.props;

		return (
			<div>
				<h2>Your forked repos</h2>

				<ul>
				{repos.map(repo => (
					<li key={repo.id}>
					<a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
					</li>
				))}
				</ul>

				{repos.length === 0 && <p>No forked repos</p>}
			</div>
		);
	}
}

export default RepoList;
