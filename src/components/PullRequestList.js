import React, { Component } from 'react';
import style from './pullrequest.module.css'
import PullRequestItem from './PullRequestListItem';

class PullRequestList extends Component {

	render(props) {
		const { pullRequests } = this.props;

		return (
			<div>
				<h2>Your recent pull requests</h2>

				<ul>
				{pullRequests.map(request => <PullRequestItem request={request} key={request.id}/>)}
				</ul>

				{pullRequests.length === 0 && <p>No pull requests</p>}
			</div>
		);
	}
}

export default PullRequestList;
