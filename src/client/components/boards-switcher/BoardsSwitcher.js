import './boards-switcher.styl';

import React from 'react';
import {connect} from 'react-redux';

import {toggleWebhookBoard} from '../../../common/boards/actions';
import BoardSwitcherItem from './BoardsSwitcherItem';

const BoardsSwitcher = ({boards, toggleWebhookBoard}) => {
  const syncCount = boards.filter(it => it.active).size;

  return (
    <div className="boards-switcher">
      <div className="boards-switcher__title">Manage your boards</div>
      <div className="boards-switcher__text">
        Add your boards to start syncing cards.
        All the cards from selected boards will be available for synchronization.
      </div>
      <div className="boards-switcher__items">
        {boards.valueSeq().map((board, index) =>
          <div className="boards-switcher__item" key={index}>
            <BoardSwitcherItem board={board} onToggle={toggleWebhookBoard}/>
          </div>
        )}
      </div>
      {!syncCount
        ? <div className="boards-switcher__note">
            Select at least one board to start syncing cards
          </div>
        : (syncCount <  boards.size
            ? <div className="boards-switcher__note">
                Add more boards to allow syncing across the chosen.
              </div>
            : <div className="boards-switcher__note">
                You can sync cards across all your boards.
              </div>
          )
      }

    </div>
  )
};


BoardsSwitcher.propTypes = {
  boards: React.PropTypes.object.isRequired,
  toggleWebhookBoard: React.PropTypes.func.isRequired
};

export default connect(state => ({

}), {toggleWebhookBoard})(BoardsSwitcher);
