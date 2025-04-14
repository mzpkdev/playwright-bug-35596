# Playwright Bug-35596
Link to Github issue: https://github.com/microsoft/playwright/issues/35596

## Steps to reproduce
1. Clone my repository reproducing this issue `https://github.com/mzpkdev/playwright-issue`
2. Install Figma desktop app from `https://www.figma.com/downloads/` (or possibly any other chromium-based app)
3. Type `npm install` and run
4. Type  `npm run test` and run
5. You can that while chromium app launches, it timeouts in the code, never reaching the next line of code after `await chromium.launch`

I've put the same logic of launching the chromium app using `puppeteer`, and it's not causing any issues.  
You can try replacing `use_playwright` with `use_puppeteer` to compare and check for yourself.

## Behavior
### Expected behavior
I expect chromium app to launch and the promise of `chromium.launch` resolve successfully

### Actual behavior
I see chromium app launching fine, but the promise of `chromium.launch` doesn't resolve at all, it gets stuck and timeouts after a while

## Additional context
I've been testing this mostly trying to run Figma desktop application, I'm not sure if other chromium apps work fine, but I couldn't make it work with Spotify app too

## Environment
```
  System:
    OS: macOS 15.3.2
    CPU: (12) arm64 Apple M4 Pro
    Memory: 1.13 GB / 24.00 GB
  Binaries:
    Node: 22.14.0 - ~/.nvm/versions/node/v22.14.0/bin/node
    Yarn: 1.22.22 - ~/.nvm/versions/node/v22.14.0/bin/yarn
    npm: 10.9.2 - ~/.nvm/versions/node/v22.14.0/bin/npm
  Languages:
    Bash: 5.2.37 - /opt/homebrew/bin/bash
  npmPackages:
    playwright: 1.51.1 => 1.51.1 
```