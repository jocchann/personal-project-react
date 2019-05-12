import React, { Component } from 'react';
import styles from "./loader.module.css";


class Loader extends Component {
	render() {
		return (
			<div className="text-center flex-center full-height">
				<div className={styles.loader}><div></div><div></div><div></div><div></div></div>
				<p>Loading...</p>
			</div>
		);
	}
}

export default Loader;
