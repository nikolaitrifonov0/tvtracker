export default async function request(url) {
    let response = await fetch(url);
    let data = response.json();
    
    return data;
}