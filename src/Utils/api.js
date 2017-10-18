// This file will contain all the API requests in our app.

import axios from 'axios'

const fetchPopularRepos = (language) => {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  return axios.get(encodedURI).then( (response) => {
    return response.data.items
  })
}

export {
  fetchPopularRepos
}
