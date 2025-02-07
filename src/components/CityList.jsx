import PropTypes from 'prop-types'
import styles from './CityList.module.css'

import CityItem from './CityItem'
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from '../contexts/CitiesContext'


CityList.propTypes = {
  cities: PropTypes.node,
  isLoading: PropTypes.bool

}

export default function CityList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}
