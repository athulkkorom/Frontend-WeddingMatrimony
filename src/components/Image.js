import styles from '@/styles/Image.module.css'
import { useRouter } from 'next/router'

const Image = () => {
    const router = useRouter()
    return ( 
        <div className={styles.my_component}>
            <h2 className={styles.description}>
                Find your perfect life partner
            </h2>
            <button onClick={() => router.push("/signup")} className="btn btn-light" Link>Join Now</button>
        </div>
     
    )
}
 
export default Image;