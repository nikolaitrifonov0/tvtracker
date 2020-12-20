import request from './request.js';

const key = 'd57c009840fb2fde46d325cef8d56af3';
const queriesURL = {
    search: keywords => {
        return `https://api.themoviedb.org/3/search/tv?api_key=${key}&page=1&query=${keywords}&include_adult=true`;
    }  
}

export async function search(keywords) {
    let url = queriesURL.search(keywords);
    return request(url);
}