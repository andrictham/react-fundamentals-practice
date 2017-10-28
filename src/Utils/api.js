// This file will contain all the API requests in our app.

import axios from 'axios'

//
// Fetch popular repos, for <Popular />
//

const fetchPopularRepos = language => {
	const encodedURI = window.encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`,
	)
	return axios.get(encodedURI).then(response => {
		return response.data.items
	})
}

//
// Fetch Github user data, for <Battle />
//

const client_id = ''
const secret_id = ''
const params = `?client_id=${client_id}&client_secret=${secret_id}`

const getProfile = username => {
	return axios
		.get(`https://api.github.com/users/${username}${params}`)
		.then(user => {
			return user.data
		})
}

const getRepos = username => {
	return axios.get(
		`https://api.github.com/users/${username}/repos${params}&per_page=100`,
	)
}

const getStarCount = repos => {
	return repos.data.reduce((count, repo) => {
		return count + repo.stargazers_count
	}, 0)
}

const calculateScore = (profile, repos) => {
	const followers = profile.followers
	const totalStars = getStarCount(repos)
	return followers * 3 + totalStars
}

const getUserData = player => {
	// axios.all takes in an array of promises, and once they’re all resolved, it will call a function.
	return axios.all([getProfile(player), getRepos(player)]).then(data => {
		const profile = data[0]
		const repos = data[1]
		return {
			profile,
			score: calculateScore(profile, repos),
		}
	})
}

const sortPlayers = players => {
	// See who wins, the item in the array with the higher score will be first; lower will be second.
	return players.sort((a, b) => {
		return b.score - a.score
	})
}

const handleError = error => {
	console.warn(error)
	return null
}

// Compose all of our small utility functions together into one call.
const battle = players => {
	return axios
		.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError)
}

// Test it out
console.log(battle(['andrictham', 'sprazzeus']))

// Usage:
// api.battle(['Player One', 'Player Two'])
//   .then((players) => {
//    const winner = players[0]
//    const loser = players[1]
//  })

export { fetchPopularRepos, battle }
