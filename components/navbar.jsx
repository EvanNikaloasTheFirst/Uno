import { func } from "prop-types";
import styles from "@/styles/gameboard.module.css";



export default function Navbar () {
    return (
    <div className={styles.navigationBar}>
    <ul>
      <li>
        <div className={styles.save}>
          <img src={"/sprites/images/saveIcon.png"} alt="Save" className={styles.menuIcons}/>
          <p>Save</p>
        </div>
      </li>
      <li>
      <div className={styles.exit}>
      <img src={"/sprites/images/exitIcon.png"} alt="Exit" className={styles.menuIcons}/>
      <a href='/'><p>Exit</p></a>
      </div>
      </li>
    </ul>

    <a href='http://localhost:3001/'>  <img src={"/uno_logo.png"} alt="uno" className={styles.unoNavLogo} /></a>

  </div>
    )}