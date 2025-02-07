import PropTypes from 'prop-types'
import styles from './CountryList.module.css'

import Spinner from "./Spinner"
import Message from "./Message"
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'


CountryList.propTypes = {
  cities: PropTypes.node,
  isLoading: PropTypes.bool

}

export default function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(city => city.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    }
    else return arr;
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}
