import { test, request, expect } from '@playwright/test';
import * as testData from '../testData/apiTestData/apiTestData.js';
import * as utils from '../utils/apiUtils/apiTestUtils.js';
import * as preconditions from '../utils/preconditions.js';
import {getContentTypeHeaderValue} from "../utils/apiUtils/apiTestUtils.js";
import {expectedStatusCodes, USERS_ENDPOINT} from "../testData/apiTestData/apiTestData.js";


const BASE_URL = 'http://localhost:5000/api';

let apiRequest;

test.beforeEach(async() => {
    //apiRequest = await utils.createNewContext()
    apiRequest = await request.newContext();
})

test.afterEach(async() => {
    await apiRequest.dispose();
})

test('GET /', async () => {
    // content
    // const apiRequest = await request.newContext();

//request
    const response = await apiRequest.get(`${BASE_URL}/`);
    const statusCode = response.status();
    const headersArray = response.headersArray();
    const contentTypeHeader = headersArray.find(
        (header) => header.name === 'Content-Type');
    const contentTypeHeaderValue = contentTypeHeader.value;
    const contentLengthHeaderValue = headersArray
        .find((header) => header.name === 'Content-Length')
        .value;
    const responseText = await response.text();


    console.log(response);
    console.log('---------------------------------------------')
    console.log(await response.text());
    console.log(statusCode);
    console.log(headersArray);
    console.log(contentTypeHeader);
    console.log(contentTypeHeaderValue);
    console.log(contentLengthHeaderValue);

    //Assert response

    // await expect(actualResult).assertWord.(expected result)
    await expect(statusCode).toBe(200);
    await expect(response).toBeOK();
    await expect(response.ok()).toBeTruthy();

    await expect(responseText).toEqual("Node Express API Server App");

    await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    await expect(contentLengthHeaderValue).toEqual(responseText.length.toString());

})

// one more test GET with utils
test('GET / with utils', async () => {

//request
    const response = await apiRequest.get(`${testData.BASE_URL}/`) //act

    const statusCode = utils.getResponseStatus(response)
    await expect(statusCode).toBe(testData.expectedStatusCodes._200)

    // await expect(statusCode).toBe(200);
    // await expect(response).toBeOK();
    // await expect(response.ok()).toBeTruthy();
    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response)
    const contentLengthHeaderValue =utils.getContentLengthHeaderValue(response)
    const responseText = await utils.getResponseText(response)

    //const headersArray = response.headersArray();
    // const contentTypeHeader = headersArray.find(
    //     (header) => header.name === 'Content-Type');
    // const contentTypeHeaderValue = contentTypeHeader.value ;
    // const contentLengthHeaderValue = headersArray
    //     .find((header) => header.name === "Content-Length")
    //     .value ;
    // const responseText = await response.text();



    //Assert response
    //await expect(actualResult).assertWord.(expected result)
    await expect(responseText).toEqual(testData.expectedTexts.successfullGetApiHome);
    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.textHtml)
    await expect(contentLengthHeaderValue).toEqual(testData.expectedHeaders.contentLengthValue.successfullGetApiHome);

    // await expect(responseText).toEqual("Node Express API Server App");
   // await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    //await expect(contentLengthHeaderValue).toEqual(responseText.length.toString());
})



//AAA Pattern test

test('GET /users/ empty DB message', async () => {

//precondition
   await preconditions.setPrecondition_DeleteUsers(apiRequest)

    const response = await apiRequest.get(`${testData.USERS_ENDPOINT}/`)

    const statusCode = utils.getResponseStatus(response)

    await expect(statusCode).toBe(testData.expectedStatusCodes._200)

//headers
    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response)
    const responseText = await utils.getResponseText(response)
    const contentLengthValue = await responseText.length

    // await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.textHtml);
    // await expect(contentLengthValue).toBe(testData.expectedHeaders.contentLengthValue.successfullGetApiUsersHomeEmptyDb)
    // await expect(responseText).toBe(testData.expectedTexts.successfullGetUsersHomeEmptyDb);

    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.textHtml);
    await expect(contentLengthValue).toBe(testData.expectedHeaders.contentLengthValue.successfullGetApiUsersHomeEmptyDb);
    await expect(responseText).toBe(testData.expectedTexts.successfullGetUsersHomeEmptyDb);


})

//test with utils and testData
 test('GET /users/ response testData', async() => {
       // const expectedContentTypeHeaderValue = "application/json; charset=utf-8";
       // const expectedResponseStatusCode = 200;
       // const expectedIdLength = 36;
       // const expectedResponseObjectsCount = 1;
       //   const userData = {
       //      "firstName": "John",
       //      "lastName": "Doe",
       //       "age": 35


   // const apiRequest = await request.newContext();

    // precondition
    await preconditions.setPrecondition_DeleteUsers_CreateUser(apiRequest);
   //  await expect(
   //      //await apiRequest.delete(  `${BASE_URL}/users/`)
   //      await apiRequest.delete(`${testData.USERS_ENDPOINT}/`)
   //      ).toBeOK();
   //  await expect(
   //      await apiRequest.post(
   //          `${testData.USERS_ENDPOINT}/`,{
   //         // `${BASE_URL}/users/`, {
   //              data: testData.user,
   //          })
   //        ).toBeOK();

//main request
    //const response = await apiRequest.get(`${BASE_URL}/users/`)
     const response = await apiRequest.get(`${testData.USERS_ENDPOINT}/`)

 //get actual status
       const statusCode = response.status()
     //const statusCode = utils.getResponseStatus(response);

 //assert status IS OK
     await expect(response).toBeOK();
     await expect(statusCode).toBe(testData.expectedStatusCodes._200)

//get actual result
     const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response);
         // response
         //     .headersArray()
         //     .find((header) => header.name === 'Content-Type')
         //     .value;

     //const responseBody = await response.json()
     const responseBody = await utils.getResponseBody(response);
     const isArray = await Array.isArray(responseBody)

//assert actual result
    // await expect(contentTypeHeaderValue).toBe(expectedContentTypeHeaderValue);//moved to TestData
     await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.applicationJson);
     await expect(isArray).toBeTruthy();
     await expect(isArray).toBe(true);
     await expect(responseBody).toHaveLength(testData.expectedResponseObjectsCount._1);
     await expect(responseBody[0].firstName).toBe(testData.user.firstName);
     await expect(responseBody[0].lastName).toBe(testData.user.lastName);
     await expect(responseBody[0].age).toBe(testData.user.age);
     await expect(responseBody[0].id.length).toBe(testData.expected.idLength);

    // await apiRequest.dispose();
})




