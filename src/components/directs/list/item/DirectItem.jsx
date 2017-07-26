import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { grey400, grey900 } from 'material-ui/styles/colors';
import tinycolor from 'tinycolor2';
import PropTypes from 'prop-types';

import { SORT_WITHOUT_TEAM_NAME } from '../../../../constants/general';
import DirectItemNewMeetingIcon from './DirectItemNewMeetingIcon';
import ArchivedLinkGenerator from './ArchivedLinkGenerator';


const initials = (name) => {
  return name.split(' ').map(w => w[0]).join('');
};

const propTypes = {
  direct: PropTypes.shape({
    teamName: PropTypes.string,
    category: PropTypes.string,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

const DirectItem = (props) => {
  let teamName = props.direct.teamName;
  if (SORT_WITHOUT_TEAM_NAME === teamName) {
    teamName = '';
  }

  let avatarColor = '#ffffff';
  let avatarBgColor = grey400;

  if (props.direct.category) {
    avatarBgColor = props.direct.category;
    avatarColor = tinycolor.mostReadable(props.direct.category, [grey900, '#ffffff']).toHexString();
  }

  return (
    <ListItem
      style={{ zIndex: 0 }}
      primaryText={props.direct.name}
      secondaryText={<span><p>{props.direct.phone}</p><p>{teamName}</p></span>}
      containerElement={<ArchivedLinkGenerator to={`/directs/${props.id}`} />}
      leftAvatar={
        <div>
          <Avatar
            color={avatarColor}
            backgroundColor={avatarBgColor}
          >
            {initials(props.direct.name)}
          </Avatar>
        </div>
      }
      rightIconButton={<DirectItemNewMeetingIcon id={props.id} />}
    />
  );
};

DirectItem.propTypes = propTypes;

export default DirectItem;
