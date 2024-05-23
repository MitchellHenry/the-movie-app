//This is the script that links to the API managed by this site
export const SITE_API = 
{
   // PATH: "@/resources/",
    PATH: "http://192.168.0.183:8080/6.2%20D%20HD/the-movie-app/src/resources/",
    USER_PATH: "api_user.php/",
} 

//User API Methods
export async function GetUser(username)
{
    let url = SITE_API.PATH + SITE_API.USER_PATH + 'username/' + username;
    return await fetch(url).then(response => { return response.json();})
}

export async function PostRegister(newUser)
{
    let url = SITE_API.PATH + SITE_API.USER_PATH;
    const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        };
    return fetch(url, requestOptions).then(response => { return response.json(); });
}