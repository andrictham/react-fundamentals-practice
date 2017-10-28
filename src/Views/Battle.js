import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Battle.css'

class PlayerInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event) {
		const { value } = event.target
		this.setState(() => {
			return {
				username: value, // store form value
			}
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		this.props.onSubmit(this.props.id, this.state.username)
	}
	render() {
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label htmlFor="username" className="header">
					{this.props.label}
				</label>
				<input
					type="text"
					id="username"
					placeholder="github username"
					autoComplete="off"
					value={this.state.username} // get form value
					onChange={this.handleChange} // set form value
				/>
				<button
					className="button"
					type="submit"
					disabled={!this.state.username} // disable if form value if empty
				>
					Submit
				</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
}

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
