import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from 'next/router';
import Navbar from "components/navbar";
import HomeBar from "components/home-navbar";

export default function Home() {

  var [playersName, setPlayersName] = useState(null)
  try{
    // clear the local storage when homepage is loaded
  localStorage.removeItem('amountOfPlayer');
  }catch(e){
    // pass on
  }
  var selectedPlayers = (amount) =>{
    localStorage.setItem("amountOfPlayer" ,amount);
    
    console.log("Clicked " + amount)
  }
 var [showPlayersButton, setShowPlayerButton] = useState
 (false);

 var [enterNameBoxPresent, setEnterNameBox] = useState(false);
  const sayHello = () => {
    showButton(); 
  };

  

  var amountOfPlayer = [1,2,3];

  var showButton = () =>{
    setShowPlayerButton(prevState => !prevState);
    setEnterNameBox(true)


  }

  const handleInput = (event) =>{
    setPlayersName(event.target.value)
    localStorage.setItem("PlayerName" ,playersName);
  }

  return (

    
    <>
      <Head>
        <title>Uno by Evangelos</title>
        
        <meta name="description" content="Uno by Evangelos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uno_logo.png" />
      </Head>
      <main className={`${styles.main}`}>
        <HomeBar/>
        <div className={styles.WelcomeBlock}>
        <div>
          <img src="/uno_logo.png" className={styles.unoLogo} alt="unoLogo"/>
          
        </div>
        
        <button className={styles.startGame} onClick={sayHello}>Start Game</button>
        <div>
          
          <div className={styles.amountOfPlayers}>
          {enterNameBoxPresent &&(
            <div className={styles.enterName}>
              <p>Enter your name</p>
<input type="text" placeholder="Enter name.." className={styles.searchbox} value={playersName}
onChange={handleInput}
onBlur={handleInput} 
// blur add focus to the input to save the value (Used to saved the value)
/>
            </div>

          )}

          { showPlayersButton && (
            <> 
            <p className={styles.amtPlayerTxt}>Select the amount of players</p>

              <ul className={styles.amtBtns}>
                {amountOfPlayer.map(amount => (
                  <li key={amount} className={styles.quanityBtn}>
                    <a href="/game"  >
                    <button
          className={styles.startGame}
          onClick={() => selectedPlayers(amount)}> 
                      {amount}
                    </button>


</a>
                  </li>





                )
                )}

                
              </ul>
</>

          )}





          </div>
          
        </div>
</div>

      </main>
    </>
  );
}
