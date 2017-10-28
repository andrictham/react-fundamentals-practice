import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Battle.css'

class Battle extends Component {
	constructor(props) {
		super(props)

		this.state = {
			playerOneName: '',
			playerOneImage: null,
			playerTwoName: '',
			playerTwoImage: null,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(id, username) {
		this.setState(() => {
			// Return a new state object
			const newState = {}
			// If ID is playerOne, update this.state.playerOneName
			newState[id + 'Name'] = username
			// If ID is playerTwo, update this.state.playerOneImage
			newState[id + 'Image'] = `https://github.com/${username}.png?size=200`
			return newState
		})
	}

	render() {
		const { playerOneName, playerTwoName } = this.state
		return (
			<div>
				<div className="row">
					{/* If playerOneName is falsey, then render <PlayerInput /> component with Player One params */}
					{!playerOneName && (
						<PlayerInput
							id="playerOne"
							label="Player One"
							onSubmit={this.handleSubmit}
						/>
					)}
					{/* If playerTwoName is falsey, then render <PlayerInput /> component with Player Two params */}
					{!playerTwoName && (
						<PlayerInput
							id="playerTwo"
							label="Player One"
							onSubmit={this.handleSubmit}
						/>
					)}
				</div>
			</div>
		)
	}
}

export default Battle
