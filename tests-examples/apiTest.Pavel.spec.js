import { test, request, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5000/api';

const userFirst = {
    "firstName": "Peter",
    "lastName": "Petrov",
    "age": 40,
}

const userSecond = {
    "firstName": "Adam",
    "lastName": "Miller",
    "age": 55,
}
//let userId = '';
//let currentFirstName = '';

test('#1 GET /', async () => {
     const apiRequest = await request.newContext();
    //request
    const response = await apiRequest.get(`${BASE_URL}/`);
    // (BASE_URL + '/')
    const statusCode = response.status();
    // const headersArray = response.headersArray();
    // const contentType = headersArray
    //     .find((header ) => header.name === 'Content-Type')
    //     .value

    //const responseText = await response.text();

    // console.log(response);
    // console.log("__________________________");
    // console.log(await response.text());
    // console.log(statusCode);
    // console.log(headersArray);
    // console.log("contentType = " + contentType)
    // console.log(contentTypeHeader);
    // console.log(contentTypeHeaderValue);
    //
    // console.log(contentLengthHeaderValue);


    //Assert response
    await expect(await response.text()).toEqual("Node Express API Server App")
    await expect(statusCode).toBe(200);
    await expect(response).toBeOK();
    // await expect(actualResult).assertWord.(expected result)
    //  await expect(response.ok()).toBeTruthy();

    // await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    // await expect(contentLengthHeaderValue).toEqual(responseText.length.toString());

})
test(' #2 Get all users', async () => {
    const apiRequest = await request.newContext();
    const response = await apiRequest.get(`${BASE_URL}/users`);

    //await expect(await response.text()).toEqual("There are no users.")
    expect(response.ok()).toBeTruthy();
})
test('#3 Create a new user', async () => {
    const apiRequest = await request.newContext();
    let userId = ''
    const response = await apiRequest.post(`${BASE_URL}/users`, {
        data: userFirst
    });

    const responseJSON = await response.json()
    userId = responseJSON[0].UserID

   // expect(userId.length > 0);
    expect(response.ok()).toBeTruthy();

    //clear data- delete created user
   await apiRequest.delete(`${BASE_URL}/users/${userId}`)

    //console.log("USERID =  " + userID)
    console.log("__________________________");
    //

})







