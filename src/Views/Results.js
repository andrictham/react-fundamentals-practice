import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { battle } from '../Utils/api'

class Results extends Component {
	constructor(props) {
		super(props)
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true,
		}
	}
	componentDidMount() {
		const { location } = this.props
		const players = queryString.parse(location.search)
		battle([players.playerOne, players.playerTwo]).then(results => {
			// If there was an error, update our state with an error message.
			if (results === null) {
				return this.setState(() => {
					return {
						error:
							'Looks like there was an error! Check that both users exist on Github?',
						loading: false,
					}
				})
			}

			// If not, update our state with the winner and loser.
			this.setState(() => {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false,
				}
			})
		})
	}
	render() {
		let { error, winner, loser, loading } = this.state
		if (loading) {
			return <p>Loading</p>
		}
		if (error) {
			return (
				<div>
					<p> {error} </p>
					<Link to="/battle">Reset</Link>
				</div>
			)
		}
		if (!loading && !error) {
			return <div>{JSON.stringify(this.state, null, 2)}</div>
		}
	}
}

export default Results
