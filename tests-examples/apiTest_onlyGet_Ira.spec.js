import { test, request, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:5000';

test('GET /', async() => {
//context
    const apiRequest = await request.newContext();

    //request
    const response = await apiRequest.get(`${BASE_URL}/`)
    const statusCode = response.status();
    const headersArray = response.headersArray();
    const contentTypeHeader = headersArray.find(
        (header) => header.name === 'Content-Type')
    const contentTypeHeaderValue = contentTypeHeader.value
    const contentLengthHeaderValue = headersArray
        .find((header) => header.name === 'Content-Length')
        .value;
    const responseText = await response.text()

    console.log(response)
    console.log("________________________")
    console.log(await response.text())
    console.log(statusCode)
    console.log(headersArray)
    console.log(contentTypeHeader);
    console.log(contentTypeHeaderValue)
    console.log(contentLengthHeaderValue)

//Assert response
//await expect(actualResult).assertword.(expected result)

    await expect(statusCode).toBe(200)
    await expect(response).toBeOK();
    await expect(response.ok).toBeTruthy();
    await expect(responseText).toEqual("Node Express API Server")
    await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    await expect(contentLengthHeaderValue).toEqual(responseText.length.toString())
})