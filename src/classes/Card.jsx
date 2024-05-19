import React, { Component } from 'react';

class Card extends Component{
    constructor(props){ // constructor is used to init state and bind methods (if needed) - Java equivalent of constructor intialize fields
        super(props) // calls the constructor of the parent class, this is needed to properly init the componment
        this.state = {
            name: props.name,
            colour:props.colour,
            value:props.value,
            imgSrc:props.imgSrc
        }
    }

    getValue(){
        return this.state.value;
    }

    getColour(){
        return this.state.colour;
    }

    getImgSrc(){
        return this.state.imgSrc;
    }
}