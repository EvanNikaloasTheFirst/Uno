import React, { Component } from 'react';
import { useState } from "react";

class Card {
    constructor(name, colour, value, imgSrc) {
        this.name = name;
        this.colour = colour;
        this.value = value;
        this.imgSrc = imgSrc;
    }

     getValue(){
        return this.value;
    }

    getColour(){
        return this.colour;
    }

    getImgSrc(){
        return this.imgSrc;
    }
}

export default Card;
