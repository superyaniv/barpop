const puppeteer = require('puppeteer')

async function run(){
    // First, we must launch a browser instance
    const browser = await puppeteer.launch({
        // Headless option allows us to disable visible GUI, so the browser runs in the "background"
        // for development lets keep this to true so we can see what's going on but in
        // on a server we must set this to true
        headless: false,
        // This setting allows us to scrape non-https websites easier
        ignoreHTTPSErrors: true,
    })
    // then we need to start a browser tab
    let page = await browser.newPage();
    // and tell it to go to some URL
    await page.goto('https://www.google.com/maps/place/Sports+Break/@34.2078003,-82.1775986,17z/data=!4m5!3m4!1s0x0:0xd203e59752da241b!8m2!3d34.2078164!4d-82.1776262', {
        waitUntil: 'domcontentloaded',
    });
    // print html content of the website
    console.log(await page.content());
    // close everything
    await page.close();
    await browser.close();
}

run();