import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import ListLayer from "./Layers/ListLayer.js";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector.js'
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";
import ImageLayer from 'ol/layer/Image';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import PersonList from "./components/person-list.component";
import EltuntSzemely from "./components/eltunt-person.component";
import Szemely from "./components/person.component";
import TalaltHolttest from "./components/talalt-person.component";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import PersonService from "./services/person.service";
/**
 * https://getbootstrap.com/docs/4.0/utilities/sizing/
 * https://getbootstrap.com/docs/4.0/utilities/spacing/
 * 
 */
let styles = {
	'Point': new Style({
		image: new CircleStyle({
			radius: 10,
			fill: null,
			stroke: new Stroke({
				color: 'magenta',
			}),
		}),
	}),
	'Polygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	'MultiPolygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			width: 1,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
};

const geojsonObject = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Wyandotte",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.8627,
								39.202
							],
							[
								-94.901,
								39.202
							],
							[
								-94.9065,
								38.9884
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.6053,
								39.1144
							],
							[
								-94.5998,
								39.1582
							],
							[
								-94.7422,
								39.1691
							],
							[
								-94.7751,
								39.202
							],
							[
								-94.8627,
								39.202
							]
						]
					]
				]
			}
		}
	]
};
const geojsonObject2 = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Johnson",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.9065,
								38.9884
							],
							[
								-95.0544,
								38.9829
							],
							[
								-95.0544,
								38.7365
							],
							[
								-94.9668,
								38.7365
							],
							[
								-94.6108,
								38.7365
							],
							[
								-94.6108,
								38.846
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.9065,
								38.9884
							]
						]
					]
				]
			}
		}
	]
};

const App = () => {
	const version = "1.0.0";
	 // default starting location: Pecs
	const [center, setCenter] = useState([18.23333, 46.08333]);
	const [zoom, setZoom] = useState(10);
/* 	const [showLayer1, setShowLayer1] = useState(true);
	const [showLayer2, setShowLayer2] = useState(true); */

	const [persons, setPersons] = useState([]);
	
	// Persons matched by the Search Term
	const [personsMatched, setPersonsMatched] = useState([]);

	const [selectedId, setSelectedId] = useState(-1);

	// getter/setter for szemely tipus
	// talalt_szemeny = true, eltunt_szemely = false
	const [szemelyTipus, setSzemelyTipus] = useState(true);

	// getter/setter for selected coordinates
	const [coord, setCoord] = useState(undefined);

	// getter/setter for Search term
	const [searchTerm, setSearchTerm] = useState("");

	const cb = (id) =>  {
		console.log("callback was called");
		setSelectedId(id);
		setCoord(undefined);
	}

	const mapCB = (coordinate) =>  {
		console.log(`map callback was called: ${coordinate}`);
		setSelectedId(-1)
		setCoord(coordinate);
	}

	const radioChanged = (event) => {
		console.log(`new rg value: ${event.target.value}`)
		if (event.target.value == "talalt_szemely") {
			setSzemelyTipus(true);
		} else {
			setSzemelyTipus(false);
		}
	}

/* 	const selectedIdCB = () => {
		return selectedId;
	} */


	const listUpdated = () => {
		PersonService.getAll()
		.then(response => {
			setPersons(response.data);
			setPersonsMatched(response.data);
		  	console.log(response.data);
		})
		.catch(e => {
		  console.log(e);
		});
	}

	const handleSearchInputChanged = (e) => {
		console.log(`Input changed:  ${e.target.value}`);
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);

		setPersonsMatched(persons.filter(p => 
			!newSearchTerm
			||
			(p.ugyszam && p.ugyszam.includes(newSearchTerm))
			||
			(p.nem && p.nem.includes(newSearchTerm))
			||
			(p.halalBecsultIdeje && p.halalBecsultIdeje.includes(newSearchTerm))
			||
			(p.megtalalasIdeje && p.megtalalasIdeje.includes(newSearchTerm))
			||
			(p.jelzes && p.jelzes.includes(newSearchTerm))
			||
			(p.eletkor && p.eletkor.includes(newSearchTerm))
			||
			(p.eltunesIdeje && p.eltunesIdeje.includes(newSearchTerm))
			||
			(p.becsultEletkor && p.becsultEletkor.includes(newSearchTerm))
			||
			(p.becsultEletkor && p.becsultEletkor.includes(newSearchTerm))
		));
		console.log("Persons matched:");
		console.log(personsMatched);
	 }

	useEffect(() => {
		PersonService.getAll()
		.then(response => {
			setPersons(response.data);
			setPersonsMatched(response.data);
		  	console.log(response.data);
		})
		.catch(e => {
		  console.log(e);
		});
	}, []);

	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/" className="navbar-brand">
				ALDO
				</a>
				<div className="navbar-nav mr-auto"></div>
				<div className="version-bar">
					Verzió: {version}
				</div>
			</nav>

{/* h-100 = height 100%, mt = margin top, mr = margin right */}
			<div className="container-fluid mt-2 mr-2 h-100">
				<Row className="h-100">
					<Col xs={3}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Keresés..."
								value={searchTerm}
								onChange={handleSearchInputChanged} 
							/>
						</div>
					</Col>
					<Col xs={9}>
						<div className="my-label MuiTypography-body1">Új személy felvétele: Körözés típusa:</div>
						<FormControl component="fieldset">
 							<RadioGroup row aria-label="position"
							 	name="position"
							 	defaultValue="talalt_szemely"
 								onChange={(c) => radioChanged(c)} >
								<FormControlLabel
								value="talalt_szemely"
								control={<Radio color="primary" />}
								label="Talált holttest"
								labelPlacement="start"
								/>
								<FormControlLabel
								value="eltunt_szemely"
								control={<Radio color="primary" />}
								label="Eltűnt személy"
								labelPlacement="start"
								/>
							</RadioGroup>
						</FormControl>
					</Col>
				</Row>
				<Row className="h-100">
					<Col xs={3}>
						<div className="div1">
							<PersonList cb1={(id) => cb(id)} persons={personsMatched} />
						</div>
						<div className="div2">
							{ (selectedId == -1 && !coord) ? (
								<div>Hozzon létre új elemet, vagy válasszon meglévőt a listából.<br />Új elem létrehozásához kattintson a térképen a hely kiválasztásához.</div>
							) : (
								(selectedId != -1) ? (
									<Szemely id1={selectedId} listUpdated={() => listUpdated()}/>
								) : (
									(szemelyTipus) ? (
										<TalaltHolttest coor={coord}  listUpdated={() => listUpdated()} />
									) : (
										<EltuntSzemely coor={coord} listUpdated={() => listUpdated()} />
									)
								)
							)
							}	
						</div>

					</Col>
					<Col xs={9}>
						<Map 
							center={fromLonLat(center)} 
							zoom={zoom} 
							szemely_type={szemelyTipus} 
							cb1={(id) => mapCB(id)} 
							selectedId={selectedId} 
							persons={personsMatched}
						>
						</Map>
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default App;
