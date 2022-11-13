import React from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';



const containerStyle = {
    width: '50%',
    height: '400px'
};



export default function GoogleMapAPI(props) {

    const center = {
        lat: props.data[1],
        lng: props.data[0]
    }

    const position = {
        lat: props.data[1],
        lng: props.data[0]
    }

    const onLoad = marker => {
        console.log('marker: ', marker)
    }

    const mapContainerStyle = {
        height: "300px",
        width: "100%"
      }

    return (

        (window.google === undefined) ? <LoadScript
            googleMapsApiKey="AIzaSyAMbfqZwjx29C5KUP7gSt7wHHWK2m2ghdA"
            id="script-loader"
        //   language="en"
        //   region="EN"
        //   version="weekly"
        >
              <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={12}
    center={center}
  >
    <MarkerF
      onLoad={onLoad}
      position={position}

    />
  </GoogleMap>
        </LoadScript> :   <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={12}
    center={center}
  >
    <MarkerF

      position={position}
      onLoad={onLoad}
    />
  </GoogleMap>



    )
}
