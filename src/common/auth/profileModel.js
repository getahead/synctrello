import {Record} from '../transit';

const Profile = Record({
  trelloId: '',
  username: '',
  locale: '',
  idBoards: []
}, 'user');

export default Profile;
