import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const NavBar = () => {
const[ token,setToken] = useState('')
 useEffect(()=>{
    if(window){
       setToken( localStorage.getItem('token'))
    }
    
 },[])
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

    return (
        <div className={styles.navbar}>
        <nav className={`${styles.navbar} ${styles.navbar_expand_lg} ${styles.bg_body_tertiary}`}>
          <div className={styles.container_fluid}>
            <a className={styles.navbar_brand} href="#">
              Kerala Matrimony
            </a>
            <button
              className={styles.navbar_toggler}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className={styles.navbar_toggler_icon} />
            </button>
            <div className={`${styles.collapse} ${styles.navbar_collapse}`} id="navbarNav">
              <ul className={styles.navbar_nav}>
                <li className={styles.nav_item}>
                  <a className={`${styles.nav_link} ${styles.active}`} aria-current="page" href="#">
                    Home
                  </a>
                </li>
                {
                    !token&& <li onClick={() => router.push('/signup')} className={styles.nav_item}>
                    <span className={styles.nav_link} >
                      Signup
                    </span>
                </li>
                }
               {
                !token &&  <li onClick={() => router.push('/login')} className={styles.nav_item}>

                <span className={styles.nav_link}>
                  Login
                </span>
            </li>
               }
                {
                  (router.pathname !== '/' ) && 
                  (
                    <li onClick={()=>router.push('/profile')} className={styles.nav_item}>

                    <span className={styles.nav_link}>
                      Profile
                    </span>
                </li>
                  )
                }
                {
                  (router.pathname !== '/' ) && 
                  (
                    <li onClick={handleLogout} className={styles.nav_item}>

                    <span className={styles.nav_link}>
                      LogOut
                    </span>
                </li>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default NavBar