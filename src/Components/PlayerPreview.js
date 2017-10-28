import React from 'react'
import PropTypes from 'prop-types'

const PlayerPreview = ({ avatar, username, id, onReset }) => {
	return (
		<div>
			<div className="column">
				<img src={avatar} alt={`Avatar for ${username}`} className="avatar" />
				<h2 className="username">@{username}</h2>
			</div>
			<button className="reset" onClick={() => onReset(id)}>
				Reset
			</button>
		</div>
	)
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
}

export default PlayerPreview
