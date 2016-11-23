import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import {
  DatePicker,
  TextField,
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default class DirectForm extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.refs.name            // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus();                // on TextField
  }

  onSubmit(direct) {
    this.props.onSubmit(direct);
  }

  onDelete(direct) {
    this.props.onDelete(direct);
  }

  onCancel() {
    this.context.router.goBack();
  }

  formatDate(date) {
    return date.toLocaleDateString();
  }

  render() {
    const { formType, handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            component={TextField}
            hintText="Name"
            floatingLabelText="Name"
            ref="name" withRef
            style={{ width: '100%' }}
          />
          <Field
            name="startDate"
            component={DatePicker}
            formatDate={this.formatDate}
            autoOk={true}
            hintText="Start Date"
          />
          <Field
            name="notes"
            component={TextField}
            hintText="Notes"
            floatingLabelText="Notes"
            multiLine={true}
            rows={4}
            style={{ width: '100%' }}
          />
          <div>
            {formType === 'edit' ? (
              <RaisedButton
                type="submit"
                label="Update"
                primary={true}
                disabled={pristine || submitting}
              />
            ) : (
              <RaisedButton
                type="submit"
                label="Create"
                primary={true}
                disabled={pristine || submitting}
              />
            )}
          </div>
        </form>
        {formType === 'edit' &&
          <RaisedButton label="Delete"
            secondary={true}
            style={{ marginTop: 20 }}
            onTouchTap={this.onDelete}
          />
        }
      </div>
    );
  }
}

DirectForm.contextTypes = {
  router: React.PropTypes.object,
};

DirectForm.propTypes = {
  formType: PropTypes.oneOf(['create', 'edit']),
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};
