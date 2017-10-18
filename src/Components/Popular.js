import React from 'react'
import './Popular.css'

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
            onClick={onSelect.bind(null, language)}
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
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

export default Popular
