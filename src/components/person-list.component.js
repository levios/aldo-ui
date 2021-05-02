import React, { Component } from "react";
import PersonService from "../services/person.service";
import { Link } from "react-router-dom";
//import {PersonMissing, PersonFound} from "../data/person.js";
import ReactList from 'react-list';
import ImageBox from './image.component';
import ReactExpandableListView from 'react-expandable-listview';
import './listview.css';
import EltuntListElem from './eltunt-list-elem.component';
import TalaltListElem from './talalt-list-elem.component';

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
    //this.menuItems = this.menuItems.bind(this);

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

  renderItem(index, key) {
    var tutorial = this.props.persons[index];
    if (tutorial.tipus) {
      return (
        <TalaltListElem person={tutorial} />
      );
    } else {
      return  (
      <EltuntListElem person={tutorial} />
      );
    }
  }


  render() {
    const { searchTitle, persons, currentTutorial, currentIndex } = this.state;

    return (
      <div>
        <div>
        </div>
        <div className="list" style={{overflow: 'auto', height: '400px'}} >
          <div>
          { /* I only need keyIndex={index} because cannot call this.props.key from Component */ }
            {this.props.persons.map((tutorial, index)=> {
              if (tutorial.tipus) {
                
                return (
                  <TalaltListElem 
                    key={index} 
                    keyIndex={index}
                    person={tutorial} 
                    cb={(tut,idx) => this.setActiveTutorial(tut,idx)} 
                    activeIndex={this.state.currentIndex} />
                )
              } else {
                return (
                  <EltuntListElem 
                    key={index} 
                    keyIndex={index}
                    person={tutorial} 
                    cb={(tut,idx) => this.setActiveTutorial(tut,idx)} 
                    activeIndex={this.state.currentIndex} />
                )
              }

              }
            )}
          </div>
        </div>
      </div>
    );
  }

  
}
