import { Record } from '../transit';

export default Record({
  id: '',
  badges: {
    votes: 0,
    viewingMemberVoted: false,
    subscribed: false,
    fogbugz: "",
    checkItems: 0,
    checkItemsChecked: 0,
    comments: 0,
    attachments: 0,
    description: false,
    due: null,
    dueComplete: false
  },
  checkItemStates: [],
  closed: false,
  dateLastActivity: '',
  desc: '',
  descData: null,
  due: null,
  dueComplete: false,
  email: null,
  idBoard: '',
  idChecklists: [],
  idLabels: [],
  idList: '',
  idMembers: [],
  idShort: 0,
  idAttachmentCover: null,
  manualCoverAttachment: false,
  labels: [ ],
  name: '',
  pos: 0,
  shortUrl: '',
  url: ''
}, 'card');
