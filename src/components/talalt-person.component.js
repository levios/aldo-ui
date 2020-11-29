import React, { Component } from "react";
import PersonService from "../services/person.service";

export default class TalaltHolttest extends Component {
  constructor(props) {
    super(props);

    this.getPerson = this.getPerson.bind(this);
    this.saveTalaltPerson = this.saveTalaltPerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.onChangeNem = this.onChangeNem.bind(this);
    this.onChangeUgyszam = this.onChangeUgyszam.bind(this);
    this.onChangeMegtalalasIdeje = this.onChangeMegtalalasIdeje.bind(this);
    this.onChangeBecsultEletkor = this.onChangeBecsultEletkor.bind(this);
    this.onChangeHalalBecsultIdeje = this.onChangeHalalBecsultIdeje.bind(this);
    // image related
    this.selectFile = this.selectFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      szemely: {
        tipus: true,
        id: null,
        nem: "",
        halalBecsultIdeje: "",
        megtalalasIdeje: "",
        becsultEletkor: "",
        ugyszam: "",
      },
      //coordinate: this.props.coor,
      imageName: null,
      selectedFile: null,
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
    if (this.props.id1 && this.props.id1 !== prevProps.id1) {
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
  
  saveTalaltPerson() {
    console.log(`Saving TalaltPerson`);
    if (!this.props.coor) {
      alert("Probléma történt mentés közben: üres koordináta");
      return;
    }

    var data = {
      x: this.props.coor[0],
      y: this.props.coor[1],
      tipus: this.state.szemely.tipus,
      ugyszam: this.state.szemely.ugyszam,
      nem: this.state.szemely.nem,
      becsultEletkor: this.state.szemely.becsultEletkor,
      halalBecsultIdeje: this.state.szemely.halalBecsultIdeje,
      megtalalasIdeje: this.state.szemely.megtalalasIdeje
    };

    PersonService.create(data)
      .then(response => {
        // notify parent to reload list
        this.props.listUpdated();
        this.setState({
          message: "Sikeres mentés!"
        });
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
        // notify parent to reload list
        this.props.listUpdated();
        console.log(response.data);
        this.setState({
          message: "Sikeres módosítás!"
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
        // notify parent to reload list
        this.props.listUpdated();
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectFile(event) {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  uploadImage(id) {    
    var data = new FormData()
    data.append('imageFile', this.state.selectedFile)
    PersonService.postImage(id, data)
      .then(res => { // then print response status
        console.log(res.statusText)
      });
  }

  render() {
    const { szemely } = this.state;

    return (
      <div>
        { this.state.message ? (<p>{this.state.message}</p>) : (
          <div className="edit-form">
          { this.props.id1 ? ( <h4>Szerkesztés</h4> ) : ( <h4>Hozzáadás - talált holttest</h4> ) }
            <form>
              <div className="form-group row">
                <label htmlFor="nem" className="col-sm-4 col-form-label">Nem</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="nem"
                  value={szemely.nem}
                  onChange={this.onChangeNem}  />
              </div>
              <div className="form-group row">
                <label htmlFor="ugyszam" className="col-sm-4 col-form-label">Ügyszám</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="ugyszam"
                  value={szemely.ugyszam  }
                  onChange={this.onChangeUgyszam} />
              </div>
              <div className="form-group row">
                <label htmlFor="megtalalasIdeje" className="col-sm-4 col-form-label">Megtalálás ideje</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="megtalalasIdeje"
                  value={szemely.megtalalasIdeje}
                  onChange={this.onChangeMegtalalasIdeje}  />
              </div>
              <div className="form-group row">
                <label htmlFor="becsultEletkor" className="col-sm-4 col-form-label">Becsült életkor</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="becsultEletkor"
                  value={szemely.becsultEletkor}
                  onChange={this.onChangeBecsultEletkor}  />
              </div>
              <div className="form-group row">
                <label htmlFor="halalBecsultIdeje" className="col-sm-4 col-form-label">Halál becsült ideje</label>
                <input
                  type="text"
                  className="form-control col-sm-7"
                  id="halalBecsultIdeje"
                  value={szemely.halalBecsultIdeje}
                  onChange={this.onChangeHalalBecsultIdeje}  />
              </div>
              <div className="row"> 
                <div className="col-sm-4 col-form-label">Fotó</div>
                { (this.state.imageName) ? (
                  <div>{this.state.imageName}</div>
                ) : (
                  <input type="file" name="file" onChange={this.selectFile} />
                )}
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
                  onClick={this.saveTalaltPerson}>Ment</button>
              </div>
            )}
        
          </div>
        )}
      </div>
    );
  }
}
