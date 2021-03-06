import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { getTeamsArray } from './teams';
import { SORT_WITHOUT_TEAM_NAME } from '../constants/general';

/**
 * @description Return directs from state
 * @param {Object} state app state
 */
const getArchivedDirects = (state) => {
  if (!(state.archivedDirects.list instanceof Map)) {
    return [];
  }
  return state.archivedDirects.list;
};

const getTeams = state => getTeamsArray(state);

/**
 * @description selector for directs array
 * @return {Array} array of direct objects
 */
export const getArchivedArray = createSelector(getArchivedDirects, (directs) => {
  const arr = [];
  directs.forEach((direct, key) => {
    arr.push({ ...direct, ...{ id: key } });
  });

  return arr;
});

/**
 * @description selector for archived array count
 * @return {Number} number of array items
 */
export const getArchivedArrayCount = createSelector(
  getArchivedArray,
  arr => arr.length,
  );

/**
 * @description return array of archived directs with teamName
 * @return {Array}
 */
export const getArchivedDirectsArrayWithTeam = createSelector(
  [getArchivedArray, getTeams],
  (directs, teams) => {
    return directs.map((direct) => {
      let teamName = SORT_WITHOUT_TEAM_NAME;
      if (direct.team) {
        const teamDirect = teams.find(team => team.id === direct.team);
        if (typeof teamDirect !== 'undefined') {
          teamName = teamDirect.name;
        }
      }
      return { ...direct, ...{ teamName } };
    });
  });

export const getArchivedDirect = createCachedSelector(
  [getArchivedArray, getTeams, (state, id) => id],
  (directs, teams, id) => {
    const direct = directs.find(directSingle => directSingle.id === id);
    let teamName = '';
    if (direct.team) {
      const teamDirect = teams.find(team => team.id === direct.team);
      if (typeof teamDirect !== 'undefined') {
        teamName = teamDirect.name;
      }
    }
    return { ...direct, ...{ teamName } };
  },
)((state, id) => id);
