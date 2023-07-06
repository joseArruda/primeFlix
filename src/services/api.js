import axios from 'axios';

//Base da URL:https://api.themoviedb.org/3/
//Url da api: https://api.themoviedb.org/3/movie/now_playing?api_key=0dd7c71844958c058174ebf09dfd62a4&language=Pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;