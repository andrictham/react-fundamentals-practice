import React from 'react'
import './Popular.css'

class Popular extends React.Component {
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
        {languages.map((lang) =>{
          return (
            <li>
              {lang}
            </li>
          )
        })}
      </ul>
    );
  }
}

export default Popular
