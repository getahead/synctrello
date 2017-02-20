import React from 'react';
import {Link} from 'react-router';

const Support = () =>
  <div className="support-page">
    <div className="support-page__container">
      <p>
        Please view our <Link className="link" to="/faq">FAQ</Link> to find answers to your questions
        or send us an <a className="link" href="mailto:support@synctrello.com">email</a> for general questions!
      </p>
      <p>
        Found a mistake? Something is not working?
        Or maybe the syncing is going on not exactly what you expected?
      </p>
      <p>
        Contact us by email <a className="link" href="mailto:support@synctrello.com">support@synctrello.com</a>.
      </p>
    </div>
  </div>;

export default Support;
