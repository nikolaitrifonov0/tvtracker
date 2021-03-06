import request from './request.js';

const databaseLink = 'https://tvtracker-c555d-default-rtdb.firebaseio.com/users';

export async function addShowToUser(email, showId) {     
    let user = await getUserFromDB(email);    

    if (!user.data.shows) {
        user.data.shows = [];
    }

    let show = {id: showId, status: 'watching', currentEpisode:0};
    user.data.shows.push(show);

    await request(databaseLink + `/${user.id}.json`, 'put', user.data);
}

export async function addUserToDB(email) {
    await request(databaseLink + '.json', 'post', {email});
}

export async function isWatching(email, showId) {
    let user = await getUserFromDB(email);
    
    if (user.data.shows && user.data.shows.some(s => s.id == showId)) { 
        return true;
    }
    return false;
}

async function getUserFromDB(email) {
    let result = await request(databaseLink + '.json');
    let keys = Object.keys(result);
    let userKey = keys.find(k => result[k].email === email); 
    let user = result[userKey]; 
    return {id: userKey, data: user};    
}

export async function getCurrentUserShows(email) {
    let user = await getUserFromDB(email);
    let shows = user.data.shows ? user.data.shows.map(s => s.id) : [];
    
    return shows;
}

export async function addEpisode(email, showId, numberOfEpisodes) {
    let user = await getUserFromDB(email);
    let show = await user.data.shows.find(s => s.id == showId);

    if (show.status == 'watching') {
        show.currentEpisode++;
        
        if (show.currentEpisode == numberOfEpisodes) {
            show.status = 'completed';
        }

        await request(databaseLink + `/${user.id}.json`, 'put', user.data);
    }
}

export async function getCurrentEpisode(email, showId) {
    let user = await getUserFromDB(email);
    let show = await user.data.shows.find(s => s.id == showId);

    return show.currentEpisode;
}

export async function getStatus(email, showId) {
    let user = await getUserFromDB(email);
    let show = await user.data.shows.find(s => s.id == showId);

    return show.status;
}