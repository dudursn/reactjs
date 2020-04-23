import validador from 'validator';

class FormValidador {

    constructor(validacoes) {

        this.validacoes = validacoes;
    }

    valida(state) {


        let validacao = this._criaValidacao();

        this.validacoes.forEach(regra => {
            let campo = state[regra.campo.toString()].toString();
            let metodoValidacao = (typeof regra.metodo === 'string') ? validador[regra.metodo] : regra.metodo;
            let args = regra.args || [];

            if (metodoValidacao(campo, ...args, state) !== regra.validoQuando) {

                validacao[regra.campo] = { isInvalid: true, mensagem: regra.mensagem };
                validacao.isValid = false;
            }

        })

        return validacao;
    }

    _criaValidacao() {

        const validacao = {};

        this.validacoes.map(regra => (
            validacao[regra.campo] = { isInvalid: false, mensagem: '' }
        ));

        return { isValid: true, mensagem: '' }
    }
}

export default FormValidador;