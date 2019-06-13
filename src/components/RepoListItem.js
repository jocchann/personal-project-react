import React from 'react';

const RepoListItem = props => {
	const { repo } = props;

	return (
		<li key={repo.id}>
			<a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
		</li>
	);
}

export default RepoListItem;
