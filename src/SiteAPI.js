//This is the script that links to the API managed by this site
export const SITE_API =
{
    PATH: "https://mercury.swin.edu.au/cos30043/s102661522/the-movie-app/resources/",
    USER_PATH: "api_user.php/",
    LIKE_MOVIES_PATH: "api_liked_movies.php/",
    POLLS_PATH: "api_polls.php/",
    POLL_VOTES_PATH: 'api_poll_votes.php/'
}

//User API Methods
//Get a user by username
export async function GetUser(username) {
    let url = SITE_API.PATH + SITE_API.USER_PATH + 'username/' + username;
    return await fetch(url).then(response => { return response.json(); })
}

//Post a new User to API
export async function PostRegister(newUser) {
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
export async function PostLikeDislikeMovie(newRating) {
    let url = SITE_API.PATH + SITE_API.LIKE_MOVIES_PATH;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRating)
    };
    return await DeletePastLikeDislikeMovie(newRating.UserID, newRating.MovieID).then(() => { return fetch(url, requestOptions).then(response => { return response.json(); }) });
}

//Delete a Movie Like/Dislike
async function DeletePastLikeDislikeMovie(userid, movieid) {
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
export async function GetLikeDislikedMovies(userid) {
    let url = SITE_API.PATH + SITE_API.LIKE_MOVIES_PATH + "UserID/" + userid;
    return fetch(url).then(response => { return response.json(); });
}

//Poll API Methods
export async function GetPolls() {
    let url = SITE_API.PATH + SITE_API.POLLS_PATH;
    return await fetch(url).then(response => { return response.json(); })
}

//Deletes a poll
export async function DeletePoll(pollID) {
    let url = SITE_API.PATH + SITE_API.POLLS_PATH + "PollID/" + pollID;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                PollID: pollID
            })
    };
    return await DeleteAllVotesOnPoll(pollID).then(() => { return fetch(url, requestOptions).then(response => { return response.json(); }) });
}

//Posts a poll
export async function PostPoll(poll) {
    let url = SITE_API.PATH + SITE_API.POLLS_PATH;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(poll)
    };
    return await fetch(url, requestOptions);
}

//Put a poll AKA update poll
export async function PutPoll(poll, pollID) {
    let url = SITE_API.PATH + SITE_API.POLLS_PATH + "PollID/" + pollID;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(poll)
    };
    return await fetch(url, requestOptions);
}


//Vote on Poll API Methods

//Get All votes
export async function GetVotes(PollID) {
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH + "PollID/" + PollID;
    return await fetch(url).then(response => { return response.json(); })
}

//Deletes all votes on a poll, used for when deleting a whole poll as it is a foriegn key restraint to do so
async function DeleteAllVotesOnPoll(pollID) {
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                PollID: pollID
            })
    };
    return await fetch(url, requestOptions).then(response => { return response.json(); });
}

//Deletes past vote
async function DeletePastVote(pollID, userID) {
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

//Posts vote to API after deleting potential prior one
export async function PostVote(newVote) {
    let url = SITE_API.PATH + SITE_API.POLL_VOTES_PATH;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVote)
    };
    return await DeletePastVote(newVote.PollID, newVote.UserID).then(() => { return fetch(url, requestOptions).then(response => { return response.json(); }) });
}