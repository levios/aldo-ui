import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

import VectorSource from 'ol/source/Vector.js'
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import { coordinateRelationship } from "ol/extent";

const Map = ({ children, zoom, center, szemely_type, cb1, selectedId }) => {
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

/* 		let mapObject = null;
		if (map) {
			mapObject = map;
		} else { */
		let	mapObject = new ol.Map(options);
			mapObject.setTarget(mapRef.current);
			setMap(mapObject);
		/* } */


		// Map views always need a projection.  Here we just want to map image
      // coordinates directly to map coordinates, so we create a projection that uses
      // the image extent in pixels.
/*       var extent = [0, 0, 1024, 968];
      var projection = new Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: extent
      });
		mapObject.addLayer(
			new ImageLayer({
				source: new Static({
				  attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
				  url: 'https://imgs.xkcd.com/comics/online_communities.png',
				  projection: projection,
				  imageExtent: extent
				})
			  })
		); */

		mapObject.on("singleclick", function(evt){
/* 			console.log("evt:");
			console.log(evt);
			console.log(evt.coordinate);
			var routeCoords = evt.coordinate;
			var geoMarker = new Feature({
				type: 'geoMarker',
				geometry: new Point(routeCoords)
			  });

			var sty = szemely_type ? new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/qmark.png'
				})
			  }) : new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/skull.png'
				})
			  });

			var vectorLayer = new VectorLayer({
				source: new VectorSource({
				  features: [geoMarker]
				}),
				style: sty
			});
			console.log(mapObject.getLayers());
			mapObject.addLayer(vectorLayer);
			
			mapObject.changed();
			console.log(mapObject.getLayers()); */
			alert("singleclick: ");
		 })

		mapObject.on("dblclick", function(evt){
			console.log("double click");
			console.log("evt:");
			console.log(evt);
			console.log(evt.coordinate);
			
			setCoord(evt.coordinate);

			cb1(evt.coordinate);
			
 			//mapObject.changed();
			console.log(mapObject.getLayers());
		 })

/* 		if (coord) {
			var geoMarker = new Feature({
				type: 'geoMarker',
				geometry: new Point(coord)
			  });
			var sty = szemely_type ? new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/qmark_red.png'
				})
			  }) : new Style({
				image: new Icon({
				  anchor: [0.5, 1],
				  src: '/skull_red.png'
				})
			  });

			var vectorLayer = new VectorLayer({
				source: new VectorSource({
				  features: [geoMarker]
				}),
				style: sty
			});
			mapObject.addLayer(vectorLayer);
		} */

		return () => mapObject.setTarget(undefined);
	}, [selectedId]); // szemely_type, 

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
		map.changed();
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
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;