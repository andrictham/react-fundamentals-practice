import React from 'react'
import PropTypes from 'prop-types'
import './Popular.css'
import { fetchPopularRepos } from '../Utils/api'

const SelectLanguage = ({ selectedLanguage, onSelect }) => {
  const languages = [
    'All',
    'Javascript',
    'Ruby',
    'Java',
    'CSS',
    'Python',
  ]
  return (
    <ul className='languages'>
      {languages.map((language) =>{
        return (
          <li
            key={language}
            onClick={ () => onSelect(language) }
            // Our function is already bound in constructor, so `null` tells it to respect that earlier binding, but go ahead and create a new function with `language` passed in as an argument. https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
            className={
              selectedLanguage === language ? "active" : ""
            }>
            {language}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const RepoGrid = ( { repos } ) => {
  return (
    <ul className='popular-list'>
      {repos.map( (repo, index) => {
        return (
          <li key={repo.id} className='popular-item'>
            {repo.name}
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
      selectedLanguage: 'All',
      repos: []
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount() {
    // Fire off initial request to Github with defauly state
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(language){
    this.setState({
      selectedLanguage: language,
      repos: [], // Temporarily set it to null; we’ll set it with our API response in a callback later
    })
    // Then we fire off a request to Github to ask for new repos that match the language we want
    fetchPopularRepos(language).then(
      (response) => {
        this.setState({
          repos: response // Finally, update our state
        })
      }
    )
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        <RepoGrid repos={this.state.repos} />
      </div>
    );
  }
}

export default Popular
