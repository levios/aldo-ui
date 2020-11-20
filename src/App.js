import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
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
	const [center, setCenter] = useState([18.23333, 46.08333]); // -94.9065, 38.9884]);
	const [zoom, setZoom] = useState(10);
	const [showLayer1, setShowLayer1] = useState(true);
	const [showLayer2, setShowLayer2] = useState(true);

	const [selectedId, setSelectedId] = useState(-1);

	const [szemelyTipus, setSzemelyTipus] = useState(true); // talalt_szemeny = true, eltunt_szemely = false

	const [coord, setCoord] = useState(undefined);

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

	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
			<a href="/" className="navbar-brand">
			Terkep <i>(Beta verzió)</i>
			</a>
			<div className="navbar-nav mr-auto">
{/* 				<li className="nav-item">
					<Link to={"/"} className="nav-link">
					Competitor
					</Link>
				</li> */}
			</div>
			</nav>

			<div className=".container-fluid mt-3 ml-2 mr-2">
				<Row>
					<Col xs={3}>
						<div className="div1">
							<PersonList cb1={(id) => cb(id)}/>
							{/*<BrowserRouter>
								<Switch>
									<Route exact path={["/", "/persons"]} component={PersonList} />
									<Route exact path="/add" component={AddCompetitor} />
									<Route path="/competitor/:id" component={Competitor} />
									<Route path="/competitors/:id" component={(props) => CompetitorTable(props)} />
									<Route path="/occupancy/:id" component={OccupancyList} /> 
								</Switch>
							</BrowserRouter>
								<AddTutorial />
							<PersonList /> */}
						</div>
						<div className="div2">
							{ (selectedId == -1 && !coord) ? (
								<div>Hozzon létre új elemet, vagy válasszon ki egyet a listából ...</div>
							) : (
								(selectedId != -1) ? (
									<Szemely id1={selectedId} />
								) : (
									(szemelyTipus) ? (<TalaltHolttest coor={coord}  />) : (<EltuntSzemely coor={coord}  />)
								)
							)
							}	
						</div>

					</Col>
					<Col xs={9}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Körözés típusa</FormLabel>
							<RadioGroup row aria-label="position" name="position" defaultValue="talalt_szemely" onChange={(c) => radioChanged(c)}
							>
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
						<Map center={fromLonLat(center)} zoom={zoom} szemely_type={szemelyTipus} cb1={(id) => mapCB(id)}>
							<Layers>
								<TileLayer
									source={osm()}
									zIndex={0}
								/>
								{showLayer1 && (
									<VectorLayer
										source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
										style={styles.MultiPolygon}
										//style={styles.image}

									/> 
									
								)}
								{showLayer2 && (
									<VectorLayer
										source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
										style={styles.MultiPolygon}
									/>
								)}
							</Layers>
							<Controls>
								<FullScreenControl />
							</Controls>
						</Map>
					</Col>
				</Row>
{/* 				<Row>
					<Col>	
						<div>
							<input
									type="checkbox"
									checked={showLayer1}
									onChange={event => setShowLayer1(event.target.checked)}
								/>Johnson County
						</div>
						<div>
							<input
									type="checkbox"
									checked={showLayer2}
									onChange={event => setShowLayer2(event.target.checked)}
								/>Wyandotte County
						</div>
					</Col>
				</Row> */}
			</div>
		</div>
	);
}

export default App;
