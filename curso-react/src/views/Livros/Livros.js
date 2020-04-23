import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App/App.css';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/Tabela';
import Popup from '../../utils/Popup';
import ApiService from '../../utils/ApiService';


class Livros extends Component {

    constructor(props) {

        super(props);

        this.state = {
            livros: [],
            colunas: ['livro'],
            titulos: ['Titulo']
        };
    }

    /* <==== métodos do proprio react ====> */

    componentDidMount() {
        ApiService.listaLivros()
            .then(res => {
                if(res.message === 'success'){
                    this.setState({ livros: [...this.state.livros, ...res.data] });
                }
            })
            .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os nomes dos livros"));
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h3 className="title-custom">Livros</h3>
                    <Tabela itens={this.state.livros} colunas={this.state.colunas} titulos={this.state.titulos} />
                </div>
            </Fragment>

        );
    }
}

export default Livros;