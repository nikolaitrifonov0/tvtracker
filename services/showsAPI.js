import request from './request.js';

const key = 'd57c009840fb2fde46d325cef8d56af3';
const queriesURL = {
    search: keywords => {
        return `https://api.themoviedb.org/3/search/tv?api_key=${key}&page=1&query=${keywords}&include_adult=true`;
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