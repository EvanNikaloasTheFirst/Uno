import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/gameboard.module.css";
import mainStyles from "@/styles/Home.module.css";
import Game from "@/classes/Game.jsx";
import Player from "@/classes/Player.jsx";
import React, { useState, useEffect, useCallback} from 'react';
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import Navbar from "components/navbar";

export default function Home() {
  
  var allPlayer = [];
  const [lobby, setLobby] = useState([]); // using useState ensures lobby is populated just once
  const [Me, setMe] = useState(new Map());
  const [PlayerOne, setPlayerOne] = useState(new Map());
  const [PlayerTwo, setPlayerTwo] = useState(new Map());
  const [PlayerThree, setPlayerThree] = useState(new Map());
  const [allPlayers, setAllPlayers] = useState([]);
  const [playersTurn, setPlayerTurn] = useState();
  const [count, setCount] = useState(0);
  var cardsDeck = Game.gameStart();
  const [deck, setDeck] = useState([]);
  const [thePlayersName, setPlayersName] = useState([])
  const [gameIsFinished, setGetIsFinished] = useState(false);
  const [gameWinner,setGameWinner] = useState(null);
  var [playerNames,setPlayerNames] = useState([]);
 const [storedAmount, setStoredAmount] = useState(null); // set state 


 useEffect(() =>{
  setPlayersName(localStorage.getItem("PlayerName"))
 })
  
  var MyPlayer = new Player(thePlayersName, Me);
  var ai1 =  new Player("Jerry", PlayerOne);
  var ai2 =  new Player("Johan", PlayerTwo);
  var ai3 =  new Player("Tracey", PlayerThree);
  useEffect(() => {
    if (storedAmount !== null) {
      let updatedAllPlayer = []; // Create a new array to hold the updated player list

      switch(lobby.length){
        case 1:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          updatedAllPlayer= allPlayer;
          break;

        case 2:
          allPlayer.push(MyPlayer);
          allPlayer.push(ai1);
          allPlayer.push(ai2);
          updatedAllPlayer= allPlayer;
          break;
        
        case 3:
          allPlayer.push(MyPlayer);
      allPlayer.push(ai1);
      allPlayer.push(ai2);
      allPlayer.push(ai3);
      updatedAllPlayer= allPlayer;
      break
      }
      setAllPlayers(updatedAllPlayer);
    }
  }, [storedAmount]);

  const retrieveAmount = () => {
    try {
      var amt = parseInt(localStorage.getItem("amountOfPlayer"));
      setStoredAmount(amt);

      const tempLobby = [];
      var tempNames = [];
      switch(amt){
        case 1:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempNames.push(localStorage.getItem("PlayerName"),"Jerry")
          break;  
        
        case 2:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          tempNames.push(localStorage.getItem("PlayerName"),"Jerry","Johan")
          break;  

        case 3:
          tempLobby.push(Me);
          tempLobby.push(PlayerOne);
          tempLobby.push(PlayerTwo);
          tempLobby.push(PlayerThree);
          tempNames.push(localStorage.getItem("PlayerName"),"Jerry","Tracey","Johan")
          break;  

      }
      setLobby(tempLobby)
      setPlayerNames(tempNames);
      setAllPlayers()

    } catch (e) {
      console.error('Failed to retrieve amount from localStorage', e);
    }
  };



  // sets up the card deck for each player
  useEffect(() => {
    retrieveAmount();
    if(cardsDeck.length !=0 || cardsDeck.length != null){
    setMe(Game.initPlayerDeck(cardsDeck)); // Set Me directly
    setPlayerOne(Game.initPlayerDeck(cardsDeck));
    setPlayerTwo(Game.initPlayerDeck(cardsDeck));
    setPlayerThree(Game.initPlayerDeck(cardsDeck));
    }
  }, []);



  var playerTurns = playerNames;
  const setPlayerGo = useCallback(() => {
    setCount((prevCount) => {
      let num;

      switch (storedAmount) {
        case 1:
          num = prevCount === 0 ? 1 : 0;
          break;

        case 2:
          num = (prevCount + 1) % 3;
          break;

        case 3:
          num = (prevCount + 1) % 4;
          break;

        default:
          num = 0;
          break;
      }

      return num;
    });
  }, [playerTurns.length]);
  
  

useEffect(() => {
  setPlayerTurn(playerTurns[count]);
}, [count, playerTurns]);


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
    // var card = Game.selectCard(arr,cardsDeck);
    var card;
    for (let i = 0; i < arr.length; i++){
      if (arr[i].colour == deck[deck.length-1].colour ||arr[i].value == deck[deck.length-1].value){
        card = arr[i];
        break;
      }
    }


    for(let i = 0; i < arr.length; i++){
  
      if (arr[i].colour == deck[deck.length - 1].colour ){
        index = i;
        break;
      }else if(arr[i].value == deck[deck.length - 1].value ){
        index = i;
        break;
      }
    }

    try{
    if (card != null && card.value == deck[deck.length - 1].value ||
      card.colour == deck[deck.length - 1].colour) {
      // Log the card placed down
      console.log(playersTurn + "...Card placed down " + card.value + " : " + card.colour);
      // Create a new array without the matching card
      const newCards = [...arr.slice(0, index), ...arr.slice(index + 1)];
      // Update the state with the new array
      // updates (my) card array
      switch(name){
        case 'Jerry':
          setPlayerOne(newCards);

        break;

        case 'Johan':
          setPlayerTwo(newCards);

        break;

        case 'Tracey':
          setPlayerThree(newCards);
        break;

        default:
          console.log("null")
      }

      const newDeck = [...deck, card];
       // get current array and adds the card just placed down into array
      setDeck(newDeck);
    }else if(playersTurn  == name){
    drawCard(playersTurn)
  }

  }catch(e){
    if(playersTurn  == name){
      drawCard(playersTurn)
    }
  }

  checkIfWon()
  }

