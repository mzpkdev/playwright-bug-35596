import { spawn } from "child_process"
import puppeteer from "puppeteer"
import { chromium } from "playwright"


async function main() {
    const EXECUTABLE_PATH = "/Applications/Figma.app/Contents/MacOS/Figma"
    // Try replacing `use_playwright_launch` with `use_puppeteer_launch`, puppeteer seems not to have this issue
    // await use_puppeteer_launch(EXECUTABLE_PATH)
    // await use_playwright_launch(EXECUTABLE_PATH)
    await use_playwright_connectOverCDP(EXECUTABLE_PATH)
}

const use_puppeteer_launch = async (executablePath) => {
    await puppeteer.launch({
        executablePath,
        args: ["--remote-debugging-port=9222"]
    })
    console.log("This code is always being reached")
}

const use_playwright_launch = async (executablePath) => {
    await chromium.launch({
        executablePath,
        // Try commenting out the line below, this seems to be causing the issue
        args: ["--remote-debugging-port=9222"]
    })
    console.log("This code is never being reached")
}

const use_playwright_connectOverCDP = async (executablePath) => {
    await spawn(executablePath, ["--remote-debugging-port=9222"])
    await sleep(3000)
    const status = await fetch("http://localhost:9222/json/version")
        .then(response => response.json())
    console.log("Port 9222 status: ", status)
    await chromium.connectOverCDP("http://localhost:9222")
    console.log("This code is never being reached")
}

const sleep = time =>
    new Promise(resolve => setTimeout(resolve, time));


main()
    .catch(console.error.bind(console))