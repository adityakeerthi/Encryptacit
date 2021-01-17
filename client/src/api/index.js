/**
   * Generates HTTP headers
   */
  const generateHeaders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders
}

/**
   * Returns promise which resolves/rejects when fetch request finishes
   */
  const fetchRequest = (url, requestOptions) => {
    var base = process.env.NODE_ENV === "production" ? "http://localhost:3005" : "http://localhost:3005"
    return new Promise((resolve, reject) => {
        fetch(base + url, requestOptions)
            .then(response => response.text())
            .then(result => {
                return resolve(JSON.parse(result))
            })
            .catch(error => reject(error));
    })
}

/**
   * 
   */

  export const addUser = async (body) => {

    var raw = JSON.stringify(body);


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body:raw,
        redirect: 'follow'
    };

    return fetchRequest(`/auth`, requestOptions)
}

/**
   * 
   */

  export const userExists = async (body) => {

    var raw = JSON.stringify(body);

    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: raw,
        redirect: 'follow',
        
    };

    return fetchRequest(`/auth/exists`, requestOptions)
}

/**
   * 
   */

  export const searchBlockchain = async (Id) => {

    var raw = JSON.stringify({"receipt": Id});


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/search`, requestOptions)
}

/**
   * 
   */

  export const setFirebaseStake = async (Id) => {

    var raw = JSON.stringify({"accountId": Id});


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/stake`, requestOptions)
}

/**
   * 
   */

  export const getUserData = async (Id) => {

    var raw = JSON.stringify({"accountId": Id});


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/metadata`, requestOptions)
}

/**
   * 
   */

  export const getAllTickets = async (Id) => {

    var raw = JSON.stringify({"accountId": Id});


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/retrievetickets`, requestOptions)
}

/**
   * 
   */

  export const createTicket = async (value, accountId, tags, description, contact) => {

    var raw = JSON.stringify({accountId, value, tags, description, contact });


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/ticket`, requestOptions)
}

/**
   * 
   */

  export const voteForTicket = async (value, ticketId, accountId) => {

    var raw = JSON.stringify({accountId, value, ticketId });


    var requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        redirect: 'follow',
        body: raw
    };

    return fetchRequest(`/vote`, requestOptions)
}