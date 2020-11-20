import React, { Component } from "react";
import PersonService from "../services/person.service";
import { Link } from "react-router-dom";
//import {PersonMissing, PersonFound} from "../data/person.js";
import ReactList from 'react-list';

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.renderItem = this.renderItem.bind(this);
    //this.cb = this.props.cb.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }


  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    PersonService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
    this.props.cb1(tutorial.id);
  }

  removeTutorial(id) {
    PersonService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    PersonService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderItem(index, key) {
    var tutorial = this.state.tutorials[index];
    if (tutorial.tipus) {
      return  (<li
        className={
          "list-group-item " +
          (index === this.state.currentIndex ? "active" : "")
        }
        onClick={() => this.setActiveTutorial(tutorial, index)}
        key={index}
      >
        <table border="1">
        <tbody>
        <tr>
          <td>Megtalálás ideje</td>
          <td>{tutorial.megtalalasIdeje}</td>
        </tr>
        <tr>
          <td>Nem</td>
          <td>{tutorial.nem}</td>
        </tr>
        <tr>
          <td>Becsült életkor</td>
          <td>{tutorial.becsultEletkor}</td>
        </tr>
        <tr>
          <td>Halál becsült ideje</td>
          <td>{tutorial.halalBecsultIdeje}</td>
        </tr>
        <tr>
          <td>Ügyszám</td>
          <td>{tutorial.ugyszam}</td>
        </tr>
        </tbody>
      </table>
{/*       <Link
              to={"/tutorials/" + tutorial.id}
              className="badge badge-warning"
            >
              Módosít
            </Link>
      
            <button className="m-3 btn btn-sm btn-danger" onClick={() => this.removeTutorial(tutorial.id)}>
              Törlés
            </button> */}
      </li>);
    } else {
      return  (<li
        className={
          "list-group-item " +
          (index === this.state.currentIndex ? "active" : "")
        }
        onClick={() => this.setActiveTutorial(tutorial, index)}
        key={index}
      >
        <table border="1"><tbody>
        <tr>
          <td>Eltűnés ideje</td>
          <td>{tutorial.eltunesIdeje}</td>
        </tr>
        <tr>
          <td>Nem</td>
          <td>{tutorial.nem}</td>
        </tr>
        <tr>
          <td>Életkor</td>
          <td>{tutorial.eletkor}</td>
        </tr>
        <tr>
          <td>Jelzés</td>
          <td>{tutorial.jelzes}</td>
        </tr>
        <tr>
          <td>Ügyszám</td>
          <td>{tutorial.ugyszam}</td>
        </tr>
        </tbody>
      </table>
      <Link
              to={"/tutorials/" + tutorial.id}
              className="badge badge-warning"
            >
              Módosít
            </Link>
      
            <button className="m-3 btn btn-sm btn-danger" onClick={() => this.removeTutorial(tutorial.id)}>
              Törlés
            </button>
      </li>);
    }
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div>
        <div>
            <h4 style={{marginLeft: '30px', float: "left"}}>Lista</h4>
            <button
              style={{marginLeft: '30px'}}
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.refreshList}
            >
              Frissít
            </button>
        </div>
        <div className="list" >
          <div>
            <ul className="list-group" style={{overflow: 'auto', height: '400px'}}>
              <ReactList
                  itemRenderer={this.renderItem}
                  length={this.state.tutorials.length}
                  type='uniform'
                />
            </ul>
          {/* <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => {
                  if (tutorial.tipus == true) {
                    // talalt szemely
                    return  (<li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTutorial(tutorial, index)}
                      key={index}
                    >
                      <table border="1">
                      <tbody>
                      <tr>
                        <td>Megtalálás ideje</td>
                        <td>{tutorial.megtalalasIdeje}</td>
                      </tr>
                      <tr>
                        <td>Nem</td>
                        <td>{tutorial.nem}</td>
                      </tr>
                      <tr>
                        <td>Becsült életkor</td>
                        <td>{tutorial.becsultEletkor}</td>
                      </tr>
                      <tr>
                        <td>Halál becsült ideje</td>
                        <td>{tutorial.halalBecsultIdeje}</td>
                      </tr>
                      <tr>
                        <td>Ügyszám</td>
                        <td>{tutorial.ugyszam}</td>
                      </tr>
                      </tbody>
                    </table>
                    <Link
                            to={"/tutorials/" + tutorial.id}
                            className="badge badge-warning"
                          >
                            Módosít
                          </Link>
                    
                          <button className="m-3 btn btn-sm btn-danger" onClick={() => this.removeTutorial(tutorial.id)}>
                            Törlés
                          </button>
                    </li>);
                  } else {
                    // eltunt szemely
                    return  (<li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTutorial(tutorial, index)}
                      key={index}
                    >
                      <table border="1"><tbody>
                      <tr>
                        <td>Eltűnés ideje</td>
                        <td>{tutorial.eltunesIdeje}</td>
                      </tr>
                      <tr>
                        <td>Nem</td>
                        <td>{tutorial.nem}</td>
                      </tr>
                      <tr>
                        <td>Életkor</td>
                        <td>{tutorial.eletkor}</td>
                      </tr>
                      <tr>
                        <td>Jelzés</td>
                        <td>{tutorial.jelzes}</td>
                      </tr>
                      <tr>
                        <td>Ügyszám</td>
                        <td>{tutorial.ugyszam}</td>
                      </tr>
                      </tbody>
                    </table>
                    <Link
                            to={"/tutorials/" + tutorial.id}
                            className="badge badge-warning"
                          >
                            Módosít
                          </Link>
                    
                          <button className="m-3 btn btn-sm btn-danger" onClick={() => this.removeTutorial(tutorial.id)}>
                            Törlés
                          </button>
                    </li>);
                  }
                }
              )}
          </ul> */}
          {}
        </div>
       {/*  <div className="col-md-6">
          {currentTutorial ? (
            currentTutorial.isMissing ? (
            <div>
              <h4>Eltűnt személy</h4>
              <div>
                <label>
                  <strong>Eltűnés ideje</strong>
                </label>{" "}
                {currentTutorial.eltunesIdeje}
              </div>
              <div>
                <label>
                  <strong>Életkor:</strong>
                </label>{" "}
                {currentTutorial.eletkor}
              </div>
              <div>
                <label>
                  <strong>Jelzés:</strong>
                </label>{" "}
                {currentTutorial.jelzes}
              </div>
              <div>
                <label>
                  <strong>Nem:</strong>
                </label>{" "}
                {currentTutorial.nem}
              </div>
              <div>
                <label>
                  <strong>Ügyszám:</strong>
                </label>{" "}
                {currentTutorial.ugyszam}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
            ) : (
              <div>
              <h4>Talát személy</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
            )
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div> */}
        </div>
      </div>
    );
  }
}
