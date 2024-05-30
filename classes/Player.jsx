import React, { Component } from 'react';
import Card from "@/classes/Card.jsx";
class Player{

    constructor(name,allCards){
                this.name = name;
                this.allCards=allCards;
        }

 getDeck(){
    return this.allCards;
}

 getName(){
    return this.name;
}

 getAllCards(){
    return this.allCards;
}
// boolean check to see if the user can call uno
        setCallUno(){
            const cardsLen = this.state.allCards.length;
            if(cardsLen === 1){
                return true;
            }else{
                return false;
            }
        }

        addCard = newCard => { // defines a class method, ensure this is always used
            this.setState((prevState) => ({ // this.setState is updating the components state
                cards: [...prevState.cards,newCard] // prevstate is the previoud state of card + the new card
            }))
        };

        // function to remove a card from players array
        removeCard(id){
            for (let i = 0; i < cardsLen; i++){
                if (allCards[i].id == id){
                        this.allCards.splice(i,1);
                        break
                }
            }
        }
        

static generateCards(colour){ 
            // 
 var arrayOfCards = [];
 switch (colour){
// To determine how to select the correct sprite
     case 'green':
         return '/green';
     
     case 'blue':
         return '/blue';

     case 'red':
         return '/red';

     case 'yellow':
         return '/yellow';
 }

 for (var i = 0; i < 19; i++){
     var value = Math.floor(Math.random()* 9) + 1;
     newCard = this.Card;
     newCard.colour = "colour";
     newCard.value = value;
     var pathToSprite = 'sprites/' + this.generateCards()+"/"+value;
     newCard.imgSrc = pathToSprite;
     arrayOfCards.push(newCard);
 }

 return arrayOfCards;
}
    
}

export default Player;