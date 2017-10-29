import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
	loadingText: {
		textAlign: 'center',
		fontSize: '35px',
	},
}

class Loading extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: props.text,
		}
	}

	componentDidMount() {
		let endState = this.props.text + '...'
		this.interval = window.setInterval(() => {
			// If end state has been reached (an elipsis), reset text
			if (this.state.text === endState) {
				this.setState(() => {
					return {
						text: this.props.text,
					}
				})
				// else, keep appending periods to it
			} else {
				// Take our previous state and add to it
				this.setState(prevState => {
					return {
						text: prevState.text + '.',
					}
				})
			}
		}, this.props.interval)
		// Run every 300ms, or whatever timing is specified
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
		console.log('Loaded!')
	}

	render() {
		const { loadingText } = styles
		let { text } = this.state
		return <p style={loadingText}>{text}</p>
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	interval: PropTypes.number.isRequired,
}

Loading.defaultProps = {
	text: 'Loading',
	interval: 300,
}

export default Loading
