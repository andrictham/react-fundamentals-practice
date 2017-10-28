import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import './Results.css'
import { battle } from '../Utils/api'
import PlayerPreview from '../Components/PlayerPreview'

const Profile = ({ profile }) => {
	return (
		<PlayerPreview avatar={profile.avatar_url} username={profile.login}>
			<ul className="text-center space-list-items">
				{/* Some of this info is optional */}
				{profile.name && <li>{profile.name}</li>}
				{profile.location && <li>{profile.location}</li>}
				{profile.company && <li>{profile.company}</li>}
				<li>Followers: {profile.followers}</li>
				<li>Following: {profile.following}</li>
				<li>Public Repos: {profile.public_repos}</li>
				{profile.blog && (
					<li>
						<a href={profile.blog} target="_blank">
							{profile.blog}
						</a>
					</li>
				)}
			</ul>
		</PlayerPreview>
	)
}

const Player = ({ label, score, profile }) => {
	return (
		<div>
			<h1 className="header">{label}</h1>
			<h3 className="text-center">Score: {score}</h3>
			<Profile profile={profile} />
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired,
}

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
			return (
				<div className="row">
					<Player
						label="Winner"
						profile={winner.profile}
						score={winner.score}
					/>
					<Player label="Loser" profile={loser.profile} score={loser.score} />
				</div>
			)
		}
	}
}

export default Results
