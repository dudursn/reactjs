import React, { Component } from 'react';
import FormValidador from '../../utils/FormValidador.js';
import Popup from '../../utils/Popup';

class Formulario extends Component {

    constructor(props) {

        super(props);

        this.validador = new FormValidador([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: "Entre com o nome"
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: "Entre com o livro"
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{ min: 0, max: 99999 }],
                validoQuando: true,
                mensagem: "Entre com um valor numérico"
            }
        ]);
       
        this.stateInicial = {
            id: '',
            nome: '',
            livro: '',
            preco: '',           
            naoAtualizar: false
        }

        
        this.state = this.stateInicial;
    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitFormulario = () => {

        const validacao = this.validador.valida(this.state);

        if (!validacao.isValid) {

            const { nome, livro, preco } = validacao;
            const campos = [nome, livro, preco];
       
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            camposInvalidos.forEach(campo => {
                Popup.exibeMensagem('error', campo.mensagem);
            });

        } else {
           
            const autor = {
                id: this.state.id,
                nome: this.state.nome,
                livro: this.state.livro,
                preco: this.state.preco, 
            };
            
            this.props.escutadorDeSubmit(autor);
            this.setState(this.stateInicial);
        }
    }

    componentDidUpdate(){

        const autor = this.props.autor;
        if(!this.state.naoAtualizar  && autor.id !==''){
           
            this.setState({
                id: autor.id,
                nome: autor.nome,
                livro: autor.livro,
                preco: autor.preco,           
                naoAtualizar: true
            });
        }
    }

   
    render() {
    
        const { id, nome, livro, preco } = this.state;
      
        return (
            <form>
                <div className="row">

                    <h4>Adicionar</h4>

                    <input type="hidden" name="id" value={id} />

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="nome">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.escutadorDeInput}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.escutadorDeInput}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorDeInput}
                        />
                    </div>

                </div>

                <button type="button" className="waves-effect waves-light btn lime darken-1 right" onClick={this.submitFormulario}>Salvar
                </button>
            </form>

        )
    }
}

export default Formulario;