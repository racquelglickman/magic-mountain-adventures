import React from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { useState, useMemo } from 'react'
import "./Map.css"

function Map() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 34.4259, lng: -118.5974 }), [])

  return (
    <div className="mapbox">
      { !isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap 
          mapContainerClassName='map-container'
          center = {center}
          zoom = {15}
        />
      )}
    </div>
  )
}

export default Map