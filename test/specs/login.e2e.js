describe("rahul shetty training website - Login Page", () => {
  it("check login page url and title", async () => {
        await browser.url("/loginpagePractise/#")

        await browser.waitUntil(async () => {
            return await browser.getTitle() === "LoginPage Practise | Rahul Shetty Academy";
        }, 10000, "Expected title is LoginPage");

         console.log(await browser.getTitle())
    })
})
