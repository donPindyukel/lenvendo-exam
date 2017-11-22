import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './DeleteModalWindow.styles.scss';

export class DeleteModalWindow extends Component {
	componentWillMount() {
		this.root = document.createElement('div');
		document.body.appendChild(this.root);
		window.scrollTo(0,0);
		this.body = document.querySelector('body');
		this.body.style.overflow = 'hidden';
	}

	acceptDelete = () => {
		this.props.modalToggle();
	  this.props.deleteBlock();
	};

	close = () => {
		this.props.modalToggle();
	};

	componentWillUnmount() {
		document.body.removeChild(this.root);
		this.body.style.overflow = 'auto';
	}

	render() {
		return ReactDOM.createPortal(
			<div className="modal">
				<div className="modal__content content">
					<p className="content__text">Вы действительно хотите удалить элемент?</p>
					<div className="content__control">
						<button onClick={this.acceptDelete}>ДА</button>
						<button onClick={this.close}>НЕТ</button>
					</div>
					<div className="content__close" onClick={this.close}>X</div>
				</div>
			</div>,
			this.root
		);
	}
}

DeleteModalWindow.propTypes = {
	modalToggle: PropTypes.func.isRequired,
	deleteBlock: PropTypes.func.isRequired
};

