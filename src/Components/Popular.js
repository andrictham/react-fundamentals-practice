import React from 'react'
import './Popular.css'

class Popular extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(language){
    this.setState({
      selectedLanguage: language
    })
  }

  render() {
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
              onClick={this.updateLanguage.bind(null, language)}
              // Our function is already bound in constructor, so `null` tells it to respect that earlier binding, but go ahead and create a new function with `language` passed in as an argument. https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
              className={
                this.state.selectedLanguage === language ? "active" : ""
              }>
              {language}
            </li>
          )
        })}
      </ul>
    );
  }
}

export default Popular
