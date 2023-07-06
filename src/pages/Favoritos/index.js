import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'; 

import './favoritos.css';

import { toast } from 'react-toastify';


function Favoritos() {

    const [Filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id) {
        let filtroFilmes = Filmes.filter((item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido!")
    }

    return(
     <div className='meus-filmes'>
        <h1>Meus filmes</h1>

        {Filmes.length === 0 && <span>Não há nenhum filme salvo :(</span>}

        <ul>
            {Filmes.map((filme) => {
                return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
     </div>   
    )
}

export default Favoritos;