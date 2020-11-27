import React, { Component } from "react";
import PersonService from "../services/person.service";
import TalaltHolttest from "./talalt-person.component";
import EltuntSzemely from "./eltunt-person.component";

export default class Szemely extends Component {
  constructor(props) {
    super(props);

    this.getPerson = this.getPerson.bind(this);

    this.state = {
      szemely: {},
      message: ""
    };
  }

  componentDidMount() {
    if (this.props.id1) {
      this.getPerson(this.props.id1);
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id1 !== prevProps.id1) {
      let id = this.props.id1;
      console.log(`updated person component: ${id}`);
      if (id) {
        this.getPerson(id);
      }
    }
  }

  getPerson(id) {
    PersonService.get(id)
      .then(response => {
        this.setState({
          szemely: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { szemely } = this.state;

    return (
        // talalt holtest = true, eltunt szemely = false
        (szemely.tipus) ? (
            <TalaltHolttest id1={this.props.id1} />
        ) : (
            <EltuntSzemely id1={this.props.id1}  />
        )
    );
  }

}
