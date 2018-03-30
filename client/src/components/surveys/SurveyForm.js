import React, { Component } from "react";
import { Link } from "react-router-dom";
//Permite la cominicación fácil con redux-store
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";

const FIELDS = [
  { id: "surveyNewTitle", title: "Título encuesta", name: "title" },
  { id: "surveyNewSubject", title: "Asunto", name: "subject" },
  { id: "surveyNewBody", title: "Cuerpo mensaje", name: "body" },
  { id: "surveyNewRecipients", title: "Para", name: "recipients" }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => (
      <Field
        key={field.name}
        id={field.id}
        component={SurveyField}
        type="text"
        label={field.title}
        name={field.name}
      />
    ));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link className="red btn-flat white-text" to="/surveys">
            Cancelar
          </Link>
          <button className="teal btn-flat right white-text red" type="submit">
            Submit <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
