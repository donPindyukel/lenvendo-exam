import React, { Component } from 'react';
import { connect } from 'react-redux';

import { blocksActions } from './store/actions';
import { SimpleText, ComplicatedText, DeleteModalWindow, InfoPanel } from './components';
import { generateRandomText, generateRandomId } from './helpers';

import './assets/styles/styles.scss';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false
		};
	}

	addSimpleBlock = () => {
		this.props.dispatch(blocksActions.addBlock(this.createBlock('simple')));
	};

	addComplicatedBlock = () => {
		this.props.dispatch(blocksActions.addBlock(this.createBlock('complicated')));
	};
	
	onDeleteSimpleBlock = (key) => () => {
		this.props.dispatch(blocksActions.deleteBlock(key));
	};

	onDeleteComplicatedBlock = (key) => () => {
		this.setState({isShowModal: !this.state.isShowModal});
		this.currentBlockForDelete = key;
	};

	onChangeBackground = (key) => (color) => {
		this.props.dispatch(blocksActions.changeBackground(key, color));
	};

	onSelectedBlock = (key) => () => {
		this.props.dispatch(blocksActions.selectBlock(key));
	};

	createBlock = (type) => {
		const block ={
			id: generateRandomId(),
			text: generateRandomText(),
			selected: false
		};
		if (type === 'simple') {
			block.type = 'simple';
		} else {
			block.type = 'complicated';
			block.color = 'red';
		}
		return block;
	};

	toggleModal = () => {
		this.setState({isShowModal: !this.state.isShowModal});
	};

	render() {
		return (
			<div>
				<InfoPanel blocks={this.props.blocks.array}/>
				<div className="add-buttons">
					<button onClick={this.addSimpleBlock}>Добавить простой блок</button>
					<button onClick={this.addComplicatedBlock}>Добавить сложный блок</button>
				</div>
				<div className='blocks'>
					{this.props.blocks.array.map((item) => {
						if (item.type === 'simple') return <SimpleText key={item.id}
						                                               block={item}
						                                               deleteBlock={this.onDeleteSimpleBlock(item.id)}
						                                               selectBlock={this.onSelectedBlock(item.id)}
																							/>;
						if (item.type === 'complicated') return <ComplicatedText key={item.id}
						                                                         block={item}
						                                                         deleteBlock={this.onDeleteComplicatedBlock(item.id)}
						                                                         changeBackground={this.onChangeBackground(item.id)}
						                                                         selectBlock={this.onSelectedBlock(item.id)}
																										/>;
					})}
				</div>
				{this.state.isShowModal && <DeleteModalWindow modalToggle={this.toggleModal}
				                                              deleteBlock={() => this.props.dispatch(blocksActions.deleteBlock(this.currentBlockForDelete))}
																	/>}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { blocks } = state;
	return {
		blocks
	};
}

export default connect(mapStateToProps)(App);