import React, { Component } from 'react';
import AFRAME from 'aframe';
import { Entity } from 'aframe-react';


export default class FloorUnit extends Component {
    constructor(props) {
        super(props);

        this.state = {active: false};
    }

    onMouseEnter() {
        this.setState({active: true});
    }

    onMouseLeave() {
        this.setState({active: false});
    }

    render() {
        return (
            <Entity
                primitive="a-plane"
                material={this.state.active ? "color: red" : "color: white"}
                position={{x: this.props.x, y:"0", z:this.props.y}} 
                rotation={{x: "-90", y:"0", z:"0"}}
                scale={{x: "1", y: "1", z: "1"}}
                events={{click: this.props.onClick, mouseenter: [this.onMouseEnter.bind(this), this.props.onMouseEnter], mouseleave: this.onMouseLeave.bind(this)}}
                height="1" width="1" />
        )
    }
}