var showPlayersTurn =(arr) =>{

  if(arr == null || arr == undefined){
      setPlayerTurn(thePlayersName)
    return thePlayersName
  }else {
    return playersTurn
  }



}

  const checkIfWon = () =>{
    if(PlayerOne.length == 0 ){
        alert("Winner PlayerOne")
        setGameWinner("Jerry")
    } else if(PlayerTwo.length == 0 ){
      alert("Winner PlayerTwo")
      setGameWinner("Johan")
    } else if(PlayerThree.length == 0 ){
      setGameWinner("Tracey")
    }else if(Me.length  == 0 ){
      alert("Winner me")
      setGameWinner(thePlayersName)
  }

  if(gameWinner != null){
    setGetIsFinished(true);
  }
  
}

  const drawCard = (name) => {
    var value = Math.floor(Math.random()* cardsDeck.length) + 1;

    var cardToAdd = cardsDeck[value];

    var newDeck = null;;

    if(playersTurn == name){
    switch(name){
      case 'Jerry':
        newDeck = [...PlayerOne, cardToAdd];
        setPlayerOne(newDeck);
        setPlayerGo()
      break;

      case 'Johan':
        newDeck = [...PlayerTwo, cardToAdd];
        setPlayerTwo(newDeck);
        setPlayerGo()
      break;
      case 'Tracey':
        newDeck = [...PlayerThree, cardToAdd];
        setPlayerThree(newDeck);
        setPlayerGo()
      break;

      case thePlayersName:
        newDeck = [...Me, cardToAdd];
        setMe(newDeck);
        setPlayerGo()
      break;
        

      default:
        setPlayerGo()
    }
  }

  }   
  
  const handleAITurn = () => {
    switch (playersTurn) {
      case 'Jerry':
        playAi(PlayerOne, "Jerry", deck);
        break;
      case 'Johan':
        playAi(PlayerTwo, "Johan", deck);
        break;
      case 'Tracey':
        playAi(PlayerThree, "Tracey", deck);
        break;
      default:
        checkIfWon();
    }
    setPlayerGo(); // This is called after each AI completes their turn
  };
  
