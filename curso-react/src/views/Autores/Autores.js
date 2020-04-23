import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App/App.css';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/Tabela';
import Popup from '../../utils/Popup';
import ApiService from '../../utils/ApiService';

class Autores extends Component {

    constructor(props) {

        super(props);

        this.state = {
            nomes: [],
            colunas: ['nome'],
            titulos: ['Nome']
        };
    }


    /* <==== métodos do proprio react ====> */

    componentDidMount() {
        ApiService.listaNomes()
            .then(res => {
                if(res.message === 'success'){
                    this.setState({ nomes: [...this.state.nomes, ...res.data] });
                }
            })
            .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os nomes dos autores"));
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h3 className="title-custom">Nomes</h3>
                    <Tabela itens={this.state.nomes} colunas={this.state.colunas} titulos={this.state.titulos} />
                </div>
            </Fragment>

        );
    }
}

export default Autores;