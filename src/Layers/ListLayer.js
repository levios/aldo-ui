import React, { useRef, useState, useEffect } from "react"
import { Layers, TileLayer, VectorLayer } from ".";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector.js'
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

class ListLayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: -1
        };
    }

    render() {
        
        const skull = '/skull.png';
        const skull_blue = '/skull_blue.png';
        const qmark = '/qmark.png';
        const qmark_blue = '/qmark_blue.png';

        return (
            this.props.selectedId && this.props.persons && this.props.persons.map((p, idx) => {
                // var routeCoords = evt.coordinate;
                var routeCoords = [p.x, p.y];
                
                var geoMarker = new Feature({
                    type: 'geoMarker',
                    geometry: new Point(routeCoords)
                });

                // talalt_szemeny = true, eltunt_szemely = false
                var sty = p.tipus ? new Style({
                    image: new Icon({
                    anchor: [0.5, 1],
                    src: (p.id == this.props.selectedId) ? skull_blue : skull
                    })
                }) : new Style({
                    image: new Icon({
                    anchor: [0.5, 1],
                    src: (p.id == this.props.selectedId) ? qmark_blue : qmark
                    })
                });

                {/* !!! key={Math.random()} IS A HACK TO RE-RENDER IT !!! */}
                return  (
                    <VectorLayer
                        source={new VectorSource({
                        features: [geoMarker]
                        })}

                        style={sty}

                        key={Math.random()}
                    />
                )
            })
        );
    }
};

export default ListLayer;