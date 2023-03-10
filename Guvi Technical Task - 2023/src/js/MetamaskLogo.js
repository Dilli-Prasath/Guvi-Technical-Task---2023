import React, { Component } from "react";
import ModelViewer from '@metamask/logo';

class MetamaskLogo extends Component {
    componentDidMount() {
        this.view = ModelViewer({
            pxNotRatio: true,
            Width:250,
            height:250,
            followMouse: true
        });
        this.el.appendChild(this.view.container);
    }

    componentWillUnmount() {
        this.view.stopAnimation();
    }

    render() {
        return(
            <div
                style={{position: 'absolute', top: '70%', left: '70%'}}
                ref={el => (this.el = el)}
            />
        );
    }
}

export default MetamaskLogo;
