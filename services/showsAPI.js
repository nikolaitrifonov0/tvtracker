import request from './request.js';

const key = 'd57c009840fb2fde46d325cef8d56af3';
const queriesURL = {
    search: keywords => {
        return `https://api.themoviedb.org/3/search/tv?api_key=${key}&page=1&query=${keywords}&include_adult=true`;
    },
    tv: id => {
        return `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`;
    }  
}

export async function search(keywords) {
    let url = queriesURL.search(keywords);
    let response = await request(url);   
    let formattedResult = await response.results.map(r => {
        let name = `${r.name} (${r['first_air_date'].substring(0, 4)})`;
        return {name: name, id: r.id};
    });
    
    return formattedResult;
}

export async function getTV(id) {
    let url = queriesURL.tv(id);
    let response = await request(url);
    
    let tv = {
        name: response.name,
        overview: response.overview,
        poster: response['poster_path'],
        genres: response.genres.map(g => g.name).join()
    };

    return tv;
}