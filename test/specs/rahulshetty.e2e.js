
describe("rahul shetty training website - Dashboard", () => {
  it("check dashboard url and title", async () => {
        await browser.url("/login");

        await browser.waitUntil(async () => {
            return await browser.getTitle() === "RahulShettyAcademy";
        }, 10000, "Expected title is RahulShettyAcademy");

         console.log(await browser.getTitle())
    })
})