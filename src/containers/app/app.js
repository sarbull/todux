import React, {Component} from 'react'

import {actionCreators} from './todoListRedux'
import List from '../../components/list'
import Input from '../../components/input'
import Title from '../../components/title'

export default class App extends Component {

  state = {};

  componentWillMount() {
    const {store} = this.props;

    const {todos} = store.getState();
    this.setState({todos});

    this.unsubscribe = store.subscribe(() => {
      const {todos} = store.getState();
      this.setState({todos})
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onAddTodo = (text) => {
    const {store} = this.props;

    store.dispatch(actionCreators.add(text))
  };

  onRemoveTodo = (index) => {
    const {store} = this.props;

    store.dispatch(actionCreators.remove(index))
  };

  render() {
    const {todos} = this.state;

    return (
      <div style={styles.container}>
        <Title>Todux</Title>
        <Input placeholder={'Type a todux, then hit enter!'} onSubmitEditing={this.onAddTodo}/>
        <List list={todos} onClickItem={this.onRemoveTodo}/>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
};