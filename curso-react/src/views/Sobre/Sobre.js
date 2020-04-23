import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App/App.css';

import Header from '../../components/Header/Header';


class Sobre extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h3 className="title-custom">Sobre</h3>
                  
                </div>
            </Fragment>

        );
    }
}

export default Sobre;