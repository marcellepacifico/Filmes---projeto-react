import {useEffect, useState} from 'react';
import { Simulate } from 'react-dom/test-utils';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filmeInfo.css'

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"28fc232cc001c31e8a031f419d0a14ca",
                    language:"pt-BR",
                }
            })

            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })

            .catch(()=>{
                navigate("/", {replace: true});
                return;
            })
        }
        loadFilme();

        return()=>{
 
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === Simulate.id)

        if(hasFilme){
            alert("Esse filme já está na sua lista")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    }

    if(loading){
        return(
            <div className="filme-info">
            <h1>Carregando detalhes</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average}/10</strong>
        <div className="area-buttons">
        <button onClick={salvarFilme}> <a>Salvar</a></button>
        <button> <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>Trailer </a></button>
        </div>
        </div>
    )
}

export default Filme;