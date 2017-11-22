import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InfoPanel.style.scss';

export class InfoPanel extends Component {
	constructor(props) {
		super(props);
	}

	allSelectedBlocks = () => {
		return this.props.blocks.filter(item => item.selected).length;
	};

	allSelectedColorBlocks = (color) => {
		return this.props.blocks.filter(item => (item.color === color && item.selected)).length;
	};

	render() {
		return (
			<div className="panel">
					<p>Общее количество блоков: {this.props.blocks.length}</p>
					<p>Количество выделенных блоков: {this.allSelectedBlocks()}</p>
					<p>Из выделенных количество красных блоков: {this.allSelectedColorBlocks('red')}</p>
					<p>Из выделенных количество зеленых блоков: {this.allSelectedColorBlocks('green')}</p>
			</div>
		);
	}
}

InfoPanel.propTypes = {
	blocks: PropTypes.arrayOf(PropTypes.shape({
		color: PropTypes.oneOf(['red','green']),
		id: PropTypes.string.isRequired,
		selected: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['simple', 'complicated']).isRequired
	})).isRequired
};
