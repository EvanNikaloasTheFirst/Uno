import React, { Component } from 'react';
import Card from "@src/classes/./Card";
import Player from "@src/classes/./Player";
import PropTypes from 'prop-types';

class Game{

    static gameStart(){

        var cardsDeck = [];

        cardsDeck.push(
        this.generateCards("green"), 
        this.generateCards("red"),
        this.generateCards("blue"),
        this.generateCards("yellow"),
        this.generateCards("green"), 
        this.generateCards("red"),
        this.generateCards("blue"),
        this.generateCards("yellow"));
        generateSpecialCards("Skip");
        generateSpecialCards("reverse");
        generateSpecialCards("pickup")

    }

    static generateCards(colour){ 
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
            newCard.name = "Normal Card";
            newCard = this.Card;
            newCard.colour = "colour";
            newCard.value = value;
            var pathToSprite = 'sprites/' + this.generateCards()+"/"+value;
            newCard.imgSrc = pathToSprite;
            arrayOfCards.push(newCard);
        }

        return arrayOfCards;
    }


    static generateRandomNumber(){

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
    }

    static generateSpecialCards(name){
            newCard= this.Card;
            newCard.colour = 
            newCard.imgSrc = " / " + newCard.colour + "/" + name;
            return newCard;
    }
    

    static isCardSelectedValid(cardOnDeck,cardToBePlaced){
        var valid = false;
        if(cardOnDeck.colour === cardToBePlaced.colour){
            valid = true;
        }

        if (cardOnDeck.value === cardToBePlaced.value){
            valid = true;
        }
        return valid;
    }



    
}


Game.propTypes = { // specifies thatr cardOnDeck and CardToBePlace need to be of type CARD
    cardOnDeck: PropTypes.instanceOf(Card).isRequired,
    cardToBePlaced: PropTypes.instanceOf(Card).isRequired
};