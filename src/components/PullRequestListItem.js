import React, { Component } from 'react';
import style from './pullrequest.module.css'

class PullRequestListItem extends Component {

	render(props) {
		const { request } = this.props;

		return (
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
		);
	}
}

export default PullRequestListItem;
