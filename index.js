import puppeteer from "puppeteer"
import { chromium } from "playwright"


async function main() {
    const EXECUTABLE_PATH = "/Applications/Figma.app/Contents/MacOS/Figma"
    // Try replacing `use_playwright` with `use_puppeteer`, puppeteer seems not to have this issue
    // await use_puppeteer(EXECUTABLE_PATH)
    await use_playwright(EXECUTABLE_PATH)
}

const use_puppeteer = async (executablePath) => {
    await puppeteer.launch({
        executablePath,
        args: ["--remote-debugging-port=9222"]
    })
    console.log("This code is always being reached")
}

const use_playwright = async (executablePath) => {
    await chromium.launch({
        executablePath,
        // Try commenting out the line below, this seems to be causing the issue
        args: ["--remote-debugging-port=9222"]
    })
    console.log("This code is never being reached")
}


main()
    .catch(console.error.bind(console))