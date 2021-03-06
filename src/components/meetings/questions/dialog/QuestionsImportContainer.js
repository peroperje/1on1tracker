import { connect } from 'react-redux';

import questionAction from '../../../../actions/questions';
import categoriesQuestionsAction from '../../../../actions/categoriesQuestions';
import QuestionsImportBtn from './QuestionsImportBtn';

const mapStateToProps = state => ({
  loading: state.questions.loading,
});

const mapDispachToProps = dispatch => ({
  importQuestion: () => {
    dispatch(questionAction.importQuestionsTo(categoriesQuestionsAction));
  },
});

export default connect(mapStateToProps, mapDispachToProps)(QuestionsImportBtn);
