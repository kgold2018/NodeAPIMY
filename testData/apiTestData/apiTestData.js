export const  BASE_URL = 'http://localhost:5000/api';
export const USERS_ENDPOINT = `${BASE_URL}/users`;
export const expectedTexts =  {
    successfullGetApiHome: "Node Express API Server App",
    unsuccessfullGet: "Cannot GET",
    //successfullGetUsersHomeEmptyDb:"There are no users.",
}

//const headers
export const expectedHeaders = {
    contentTypeValue: {
       applicationJson: "application/json; charset=utf-8",
       textHtml:  "text/html; charset=utf-8",
    },
    contentLengthValue: {
        //successfullGetApiHomeLength: expectedTexts.successfullGetApiHome.length.toString(),//Ira code
        successfullGetApiHome : expectedTexts.successfullGetApiHome.length.toString(),
       successfullGetApiUsersHomeEmptyDb: expectedTexts.successfullGetUsersHomeEmptyDb.length.toString(),

    },
}
export const expectedStatusCodes = {
    _200: 200,
}


export const user = {
    "firstName": "John",
    "lastName": "Doe",
    "age": 35
}

export const expectedResponseObjectsCount =  {
    _1 : 1,
}
export const expected = {
    idLength: 36,
}





