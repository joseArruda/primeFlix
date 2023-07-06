import { useEffect, useState } from "react";

import { useParams, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";

import api from '../../services/api';

import './filme.css'
import { formToJSON } from "axios";

function Filme() {
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0dd7c71844958c058174ebf09dfd62a4",
                    language: "pt-BR",
                }
            })
            .then((response) =>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                navigation("/", { replace: true });
                return;
            })
        }

        loadFilme();


        return()=>{
            console.log('componente foi desmontado')
        }
    }, [navigation, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)
    
        if(hasFilme) {
            toast.warn("Este filme já esta na sua lista!")
            return;
        } else {
            filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso!")
        }
    }

    if(loading) {
        return(
            <div className="filme-info1">
                <h1></h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;