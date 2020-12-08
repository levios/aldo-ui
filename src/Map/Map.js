import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
//import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import { Vector as VectorLayer} from 'ol/layer.js';
import ListLayer from "../Layers/ListLayer.js";
import { Controls, FullScreenControl } from "../Controls";
import { osm, vector } from "../Source";
import { Layers, TileLayer } from "../Layers";

import VectorSource from 'ol/source/Vector.js'
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import { coordinateRelationship } from "ol/extent";

const Map = ({ children, persons, zoom, center, szemely_type, cb1, selectedId }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	const [coord, setCoord] = useState(undefined);
	const [tempLayer, setTempLayer] = useState(undefined);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let	mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		mapObject.on("singleclick", function(evt){
			console.log("single click");
			console.log("evt:");
			console.log(evt);
			console.log(evt.coordinate);
			
			setCoord(evt.coordinate);

			cb1(evt.coordinate);
			
 			//mapObject.changed();
			console.log(mapObject.getLayers());
		 })

		return () => mapObject.setTarget(undefined);
	}, []); // selectedId 

	// remove temp layer if persons was updated
	useEffect(() => {
		if (!map) return;
		// remove old layer
		if(tempLayer) {
			tempLayer.setMap(null);
		}
		map.changed();
	}, [persons]);

	useEffect(() => {
		if (!map) return;
		if (coord) {
			var geoMarker = new Feature({
				type: 'geoMarker',
				geometry: new Point(coord)
			  });
			
			  // talalt_halott = true, eltunt_szemely = false
			var sty = szemely_type ? new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/skull_red.png'
				})
			  }) : new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/qmark_red.png'
				})
			  });

			var vectorLayer = new VectorLayer({
				source: new VectorSource({
				  features: [geoMarker]
				}),
				style: sty
			});

			// remove old layer
			if(tempLayer) {
				tempLayer.setMap(null);
			}
			setTempLayer(vectorLayer);
			
			vectorLayer.setMap(map);
			//map.getLayers().fil
			//map.addLayer(vectorLayer);
			map.changed();
		}
	}, [coord]);

	// TODO: ez nem azonnal valt...
	useEffect(() => {
		if (!map) return;
		console.log("Map changed: selectedId");
		
		//setMap(map);
		//map.setTarget(mapRef.current);
		//setMap(map);
		map.changed();
		//map.render();
	}, [selectedId]);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{/* {children} */}
				<Layers>
					<TileLayer
						source={osm()}
						zIndex={0}
					/>

					<ListLayer persons={persons} selectedId={selectedId} />
				</Layers>
				<Controls>
					<FullScreenControl />
				</Controls>
			</div>
		</MapContext.Provider>
	)
}

export default Map;