import {Record} from '../transit';

const User = Record({
  isLoggedIn: false,
  id: -1,
  login: '',
  name: '',
  avatar_url: '',
  gravatar_id: '',
  url: '',
  type: '',
  site_admin: false,
  company: '',
  blog: '',
  email: '',
  hireable: null,
  bio: '',
  public_repos: 4,
  public_gists: 0,
  followers: 2,
  following: 3,
  private_gists: 0,
  total_private_repos: 0,
  owned_private_repos: 0,
  collaborators: 0,
  plan: {}
}, 'user');

export default User;
