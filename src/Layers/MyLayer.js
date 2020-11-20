import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';


const MyLayer = ({ source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
		});

		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map]);

	return null;
};

export default MyLayer;
