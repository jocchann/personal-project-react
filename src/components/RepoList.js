import React from 'react';
import RepoListItem from './RepoListItem';

const RepoList = props => {
	const { repos } = props;

	return (
		<div>
			<h2>Your forked repos</h2>

			<ul>
				{repos.map(repo => <RepoListItem repo={repo} />)}
			</ul>

			{repos.length === 0 && <p>No forked repos</p>}
		</div>
	);
}

export default RepoList;
