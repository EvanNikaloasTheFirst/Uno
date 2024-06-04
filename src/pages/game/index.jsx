import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/gameboard.module.css";
import mainStyles from "@/styles/Home.module.css";
import Game from "@/classes/Game.jsx";
import Player from "@/classes/Player.jsx";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback} from 'react';
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function Home() {
  var allPlayer = [];
  const [lobby, setLobby] = useState([]); // using useState ensures lobby is populated just once
  const [Me, setMe] = useState(new Map());
  const [PlayerOne, setPlayerOne] = useState(new Map());
  const [PlayerTwo, setPlayerTwo] = useState(new Map());
  const [PlayerThree, setPlayerThree] = useState(new Map());
  const [allPlayers, setAllPlayers] = useState([]);
  const [playersTurn, setPlayerTurn] = useState(null);
  const [count, setCount] = useState(0);
  const [whosTurn, setwhosTurn] = useState(null);
  var cardsDeck = Game.gameStart();
  const [deck, setDeck] = useState([cardsDeck[0]]);

  var [playerNames,setPlayerNames] = useState([]);

  var MyPlayer = new Player("Evangelos", Me);


  const [storedAmount, setStoredAmount] = useState(null); // set state 

  const retrieveAmount = () => {
    try {
      var amt = parseInt(localStorage.getItem("amountOfPlayer"));
      setStoredAmount(localStorage.getItem("amountOfPlayer"));

      const tempLobby = [];
      var tempNames = [];
      switch(amt){
        case 1:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempNames.push("Me","PlayerOne")
          break;  
        
        case 2:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          tempNames.push("Me","PlayerOne","PlayerTwo")
          break;  

        case 3:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          tempLobby.push(PlayerThree);
          tempNames.push("Me","PlayerOne","PlayerTwo","PlayerThree")
          break;  

      }
      setLobby(tempLobby)
      setPlayerNames(tempNames);

    } catch (e) {
      console.error('Failed to retrieve amount from localStorage', e);
    }
  };

  

  // sets up the card deck for each player
  useEffect(() => {
    retrieveAmount();
    setMe(Game.initPlayerDeck(cardsDeck)); // Set Me directly
    setPlayerOne(Game.initPlayerDeck(cardsDeck));
    setPlayerTwo(Game.initPlayerDeck(cardsDeck));
    setPlayerThree(Game.initPlayerDeck(cardsDeck));


  }, []);

  useEffect(() => {
    if (storedAmount !== null) {
      // Ai bots
      var ai1 =  new Player("Jerry", PlayerOne);
      var ai2 =  new Player("Johan", PlayerTwo);
      var ai3 =  new Player("Tracey", PlayerThree);
      let updatedAllPlayer = []; // Create a new array to hold the updated player list

      switch(lobby.length){
        case 1:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          updatedAllPlayer[MyPlayer,ai1];
      break;

        case 2:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          allPlayer.push(ai2);
          updatedAllPlayer[MyPlayer,ai1,ai2];
          break;
        
        case 3:
          allPlayer.push(MyPlayer);
      allPlayer.push(ai1);
      allPlayer.push(ai2);
      allPlayer.push(ai3);
      updatedAllPlayer[MyPlayer,ai1,ai2,ai3];
      break
      }
      setAllPlayers(updatedAllPlayer);
    }
  }, [storedAmount]);

  var playerTurns =  playerNames;

  const setPlayerGo = useCallback(() => {
    setCount((prevCount) => {

      let newCount = prevCount + 1;
      if (prevCount === 2) {
        newCount = 0;
      }
     
try{
  console.log(`/sprites/${item.
    colour}/${item.colour}-${item.value}.png`);
}catch(e){}
        
        return newCount;
    });
}, [playersTurn]);

useEffect(() => {
  setPlayerTurn(playerTurns[count]);
}, [count, playerTurns]);

useEffect(() => {
  setwhosTurn(playersTurn);
}, [count, whosTurn]);

  const placeCard = (card) =>{
    

    var index = null;
    // Looks for the card that has been selected & stores it in a variable
    for (let i = 0; i < Me.length; i++){
      if (card.value == Me[i].value || card.colour === Me[i].colour){
        index = i;
        card = Me[i];
        break;
      }
    }
    if (index !== null && card !== null) {
      // Log the card placed down
      console.log("Card placed down " + card.value + " : " + card.colour);

      // Create a new array without the matching card
      const newCards = [...Me.slice(0, index), ...Me.slice(index + 1)];

      // Update the state with the new array
      setMe(newCards); // updates (my) card array

      const newDeck = [...deck, card]; // get current array and adds the card just placed down into array
      setDeck(newDeck);
    }

  }

// Allows the ai to place cards 
  const playAi = (arr,name,deck) =>{
    var index = null;

    //  Looks for the best card to place on deck
    var card = Game.selectCard(arr,cardsDeck);

    for(let i = 0; i < arr.length; i++){

      if(arr[i].colour === deck[deck.length - 1].colour && arr[i].value === deck[deck.length - 1].value ){
        index = i;

        break;
      }else if (arr[i].colour === deck[deck.length - 1].colour ){
        index = i;

        break;
      }else if(arr[i].value === deck[deck.length - 1].value ){
        index = i;

        break;
      }
    }

    try{
    if (card != null && card.value == deck[deck.length - 1].value || card != null && 
      card.colour === deck[deck.length - 1].colour) {
      // Log the card placed down
      console.log(playersTurn + "...Card placed down " + card.value + " : " + card.colour);
      // Create a new array without the matching card
      const newCards = [...arr.slice(0, index), ...arr.slice(index + 1)];
      // Update the state with the new array
      // updates (my) card array
      switch(name){
        case 'PlayerOne':
          setPlayerOne(newCards);
          console.log(PlayerOne.length + " Player One len")

        break;

        case 'PlayerTwo':
          setPlayerTwo(newCards);
          console.log(PlayerTwo.length + " Player 2 len")

        break;

        case 'PlayerThree':
          setPlayerThree(newCards);
          console.log(PlayerThree.length + " Player 3 len")

        break;

        default:
          console.log("null")
      }

      const newDeck = [...deck, card];
       // get current array and adds the card just placed down into array
      setDeck(newDeck);

      console.log("Ai played: " +newDeck[newDeck.length - 1].value +  newDeck[newDeck.length - 1].colour );
    }else{
    drawCard(playersTurn)
    console.log(playersTurn + " is drawing a card");
  }

  }catch(e){
    drawCard(playersTurn)
    console.log(playersTurn + " is drawing a card");
  }

  // checkIfWon()
  }

  const contains = (name,arr) => {
    for (let i = 0; i < arr.length; i++){
      if(arr[i] === name){
        alert("true")
        return true
      } 
    }
    return false
  }

  const checkIfWon = () =>{
// alert("DDDd")
    if(PlayerOne.length == 0 ){
        alert("Winner PlayerOne")
    } else if(PlayerTwo.length == 0 ){
      alert("Winner PlayerTwo")
    } else if(PlayerThree.length == 0 ){
        alert("Winner playerThree")
    }else if(Me.length-1 == 0 ){
      alert("Winner me")
  }
}

  const drawCard = (name) => {
    var value = Math.floor(Math.random()* cardsDeck.length) + 1;

    var cardToAdd = cardsDeck[value];

    var newDeck = null;;

    if(playersTurn === name){
    switch(name){
      case 'PlayerOne':
        newDeck = [...PlayerOne, cardToAdd];
        setPlayerOne(newDeck);
        setPlayerGo()
      break;

      case 'PlayerTwo':
        newDeck = [...PlayerTwo, cardToAdd];
        setPlayerTwo(newDeck);
        setPlayerGo()
      break;

      case 'PlayerThree':
        newDeck = [...PlayerThree, cardToAdd];
        setPlayerThree(newDeck);
        setPlayerGo()
      break;

      case 'Me':
        newDeck = [...Me, cardToAdd];
        setMe(newDeck);
        setPlayerGo()
      break;
        

      default:
        console.log("null")
    }
  }

  }    


  return (
    <>
     <Head>
        <title>Uno by Evangelos</title>
        <meta name="description" content="Uno by Evangelos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uno_logo.png" />
      </Head>
      <main className={`${mainStyles.main}`}>
        <div className={styles.gameboard}>

{Me.length == 0 &&(
        <div className={styles.playAgain}>
  <p>WINNER</p>
        <ul>
      
        <li> <a href='http://localhost:3001/game'><button>Play Again?</button></a></li>
        <li> <a href='http://localhost:3001'><button>home</button></a></li>
        </ul> 
    </div>
    
     
      )}

{/* Displays the cards placed down */}
<div className={styles.decks}>
            <ul>



              <li>
              <p>Deck</p>
              {deck.length != 0 &&( 
               
            <img
              src={`/sprites/${deck[deck.length - 1].colour}/${deck[deck.length - 1].colour}-${deck[deck.length - 1].value}.png`}
              alt=""
              className={styles.unoCard}
            />
          )}
              </li>

              <li>
<p>Draw</p>
            <img
              src={"sprites/draw.png"}
              alt=""
              className={styles.unoCard}
              onClick={() =>{
                drawCard(playersTurn)
                console.log(playersTurn + " is drawing a card");
              }}
            />

              </li>
            </ul>
            <p>{playersTurn ? `${playersTurn}+    's Turn` : 'No player turn set'}</p>



</div>


<div className={styles.playerGameBoard}>
{/* // get number of players from local storage */}
<div className={styles.gameboardHands}>
     <ul className={styles.playersHands}>

      {/* Player One -------------------------------*/}
        <li className={styles.player}>
        <div className={styles.playersCards}>

        <div>
      {playerTurns === 'Me' ? (
        <div className={styles.yourTurn}>
          <p>{MyPlayer.getName() + " " + Me.length} </p>
        </div>
      ) : (
        <p>{MyPlayer.getName() + " " + Me.length} </p>
      )}
    </div>
        <div className={styles.PlayercardBox}>
       
          <ul>
{/* Players Cards */}
{/* Loop over the arry of objects (uno array cards) */}
{[...Me.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard}  
              onClick={() => {
                

                if(playersTurn === "Me"){
                  if(Game.isCardSelectedValid(deck,item)){
                  setPlayerGo()
                  placeCard(item);
                  console.log(Me.length + " My array")
                  // checkIfWon()
                  }
                  

                  else{
                    alert("Cant place that card")
                  }
                  
                }
                
                else{
                  // checkIfWon()
                // This determines which AI is next to place a card
                  switch(playersTurn){
                    case 'PlayerOne':
                      playAi(PlayerOne,"PlayerOne",deck) 
                      setPlayerGo()
                    break;
                    case 'PlayerTwo':
                      playAi(PlayerTwo,"PlayerTwo",deck) 
                      setPlayerGo()
                    break;

                    case 'PlayerThree':
                      playAi(PlayerThree,"PlayerThree",deck) 
                      setPlayerGo()
                    break;

                    default:
                      // checkIfWon()
                      console.log("Me")
                      
                  }
                }
                
              }}
            /> 
          </li>
        ))}

          </ul>
          </div>
        </div>
        </li>
        {storedAmount >= 1 && (
        <li className={styles.playerTwo}>
        <div className={styles.playersCards}>
          <p>Player One {PlayerOne.length}</p>
          {PlayerOne.length == 0 &&(
          <div>
            <p>WINNER</p>
            <ul>
            <li> <button>Play Again?</button></li>
            <li><button>Back to home</button></li>
            </ul> 
            </div>
      )}
          <div className={styles.cardBox}>
          <ul>
            <li>       
            {[...PlayerOne.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 

            

            /> 
          </li>
        ))}
                 </li>
          </ul>
          </div>
        </div>
</li>)}

