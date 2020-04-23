import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App/App.css';
import './NotFound.css';
import Header from '../../components/Header/Header';
import LinkWrapper from '../../utils/LinkWrapper';


class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h3 className="title-custom">404</h3>
                    <div id="notfound">
                        <div className="notfound">
                       
                            <h2>Oops! Essa página não foi encontrada</h2>
                            <p>Desculpe, mas a página que você está procurando não existe, foi removida or está temporariamente fora do ar</p>
                            <LinkWrapper to="/">Ir para página principal</LinkWrapper>
                        </div>
                    </div>

                </div>
            </Fragment>

        );
    }
}

export default NotFound;