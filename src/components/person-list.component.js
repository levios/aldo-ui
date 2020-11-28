import React, { Component } from "react";
import PersonService from "../services/person.service";
import { Link } from "react-router-dom";
//import {PersonMissing, PersonFound} from "../data/person.js";
import ReactList from 'react-list';
import ImageBox from './image.component';

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    //this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    //this.retrieveTutorials = this.retrieveTutorials.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    //this.removeTutorial = this.removeTutorial.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);
    this.renderItem = this.renderItem.bind(this);
    //this.cb = this.props.cb.bind(this);

    this.state = {
      //persons: props.persons,
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

/*   componentDidMount() {
    this.retrieveTutorials();
  } */


/*   onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  } */

/*   retrieveTutorials() {
    PersonService.getAll()
      .then(response => {
        this.setState({
          persons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  } */

/*   refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }
 */
  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
    this.props.cb1(tutorial.id);
  }

/* 
  searchTitle() {
    PersonService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          persons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  } */

  renderItem(index, key) {
    var tutorial = this.props.persons[index];
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
        <tr>
          <td>Fotó</td>
          <td>
            <ImageBox id1={tutorial.id}/>
          </td>
        </tr>
        </tbody>
      </table>
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
        <tr>
          <td>Fotó</td>
          <td>
            <ImageBox id1={tutorial.id}/>
          </td>
        </tr>
        </tbody>
      </table>
      </li>);
    }
  }

  render() {
    const { searchTitle, persons, currentTutorial, currentIndex } = this.state;

    return (
      <div>
        <div>
            <h4 style={{marginLeft: '30px', float: "left"}}>Lista</h4>
{/*             <button
              style={{marginLeft: '30px'}}
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.refreshList}
            >
              Frissít
            </button> */}
        </div>
        <div className="list" >
          <div>
            <ul className="list-group" style={{overflow: 'auto', height: '400px'}}>
              <ReactList
                  itemRenderer={this.renderItem}
                  length={this.props.persons.length}
                  type='uniform'
                />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
