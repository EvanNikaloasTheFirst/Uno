import { func } from "prop-types";
import styles from "@/styles/gameboard.module.css";



export default function HomeBar () {
    return (
    <div className={styles.navigationBar}>
    <ul>
      <li>
        <div className={styles.save}>
          <img src={"/rules.png"} alt="Rules" className={styles.menuIcons}/>
          <a href='/'><p>History</p></a>
        </div>
      </li>
      <li>
      
      </li>
    </ul>

    <a href='http://localhost:3001/'>  <img src={"/uno_logo.png"} alt="uno" className={styles.unoNavLogo} /></a>

  </div>
    )}