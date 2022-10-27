import React, { Component } from 'react';

import {Spinner} from 'react-bootstrap';

export class SpinnerBox extends Component {
    render() {
        return (
            <div className={"loading-box"}>
                <div className={'loading-spiner'}><Spinner  animation="border"/></div>
            </div>
        );
    }
}


