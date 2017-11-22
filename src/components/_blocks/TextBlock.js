import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TextBlock.style.scss';

export class TextBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.block.id,
			text: props.block.text,
		};
	}

	onClickClose = (e) => {
		e.stopPropagation();
		this.props.deleteBlock();
	};

	selectBlock = () => {
		this.props.selectBlock();
	};

	doubleClickHandler = (e) => {
		if (this.props.backgroundOnChange) {
			this.props.backgroundOnChange();
		}
	};

	render() {
		let { text } = this.state;
		return (
			<div className="text-block" onClick={this.selectBlock}
			     onDoubleClick={this.doubleClickHandler}
			     style={{
				     border: `2px solid ${this.props.block.selected ? '#5d616f' : 'white'}`,
				     backgroundColor: this.props.block.color
			     }}
			>
				<p>{text}</p>
				<div className="text-block__close" onClick={this.onClickClose}>X</div>
			</div>
		);
	}
}

TextBlock.propTypes = {
	block: PropTypes.shape({
		id: PropTypes.string,
		selected: PropTypes.bool,
		text: PropTypes.string,
		type: PropTypes.oneOf(['simple', 'complicated'])
	}).isRequired,
	deleteBlock: PropTypes.func.isRequired,
	selectBlock: PropTypes.func.isRequired
};