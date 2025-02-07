
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"

import styles from './Map.module.css'

import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from '../hooks/useGeoLocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from "./Button"

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()
  const { position: geoLocationPosition, isLoading: isLoadingPosition, getPosition } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()
  // console.log(mapLat)


  useEffect(function () {
    if (mapLat && mapLng)
      setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(function () {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
  }, [geoLocationPosition])


  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type='position' onclick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your location"}
      </Button>}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          ))
        }
        <ChangeCenter position={mapPosition} />
        <DetectClick setMapPosition={setMapPosition} />
      </MapContainer>
    </div >
  )
}



function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick({ setMapPosition }) {
  const navigate = useNavigate()

  useMapEvent({
    click: (e) => {
      setMapPosition([e.latlng.lat, e.latlng.lng])
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}
