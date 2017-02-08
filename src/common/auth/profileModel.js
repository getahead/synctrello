import {Record} from '../transit';

const Profile = Record({
  trelloId: '',
  username: '',
  locale: '',
  idBoards: [],
  avatar: ''
}, 'user');

export default Profile;
