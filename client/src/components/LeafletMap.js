import React, { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import "./Map.css"

function LeafletMap() {
    
  const center = useMemo(() => ({ lat: 34.4243, lng: -118.5973 }), [])

  return (
    <div className='mapbox'>
        <MapContainer center={center} zoom={16}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    </div>
  )
}

export default LeafletMap