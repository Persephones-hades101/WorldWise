import styles from './Button.module.css'


export default function Button({ children, onclick, type }) {
  return (
    <button onClick={onclick} className={`${styles.btn}  ${styles[type]}`}>{children}</button>
  )
}
