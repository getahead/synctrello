import './binding-list.styl';

import React from 'react';

import Button from '../button/Button';
import Binding from './Binding';

export default class BindingList extends React.Component {
  static propTypes = {
    bindings: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expandNew: false
    }
  }

  render() {
    const {bindings} = this.props;
    const {expandNew} = this.state;

    return (
      <div className="binding-list">
        <div className="binding-list__button">
          <Button
            label="Create new binding"
            icon="add"
            theme="green"
            size="s"
            onClick={() => this.setState({expandNew: !expandNew})}
          />
        </div>
        {expandNew &&
          <div className="binding-list__button">
            <div className="binding-list__title">Add custom binding</div>
            <Binding create={true} onFinish={() => this.setState({expandNew: false})}/>
          </div>
        }
        <div className="binding-list__item">
          {bindings.valueSeq().map((binding, key) =>
            <div className="binding-list__item" key={key}>
              <Binding binding={binding} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
