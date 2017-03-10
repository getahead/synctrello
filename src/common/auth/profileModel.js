import {Record} from '../transit';

const Profile = Record({
  id: '',
  username: '',
  locale: '',
  idBoards: [],
  avatar: '',
  bindingsCreate: '',
  defaultBindings: ''
}, 'user');

export default Profile;
