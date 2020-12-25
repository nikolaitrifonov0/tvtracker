import request from './request.js';

const databaseLink = 'https://tvtracker-c555d-default-rtdb.firebaseio.com/users';

export async function addShowToUser(email, showId) {     
    let user = await getUserFromDB(email);    

    if (!user.data.shows) {
        user.data.shows = [];
    }

    user.data.shows.push(showId);

    console.log(user.data);

    await request(databaseLink + `/${user.id}.json`, 'put', user.data);
}

export async function addUserToDB(email) {
    await request(databaseLink + '.json', 'post', {email});
}

async function getUserFromDB(email) {
    let result = await request(databaseLink + '.json');
    let keys = Object.keys(result);
    let userKey = keys.find(k => result[k].email === email); 
    let user = result[userKey]; 
    return {id: userKey, data: user};
    
}