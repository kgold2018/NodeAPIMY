import {test, expect} from "@playwright/test"
[
    {tabName: "Add",expected: 'nav-link active'} ,
    {tabName: "Search", expected: 'nav-link'},
    { tabName: "Edit",  expected: 'nav-link'},
    {tabName: "Delete",  expected: 'nav-link'},

].forEach(({tabName,expected  })  => {
    test.describe('Navigation tabs are available', async () => {

        test.beforeEach("Navigate to home page url", async ({page}) => {
            await page.goto('http://localhost:5000/')
        })

        test(`TC-NavBar-1:Verify ${tabName} load correctly and Available`, async ({page}) => {
            test.setTimeout(10000);
            const tab = await page.getByRole('link', {name: `${tabName}`, exact: true});
            const tabClassAttribute = await tab.getAttribute('class')

            await expect(tab).toBeAttached();
            await expect(tab).toHaveCount(1);
            await expect(tab).toBeVisible();
            await expect(tab).toBeEnabled();
            await expect(tabClassAttribute).toStrictEqual(`${expected}`)
        })

    })
})

// test.describe('Navigation tabs are available', async()  => {
//
//     test.beforeEach("Navigate to home page url", async({ page}) =>{
//         await page.goto('http://localhost:5000/')
//
//     })
//
//     test( 'Add tab should be available', async({page })=> {
//         const addTab = await page.getByRole('link',{name:'Add', exact: true});
//         const addTabClassAttribute= await addTab.getAttribute('class')
//
//         await expect(addTab).toBeAttached();
//         await expect(addTab).toHaveCount(1);
//         await expect(addTab).toBeVisible();
//         await expect(addTab).toBeEnabled();
//         await expect(addTabClassAttribute).toStrictEqual('nav-link active')
//
//     })

    // test( 'Search tab should be available', async({page })=> {
    //     const searchTab = await page.getByRole('link',{name:'Search', exact: true});
    //     const searchTabClassAttribute= await searchTab.getAttribute('class')
    //
    //     await expect(searchTab).toBeAttached();
    //     await expect(searchTab).toHaveCount(1);
    //     await expect(searchTab).toBeVisible();
    //     await expect(searchTab).toBeEnabled();
    //     await expect(searchTabClassAttribute).toStrictEqual('nav-link')
    //
    // })




//})