import React, { Component } from "react";
import PersonService from "../services/person.service";

export default class EltuntSzemely extends Component {
  constructor(props) {
    super(props);
    //this.onChangeTitle = this.onChangeTitle.bind(this);
    //this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPerson = this.getPerson.bind(this);
    this.savePerson = this.savePerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.onChangeEltunesIdeje = this.onChangeEltunesIdeje.bind(this);
    this.onChangeNem = this.onChangeNem.bind(this);
    this.onChangeEletkor = this.onChangeEletkor.bind(this);
    this.onChangeJelzes = this.onChangeJelzes.bind(this);
    this.onChangeUgyszam = this.onChangeUgyszam.bind(this);
    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeY = this.onChangeY.bind(this);
    // image related
    this.selectFile = this.selectFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImages = this.deleteImages.bind(this);

    this.state = {
      szemely: {
        tipus: false,
        id: null,
        nem: "",
        eletkor: "",
        eltunesIdeje: "",
        jelzes: "",
        ugyszam: "",
        coordinate: this.props.coor
      },
      imageCount: null,
      selectedFile: null,
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
      console.log(`updated 'Eltunt' component: ${id}`);
      if (id) {
        this.getPerson(id);
      }
    }
  }

  onChangeEltunesIdeje(e) {
    const eltunesIdeje = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          eltunesIdeje: eltunesIdeje
        }
      };
    });
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
  onChangeEletkor(e) {
    const eletkor = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          eletkor: eletkor
        }
      };
    });
  }
  onChangeJelzes(e) {
    const jelzes = e.target.value;
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          jelzes: jelzes
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
  onChangeX(x) {
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          x: x
        }
      };
    });
  }
  onChangeY(y) {
    this.setState(function(prevState) {
      return {
        szemely: {
          ...prevState.szemely,
          y: y
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

    PersonService.getImageCount(id)
      .then(response => {
        this.setState({
          imageCount: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
    });
  }

  savePerson() {
    console.log(`Saving EltuntSzemely`);
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
      eletkor: this.state.szemely.eletkor,
      eltunesIdeje: this.state.szemely.eltunesIdeje,
      jelzes: this.state.szemely.jelzes
    };

    if (this.state.image) {
      // TODO
    }

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

    if (this.state.selectedFile) {
      this.uploadImage(this.state.szemely.id);
    }
  }

  updatePerson() {
    PersonService.update(this.state.szemely.id, this.state.szemely)
      .then(response => {
        // notify parent to reload list
        this.props.listUpdated();
        console.log("updatePerson");
        console.log(response.data);
        this.setState({
          message: "Sikeres mentés!"
        });
      })
      .catch(e => {
        console.log(e);
      });

    if (this.state.selectedFile) {
      this.uploadImage(this.state.szemely.id);
    }
  }

  deleteTutorial() {    
    PersonService.delete(this.state.szemely.id)
      .then(response => {
        console.log("deleteTutorial");
        console.log(response.data);
        // notify parent to reload list
        this.props.listUpdated();

        this.setState({
          message: "Sikeres törlés!"
        });
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
        this.setState({
          message: "Sikeres fotó feltöltés!",
          selectedFile: null
        });
      });
  }

  deleteImages() {    
    PersonService.deleteImages(this.state.szemely.id)
      .then(res => { // then print response status
        console.log(res.statusText)
        this.setState({
          message: "Kép törölve!"
        });
      });
  }

  render() {
    const { szemely } = this.state;

    return (
      <div>
        { this.state.message ? (<p>{this.state.message}</p>) : (
          <div className="edit-form">
            { this.props.id1 ? ( <h4>Szerkesztés</h4> ) : ( <h4>Hozzáadás - eltűnt személy</h4> ) }
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
                  <label htmlFor="eletkor" className="col-sm-4 col-form-label">Életkor</label>
                  <input
                    type="text"
                    className="form-control col-sm-7"
                    id="eletkor"
                    value={szemely.eletkor}
                    onChange={this.onChangeEletkor} />
                </div>
                <div className="form-group row">
                  <label htmlFor="eltunesIdeje" className="col-sm-4 col-form-label">Eltűnés ideje</label>
                  <input
                    type="text"
                    className="form-control col-sm-7"
                    id="eltunesIdeje"
                    value={szemely.eltunesIdeje}
                    onChange={this.onChangeEltunesIdeje}  />
                </div>
                <div className="form-group row">
                  <label htmlFor="jelzes" className="col-sm-4 col-form-label">Jelzés</label>
                  <input
                    type="text"
                    className="form-control col-sm-7"
                    id="jelzes"
                    value={szemely.jelzes}
                    onChange={this.onChangeJelzes}  />
                </div>
                <div className="form-group row">
                  <label htmlFor="ugyszam" className="col-sm-4 col-form-label">Ügyszám</label>
                  <input
                    type="text"
                    className="form-control col-sm-7"
                    id="ugyszam"
                    value={szemely.ugyszam}
                    onChange={this.onChangeUgyszam}  />
                </div>
                <div className="row"> 
                  <div className="col-sm-4 col-form-label">Fotó</div>
                  { (this.state.imageCount) ? (
                    <div>{this.state.imageCount} kép mentve</div>
                  ) : (
                    <input type="file" name="file" onChange={this.selectFile} />
                  )}
                </div>
              </form>

            {this.props.id1 ? (
              <div>
                <button
                  className="badge badge-danger mr-4"
                  onClick={this.deleteTutorial}>Törlés</button>
                <button
                  type="submit"
                  className="badge badge-success mr-4"
                  onClick={this.updatePerson}>Mentés</button>
                  { (this.state.imageCount) ? (
                    <button
                      className="badge badge-danger "
                      onClick={this.deleteImages}>Kép törlése</button>
                  ) : (
                    <div />
                  )}
              </div>
            ) : (
              <div>
                <button
                  className="badge badge-primary"
                  onClick={() => this.savePerson(true)}>Mentés</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
