import request from './request.js';

const databaseLink = 'https://tvtracker-c555d-default-rtdb.firebaseio.com/users';

export async function addShowToUser(email, showId) {     
    let user = await getUserFromDB(email);    
    
    if (!user.data.shows) {
        user.data.shows = [];
    }

    user.data.shows.push(showId);
}

export async function addUserToDB(email) {
    await request(databaseLink + '.json', 'post', {email});
}

async function getUserFromDB(email) {
    await request(databaseLink + '.json')
    .then(result => {
        let entries = Object.entries(result);
        let user = entries.find((k, v) => v.email === email);
        
        return {id: user[0], data: user[1]};
    });
}