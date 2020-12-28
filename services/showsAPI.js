import request from './request.js';

const key = 'd57c009840fb2fde46d325cef8d56af3';
const queriesURL = {
    search: keywords =>`https://api.themoviedb.org/3/search/tv?api_key=${key}&page=1&query=${keywords}&include_adult=true`,
    tv: id => `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`,
    detailsPoster: path =>  'https://image.tmdb.org/t/p/w342' + path,
    homeCardPoster: path => 'https://image.tmdb.org/t/p/w154' + path,
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

export async function getTVDetails(id) {
    let url = queriesURL.tv(id);
    let response = await request(url);
    
    let tv = {
        name: response.name,
        overview: response.overview,
        poster: queriesURL.detailsPoster(response['poster_path']),
        genres: response.genres.map(g => g.name).join(),
        id: response.id
    };

    return tv;
}

export async function getCurrentUserShowsData(ids) {  
    let shows = []; 
       
    for (const i of ids) {
        let tv = await getTVHomeCard(i);
        shows.push(tv);  
    }   
    
    return shows;
}

async function getTVHomeCard(id) {
    let url = queriesURL.tv(id);
    let response = await request(url);

    let tv = {
        numberOfEpisodes: response['number_of_episodes'],
        poster: queriesURL.homeCardPoster(response['poster_path'])
    };
    return tv;
}