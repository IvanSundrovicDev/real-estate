import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:  iconRetina,
    iconUrl: icon,
    shadowUrl: shadow
});


class MapContainer extends React.Component{
  constructor(props){
    super(props)
  }

  render(){


    return(
      <Map center={this.props.position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.props.position} />
      </Map>
    )
  }
}

export default MapContainer
