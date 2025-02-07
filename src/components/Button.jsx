import styles from './Button.module.css'


export default function Button({ children, onclick, type }) {
  return (
    <div onClick={onclick} className={`${styles.btn}  ${styles[type]}`}>{children}</div>
  )
}