{storedAmount >= 2 && (
        <li className={styles.playerThree}>
           <div>
      {playerTurns === 'PlayerTwo' ? (
        <div className={styles.yourTurn}>
          <p>Player Two {PlayerTwo.length}</p>
        </div>
      ) : (
        <p>Player Two {PlayerTwo.length}</p>
      )}

{PlayerTwo.length == 0 &&(
         <div>
         <p>WINNER</p>
         <ul>
             <li><button onclick="location.reload()'">Play Again?</button></li>
             <li><button onclick="location.reload()">Back to home</button></li>
         </ul> 
     </div>
     
      )}
    </div>
        <div className={styles.playersCards}>

        <div className={styles.cardBox}>
       
          <ul>
            <li>       
            {[...PlayerTwo.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
            /> 
          </li>
        ))}
           
                 </li>
          </ul>
      
          </div>
        </div>
</li>)}

{storedAmount >= 3 && (
        <li className={styles.playerFour}>
        <div className={styles.playersCards}>
        <div>
      {playerTurns === 'PlayerThree' ? (
        <div className={styles.yourTurn}>
          <p>Player Three {PlayerThree.length}</p>
        </div>
      ) : (
        <p>Player Three {PlayerThree.length}</p>
      )}
    </div>
          <div className={styles.cardBox}>
          {PlayerThree.length == 0 &&(
        <div>
        <p>WINNER</p>
        <ul>
            <li><button onclick="location.reload()'">Play Again?</button></li>
            <li><button onclick="location.reload()">Back to home</button></li>
        </ul> 
    </div>
    
     
      )}
          <ul>
            
            <li>       
            {[...PlayerThree.values()].map((item, index) => (
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard} 
            /> 
          </li>
        ))}
                 </li>
          </ul>
          </div>
        </div>
</li>)} 
            </ul>
</div> 
        </div>    
        </div>
      </main>
    </>
  );
}