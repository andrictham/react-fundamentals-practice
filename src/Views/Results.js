import React, { Component } from 'react'
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
			console.log('Results: ', results)
		})
	}
	render() {
		const { error, winner, loser, loading } = this.state
		if (loading) {
			return <p>Loading</p>
		}
	}
}

export default Results
