import React, { Component } from "react";
import PersonService from "../services/person.service";

export default class TalaltHolttest extends Component {
  constructor(props) {
    super(props);

    this.getPerson = this.getPerson.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.onChangeNem = this.onChangeNem.bind(this);
    this.onChangeUgyszam = this.onChangeUgyszam.bind(this);
    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeY = this.onChangeY.bind(this);
    this.onChangeMegtalalasIdeje = this.onChangeMegtalalasIdeje.bind(this);
    this.onChangeBecsultEletkor = this.onChangeBecsultEletkor.bind(this);
    this.onChangeHalalBecsultIdeje = this.onChangeHalalBecsultIdeje.bind(this);

    this.state = {
      szemely: {
        id: null,
        coordinate: this.props.coor
      },
      message: ""
    };
  }

  componentDidMount() {
    let id = this.props.id1;
    console.log(`mounted 'Talalt' component: ${id}`);
    if (id) {
      this.getPerson(id);
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id1 !== prevProps.id1) {
      let id = this.props.id1;
      console.log(`updated 'Talalt' component: ${id}`);
      if (id) {
        this.getPerson(id);
      }
    }
  }

  onChangeNem(e) {
    const nem = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          nem: nem
        }
      };
    });
  }
  onChangeUgyszam(e) {
    const ugyszam = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          ugyszam: ugyszam
        }
      };
    });
  }
  onChangeX(e) {
    var szemely = this.state.szemely;
    szemely.x = e.target.value;
    this.setState({
      szemely: szemely
    });
  }
  onChangeY(e) {
    var szemely = this.state.szemely;
    szemely.y = e.target.value;
    this.setState({
      szemely: szemely
    });
  }
  onChangeMegtalalasIdeje(e) {
    const megtalalasIdeje = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          megtalalasIdeje: megtalalasIdeje
        }
      };
    });
  }
  onChangeBecsultEletkor(e) {
    const becsultEletkor = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          becsultEletkor: becsultEletkor
        }
      };
    });
  }
  onChangeHalalBecsultIdeje(e) {
    const halalBecsultIdeje = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          halalBecsultIdeje: halalBecsultIdeje
        }
      };
    });
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

  updatePublished(status) {
    var data = {
      id: this.state.szemely.id,
      title: this.state.szemely.title,
      description: this.state.szemely.description,
      published: status
    };

    PersonService.update(this.state.szemely.id, data)
      .then(response => {
        this.setState(prevState => ({
          szemely: {
            ...prevState.szemely,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePerson() {
    PersonService.update(
      this.state.szemely.id,
      this.state.szemely
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Sikeres mentés!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    PersonService.delete(this.state.szemely.id)
      .then(response => {
        console.log(response.data);
        // TODO refresh List callback
        //this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { szemely } = this.state;

    return (
      <div>
          <div className="edit-form">
          { this.props.id1 ? ( <h4>Szerkesztés</h4> ) : ( <h4>Hozzáadás</h4> ) }
            <form>
              <div className="form-group row">
                <label htmlFor="nem" class="col-sm-4 col-form-label">Nem</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="nem"
                  value={szemely.nem}
                  onChange={this.onChangeNem}  />
              </div>
              <div className="form-group row">
                <label htmlFor="ugyszam" class="col-sm-4 col-form-label">Ügyszám</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="ugyszam"
                  value={szemely.ugyszam  }
                  onChange={this.onChangeUgyszam} />
              </div>
              <div className="form-group row">
                <label htmlFor="megtalalasIdeje" class="col-sm-4 col-form-label">Megtalálás ideje</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="megtalalasIdeje"
                  value={szemely.megtalalasIdeje}
                  onChange={this.onChangeMegtalalasIdeje}  />
              </div>
              <div className="form-group row">
                <label htmlFor="becsultEletkor" class="col-sm-4 col-form-label">Becsült életkor</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="becsultEletkor"
                  value={szemely.becsultEletkor}
                  onChange={this.onChangeBecsultEletkor}  />
              </div>
              <div className="form-group row">
                <label htmlFor="halalBecsultIdeje" class="col-sm-4 col-form-label">Halál becsült ideje</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="halalBecsultIdeje"
                  value={szemely.halalBecsultIdeje}
                  onChange={this.onChangeHalalBecsultIdeje}  />
              </div>
            </form>

        {this.props.id1 ? (
            <div>
              <button
                className="badge badge-danger mr-2"
                onClick={this.deleteTutorial}>Töröl</button>
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updatePerson}>Módosít</button>
            </div>
        ) : (
          <div>
            <button
              className="badge badge-primary mr-2"
              onClick={() => this.updatePublished(true)}>Ment</button>
          </div>
        )}
        <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}
