import React, { Component } from "react";
//Permite la cominicación fácil con redux-store
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field label="Titulo encuesta" type="text" name="title" component={SurveyField} />
        <Field label="Asunto" type="text" name="subject" component={SurveyField} />
        <Field label="Cuerpo mensaje" type="text" name="body" component={SurveyField} />
        <Field label="Para" type="text" name="recipients" component={SurveyField} />
      </div>
    );
  }
  render() {
    return (
      <div>
        SurveyForm
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
