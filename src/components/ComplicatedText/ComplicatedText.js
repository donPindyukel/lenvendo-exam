import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextBlock } from '../_blocks/';

export class ComplicatedText extends Component {
	constructor(props) {
		super(props);
	}

	onChangeBackgroundHandler = () => () => {
		return (this.props.block.color === 'red') ? this.props.changeBackground('green') : this.props.changeBackground('red')
	};

	render() {
		return (
				<TextBlock backgroundOnChange={this.onChangeBackgroundHandler()} {...this.props}/>
		);
	}
}

ComplicatedText.propTypes = {
	block: PropTypes.shape({
		color: PropTypes.oneOf(['red','green']),
		id: PropTypes.string,
		selected: PropTypes.bool,
		text: PropTypes.string,
		type: PropTypes.oneOf(['complicated'])
	}).isRequired,
	changeBackground: PropTypes.func.isRequired,
	deleteBlock: PropTypes.func.isRequired,
	selectBlock: PropTypes.func.isRequired
};

