
const url = 'http://localhost:8000/api';

const ApiService = {

    listaAutores: () => {
        
        return fetch(`${url}/autor`)
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    criaAutor: autor => {

        return fetch(`${url}/autor`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: autor })
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    buscaAutor: id => {
        
        return fetch(`${url}/autor/${id}`)
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    atualizaAutor: (id, autor) => {
        
        return fetch(`${url}/autor/${id}`, { method: 'POST', headers: { 'content-type': 'application/json'}, body: autor })
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    listaNomes: () => {

        return fetch(`${url}/autor/nome`)
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    listaLivros: () => {

        return fetch(`${url}/autor/livro`)
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    removeAutor: id => {

        return fetch(`${url}/autor/${id}`, { method: 'DELETE', headers: { 'content-type': 'application/json' } })
                .then(res => ApiService.trataErros(res))
                .then(res =>  res.json());
    },

    trataErros: res =>{
        if(!res.ok){
            throw Error(res.responseText);
        }
        return res;
    }

};

export default ApiService;