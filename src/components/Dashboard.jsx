import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import {
  List,
  ListItem,
} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MeetingIcon from 'material-ui/svg-icons/action/speaker-notes';
import FollowUpIcon from 'material-ui/svg-icons/action/assignment';
import DirectIcon from 'material-ui/svg-icons/social/person-add';

import MeetingItem from './meetings/MeetingItem';
import FollowUpItem from './followUps/FollowUpItem';

import * as headerActions from '../actions/header';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.setText('1on1 Tracker');
  }

  renderMeetings() {
    const rows = [];
    if (this.props.meetings && this.props.meetings.size > 0) {
      this.props.meetings.forEach((meeting, key) => {
        rows.push(
          <MeetingItem
            key={key}
            meeting={meeting}
            id={key}
          />,
        );
      });
    } else {
      rows.push(
        <ListItem
          primaryText="No meetings"
        />
      );
    }
    return rows.slice(0,5);
  }

    renderFollowUps() {
      const rows = [];
      if (this.props.followUps && this.props.followUps.size > 0) {
        this.props.followUps.forEach((followUp, key) => {
          if (followUp.completed) {
            return;
          }
          rows.push(
            <FollowUpItem
              key={key}
              followUp={followUp}
              id={key}
            />,
          );
        });
      } else {
        rows.push(
          <ListItem
            primaryText="No items"
          />
        );
      }
      return rows.slice(0,5);
    }

  render() {
    const meetingButtonStyle = {
      margin: 0,
      top: 76,
      right: 20,
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    };
    const followupButtonStyle = {
      margin: 0,
      top: 150,
      right: 20,
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    };
    const directButtonStyle = {
      margin: 0,
      top: 225,
      right: 20,
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    };

    return (
      <div className="container dashboard">
        <List>
          <Subheader>Recent Meetings</Subheader>
          {this.renderMeetings()}
        </List>
        <List>
          <Subheader>Pending Follow Ups</Subheader>
          {this.renderFollowUps()}
        </List>
        <FloatingActionButton
          style={meetingButtonStyle}
          containerElement={<Link to="/meetings/new" />}
        >
          <MeetingIcon />
        </FloatingActionButton>
        <FloatingActionButton
          style={followupButtonStyle}
          containerElement={<Link to="/followUps/new" />}
        >
          <FollowUpIcon />
        </FloatingActionButton>
        <FloatingActionButton
          style={directButtonStyle}
          containerElement={<Link to="/directs/new" />}
        >
          <DirectIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

Dashboard.propTypes = {
  setText: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    followUps: state.followUps.list,
    meetings: state.meetings.list,
  };
};

const mapDispatchToProps = {
  setText: headerActions.setText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);