import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth } from './actions/auth';

import App from './components/App';
import MeetingShow from './components/meetings/MeetingShow';
import MeetingList from './components/meetings/MeetingList';
import MeetingNew from './components/meetings/MeetingNew';
import MeetingEdit from './components/meetings/MeetingEdit';
import DirectShow from './components/directs/DirectShow';
import DirectList from './components/directs/DirectList';
import DirectNew from './components/directs/DirectNew';
import DirectEdit from './components/directs/DirectEdit';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/404';

export default function Routes(store) {
  const checkAuth = (nextState, replace) => {
    store.dispatch(requireAuth(nextState, replace));
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="/directs" onEnter={checkAuth}>
        <IndexRoute component={DirectList} />
        <Route path="new" component={DirectNew} />
        <Route path=":id/edit" component={DirectEdit} />
        <Route path=":id/meetings/new" component={MeetingNew} />
        <Route path=":id" component={DirectShow} />
      </Route>
      <Route path="/meetings" onEnter={checkAuth}>
        <IndexRoute component={MeetingList} />
        <Route path="new" component={MeetingNew} />
        <Route path=":id/edit" component={MeetingEdit} />
        <Route path=":id" component={MeetingShow} />
      </Route>
      <Route path='*' component={NotFound} />
    </Route>
  );
}
