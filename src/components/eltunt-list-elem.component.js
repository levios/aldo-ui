import React, { Component } from "react";
import './listview.css';
import ImageBox from './image.component';

export default class EltuntListElem extends Component {
  constructor(props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      contentVisible: false
    };
  }

  setActiveTutorial(tutorial) {
    this.props.cb(tutorial, this.props.keyIndex);
  }

  collapse() {
    this.setState({
        contentVisible: !this.state.contentVisible
    });
  }

  render() {
    var tutorial = this.props.person;
    return(
    <div>
        <button type="button"
            className={
                "collapsible " +
                (this.state.contentVisible ? "collapsible_active" : "")
            }
            onClick={this.collapse} >Ügyszám: {tutorial.ugyszam}</button>
        {this.state.contentVisible ? (
            <div className={
                "content " +
                (this.props.keyIndex === this.props.activeIndex ? "active" : "")
              }
              onClick={() => this.setActiveTutorial(tutorial)}
            >                <table border="1">
                    <tbody>
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
            </div>
        ) : (
            <div></div>
        ) }
    </div>);

  }

}