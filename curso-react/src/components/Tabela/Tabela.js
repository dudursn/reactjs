import React, { Component } from 'react';

const TableHead = (props) => {
    const titulos = props.titulos.map((item, index) => {
        return (
            <th key={'titulo_' + index}> {item} </th>
        );
    });

    return (
        <thead>
            <tr>
                {titulos}
            </tr>
        </thead>
    );
}

const TdRemoveButton = (props) => {
    if (props.remove) {
        return (
            <td>
                <button className="waves-effect waves-light btn red accent-4" onClick={() => { props.remove(props.chave) }} >Remover</button>
            </td>
        );
    }

    return ('');
}

const TdEditaButton = (props) => {
    if (props.edita) {
        return (
            <td>
                <button className="waves-effect waves-light btn blue accent-4" onClick={() => { props.edita(props.chave) }} >Editar</button>
            </td>
        );
    }

    return ('');
}

const TableBody = (props) => {



    const linhas = props.itens.map((item) => {
        return (
            <tr key={item.id} id={`item_${item.id}`}>
                {props.colunas.map((coluna) =>
                    <td key={`${item.id}${item[coluna]}`}>
                        {item[coluna]}
                    </td>
                )}

                <TdRemoveButton remove={props.remove} chave={item.id} />

                <TdEditaButton edita={props.edita} chave={item.id} />

            </tr>
        );
    });

    return (
        <tbody>
            {linhas}
        </tbody>
    );
}

class Tabela extends Component {

    render() {

        const { itens, remove, edita, colunas, titulos } = this.props;
        
        return (
            <table className="centered highlight">
                <TableHead titulos={titulos} />
                <TableBody itens={itens} remove={remove} edita={edita} colunas={colunas} />
            </table>
        );
    }
}

export default Tabela;