//
  const handleCardClick = (item) => {
    if (playersTurn === thePlayersName) {
      if (Game.isCardSelectedValid(deck, item)) {
        placeCard(item);
        checkIfWon();
        setPlayerGo();
      } else {
        alert("Can't place that card");
      }
    } else {
      handleAITurn();
    }
  };
  

  return (
    <>
     <Head>
        <title>Uno by Evangelos</title>
        <meta name="description" content="Uno by Evangelos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uno_logo.png" />
      </Head>
      <main className={`${mainStyles.main}`}>
       <Navbar/>
        <div className={styles.gameboard}>

{gameIsFinished == true &&(
    <div className={styles.playAgain}>
    <p>WINNER:{gameWinner} </p>
          <ul>
          <li> <a href='http://localhost:3001/game'><button>Play Again?</button></a></li>
          <li> <a href='http://localhost:3001/'><button>home</button></a></li>
          </ul> 
      </div>
      
      
     
      )}

{/* Displays the cards placed down */}
<div className={styles.decks}>
            <ul>
              <li>
              <p>Deck</p>
              {/* Displaay blank card if no card has been placed down */}
              {deck.length > 0 && deck[deck.length - 1] ? (
  <img
    src={`/sprites/${deck[deck.length - 1] .colour}/${deck[deck.length - 1] .colour}-${deck[deck.length - 1] .value}.png`}
    alt=""
    className={styles.unoCard}
  />
): (
  <img
              src={"sprites/draw.png"}
              alt=""
              className={styles.unoCard}
              onClick={() =>{
                drawCard(playersTurn)
                console.log(playersTurn + " is drawing a card");
              }}
            />
)}

              </li>
              <li>
            <p>Draw</p>
            <img
              src={"sprites/special-cards/deck-img.png"}
              alt="Draw cards img"
              className={styles.drawCards}
              onClick={() =>{
                drawCard(playersTurn)
                console.log(playersTurn + " is drawing a card");
              }}
            />

              </li>
            </ul>
            <p className={styles.displayTurn}>
              {showPlayersTurn(playersTurn)} 's turn</p>
</div>



<div className={styles.playerOneCards}>
<p className={styles.playernamesStyle}>{thePlayersName}: {Me.length}</p>
       <ul>
{/* Loop over the arry of objects (uno array cards) */}
{[...Me.values()].map((item, index) => (
  
          <li key={index}> 
            <img 
              src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
              alt="" 
              className={styles.unoCard}  
              onClick={() => handleCardClick(item)}
            /> 
          </li>
        ))}

          </ul>
          
   </div>
{/* End of Players Deck */}
{storedAmount >= 2 ?(
<div className={styles.playerTwoCards}>
<ul>
<p className={styles.playernamesStyle}>Jerry: {PlayerOne.length}</p>
{/* Loop over the arry of objects (uno array cards) */}
{[...PlayerOne.values()].map((item, index) => (

<li key={index}>
<img
src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
alt=""
className={styles.unoCard}
onClick={() => handleCardClick(item)}
/>
</li>
))}

</ul>

</div>
):(
    // Placeholder or alternate content when the condition is not met
    <p></p>
)}


{storedAmount >= 2 || storedAmount === 1 ? (
  <div className={styles.playerThreeCards}>
    <ul>
      <p className={styles.playernamesStyle}>Johan: {PlayerTwo.length}</p>
      {/* Loop over the array of objects (uno array cards) */}
      {[...PlayerTwo.values()].map((item, index) => (
        <li key={index}> 
          <img 
            src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
            alt="" 
            className={styles.unoCard}  
            onClick={() => handleCardClick(item)}
          /> 
        </li>
      ))}
    </ul>
  </div>
) : (
  // Placeholder or alternate content when the condition is not met
  <p></p>
)}



{storedAmount >= 3 && (
<div className={styles.playerFourCards}>
  
<ul>
<p className={styles.playernamesStyle}>Tracey: {PlayerThree.length}</p>
{/* Loop over the arry of objects (uno array cards) */}
{[...PlayerThree.values()].map((item, index) => (

<li key={index}>
<img
src={`/sprites/${item.colour}/${item.colour}-${item.value}.png`}
alt=""
className={styles.unoCard}
onClick={() => handleCardClick(item)}
/>
</li>
))}

</ul>

</div>
)}
        </div>
        
      </main>
      <footer >
      <a href='https://www.instagram.com/ev.codes/'><p>Created by @ev.codes</p></a>
      </footer>
    </>
  );
}


// To Do deal with players turn turning to null