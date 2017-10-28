import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Battle.css'
import PlayerPreview from '../Components/PlayerPreview'

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
		this.handleReset = this.handleReset.bind(this)
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

	handleReset(id) {
		this.setState(() => {
			const newState = {}
			newState[id + 'Name'] = ''
			newState[id + 'Image'] = null
			return newState
		})
	}

	render() {
		const {
			playerOneName,
			playerTwoName,
			playerOneImage,
			playerTwoImage,
		} = this.state

		const { match } = this.props // from React Router
		// will be "/battle"

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
					{/* If playerOneImage is truthy, then render <PlayerPreview /> component with Player One params */}
					{playerOneImage !== null && (
						<PlayerPreview avatar={playerOneImage} username={playerOneName}>
							<button
								className="reset"
								onClick={() => this.handleReset('playerOne')}
							>
								Reset
							</button>
						</PlayerPreview>
					)}
					{/* If playerTwoName is falsey, then render <PlayerInput /> component with Player Two params */}
					{!playerTwoName && (
						<PlayerInput
							id="playerTwo"
							label="Player Two"
							onSubmit={this.handleSubmit}
						/>
					)}
					{/* If playerTwoImage is truthy, then render <PlayerPreview /> component with Player Two params */}
					{playerTwoImage !== null && (
						<PlayerPreview
							id="playerTwo"
							avatar={playerTwoImage}
							username={playerTwoName}
						>
							<button
								className="reset"
								onClick={() => this.handleReset('playerTwo')}
							>
								Reset
							</button>
						</PlayerPreview>
					)}
				</div>

				{/* If both players are truthy, we want to show a “Battle” button, which takes us to another view that compares both players. */}
				{playerOneImage &&
					playerTwoImage && (
						<Link
							className="button"
							to={{
								pathname: match.url + '/results',
								// pass along dynamic params
								search: `?playerOne=${playerOneName}&playerTwo=${playerTwoName}`,
							}}
						>
							Battle
						</Link>
					)}
			</div>
		)
	}
}

export default Battle
