import React from 'react';
import {connect} from 'react-redux';
import BoardsSwitcher from '../../components/boards-switcher/BoardsSwitcher';

const General = ({boards}) =>
  <div className="general">
    <div className="general__boards">
      <BoardsSwitcher boards={boards} />
    </div>
    {/*
    <div className="general__sync-types">
      <div className="general__text">
        <p>
          Configure syncing type if you do not want to get created bindings while copying your cards.
        </p>
      </div>
    </div>
     */}
  </div>;

General.propTypes = {
  boards: React.PropTypes.object
};

export default connect(state => ({
  boards: state.boards.map
}))(General);
