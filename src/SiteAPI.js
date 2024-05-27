//This is the script that links to the API managed by this site
export const SITE_API = 
{
   // PATH: "@/resources/",
    PATH: "http://192.168.0.183:8080/6.2%20D%20HD/the-movie-app/src/resources/",
    USER_PATH: "api_user.php/",
    LIKE_MOVIES_PATH: "api_liked_movies.php/",
    POLLS_PATH: "api_polls.php/",
    POLL_VOTES_PATH: 'api_poll_votes.php/'
} 

//User API Methods
//Get a user by username
export async function GetUser(username)
{
    let url = SITE_API.PATH + SITE_API.USER_PATH + 'username/' + username;
    return await fetch(url).then(response => { return response.json();})
}

//Post a new User to API
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

//Like / Dislike Movie Methods
export async function PostLikeDislikeMovie(newRating)
{
    let url = SITE_API.PATH + SITE_API.LIKE_MOVIES_PATH;
    const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRating)
        };
    return await DeletePastLikeDislikeMovie(newRating.UserID, newRating.MovieID).then( () =>
    { return fetch(url, requestOptions).then(response => { return response.json(); }) });
}

//Delete a Movie Like/Dislike
async function DeletePastLikeDislikeMovie(userid, movieid)
{
    let url = SITE_API.PATH + SITE_API.LIKE_MOVIES_PATH + userid + "/" + movieid;
    const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    UserID: userid,
                    MovieID: movieid
                })
        };
    return await fetch(url, requestOptions).then(response => { return response.json(); });
}

//get the movies liked and disliked by a User ID
export async function GetLikeDislikedMovies(userid)
{
    let url = SITE_API.PATH + SITE_API.LIKE_MOVIES_PATH + "UserID/" + userid;
    return fetch(url).then(response => { return response.json(); });
}

//Poll API Methods
export async function GetPolls()
{
    let url = SITE_API.PATH + SITE_API.POLLS_PATH;
    return await fetch(url).then(response => { return response.json();})
}

//Vote on Poll API Methods

export async function GetVotes(PollID)
{
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH  + "PollID/" + PollID;
    return await fetch(url).then(response => { return response.json();})
}

async function DeletePastVote(pollID, userID)
{
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH;
    const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    PollID: pollID,
                    UserID: userID
                })
        };
    return await fetch(url, requestOptions).then(response => { return response.json(); });
}

export async function PostVote(newVote)
{
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH;
    const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVote)
        };
    return await DeletePastVote(newVote.PollID, newVote.UserID).then( () =>
    { return fetch(url, requestOptions).then(response => { return response.json(); }) });
}