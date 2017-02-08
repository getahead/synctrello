import { Record } from '../transit';

export default Record({
  id: '',
  name: '',
  desc: "",
  descData: '',
  closed: false,
  idOrganization: '',
  url: '',
  shortUrl: '',

  active: false,
  idWebhook: '',
}, 'board');
