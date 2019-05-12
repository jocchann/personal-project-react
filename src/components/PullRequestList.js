import React, { Component } from 'react';
import style from './pullrequest.module.css'

class PullRequestList extends Component {
	render(props) {
		return (
			<div>
				<h2>Your recent pull requests</h2>

				<ul>
				{this.props.pullRequests.map(request => (
					<li key={request.id}>
						<div>
							<a href={request.html_url} target="_blank" rel="noopener noreferrer">{request.title}</a>

							{request.state === 'opened' && <span className={style.open}>{request.state}</span>}

							{(request.state === 'closed' && request.merged === false) && <span className={style.closed}>{request.state} - not merged</span>}

							{(request.state === 'closed' && request.merged === true) && <span className={style.merged}>{request.state} - merged</span>}
						</div>
					</li>
				))}
				</ul>

				{this.props.pullRequests.length === 0 && <p>No pull requests</p>}
			</div>
		);
	}
}

export default PullRequestList;
