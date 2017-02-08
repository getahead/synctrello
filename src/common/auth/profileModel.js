import {Record} from '../transit';

const Profile = Record({
  id: '',
  username: '',
  locale: '',
  idBoards: [],
  avatar: ''
}, 'user');

export default Profile;
