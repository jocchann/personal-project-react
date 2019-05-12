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
							<a href={request.html_url} target="_blank" rel="noopener noreferrer" className="margin-right-sm">{request.title}</a>

							{request.state === 'open' &&
								<span className={request.merged === true ? style.merged : style.open}>
									{request.state}
								</span>
							}

							{(request.state === 'closed') &&
								<span className={request.merged === true ? style.merged : style.closed}>
									{request.state} ({request.merged === true ? 'merged' : 'not merged'})
								</span>
							}

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
