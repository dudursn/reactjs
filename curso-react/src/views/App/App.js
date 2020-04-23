import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/Tabela';
import Formulario from '../../components/Formulario/Formulario';
import Popup from '../../utils/Popup';
import ApiService from '../../utils/ApiService';


class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            autores: [],
            colunas: ['nome', 'livro', 'preco'],
            titulos: ['Nome', 'Livro', 'Preço', 'Remover', 'Editar'],
            autor: {
                id: '',
                nome: '',
                livro: '',
                preco: ''
            }
        };
    }

    saveAutor = autor => {

          
        if (autor.id === '') {

            ApiService.criaAutor(JSON.stringify(autor))
                .then(res => {
                    if(res.message === 'success'){
                        
                        this.setState({ autores: [res.data, ...this.state.autores] });
                        Popup.exibeMensagem('success', 'Autor adicionado com sucesso. ');
                    }
                })
                .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar inserir o autor"));
        } else {

            ApiService.atualizaAutor(autor.id, JSON.stringify(autor))
                .then(res => {
                    if(res.message === 'success'){

                        this.state.autores.forEach(item => {
                            if (item.id === autor.id) {
                                item.nome = autor.nome;
                                item.livro = autor.livro;
                                item.preco = autor.preco;
                            }
                        });
                        this.setState({ autores: [...this.state.autores] })
                        Popup.exibeMensagem('success', 'Autor atualizado com sucesso. ');
                    }
                })
                .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar atualizar o autor"));

        }

        this.setState({
            autor: {
                id: '',
                nome: '',
                livro: '',
                preco: ''
            }
        });


    }

    removeAutor = id => {

        const { autores } = this.state;

        const autoresAtualizados = autores.filter((autor) => {
            return autor.id !== id;
        });

        ApiService.removeAutor(id)
            .then(res => {
                if(res.message === 'deleted') {
                    this.setState({autores: [...autoresAtualizados]});
                    Popup.exibeMensagem('error', "Autor removido com sucesso");
                }
            })
            .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar remover o autor"));
      
    }

    editaAutor = (id) => {
        ApiService.buscaAutor(id)
            .then(res => {
                if(res.message === 'success'){
                    this.setState({ autor: res.data });
                }
            })
            .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar buscar o autor"));
    }

    /* <==== métodos do proprio react ====> */

    componentDidMount() {
        ApiService.listaAutores()
            .then(res => {
                if(res.message === 'success'){
                    this.setState({ autores: [...this.state.autores, ...res.data] });
                }
            })
            .catch(err => Popup.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os autores"));
    }

    render() {

        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <h3 className="title-custom">Casa do Código</h3>
                    <Formulario escutadorDeSubmit={this.saveAutor} autor={this.state.autor} />
                    <Tabela itens={this.state.autores} remove={this.removeAutor} edita={this.editaAutor} colunas={this.state.colunas} titulos={this.state.titulos} />

                </div>
            </Fragment>

        );
    }
}

export default App;
