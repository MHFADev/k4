#!/usr/bin/env node
// Build K4 app into a single downloadable HTML file
// Run: node build-download.js

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const landingDir = path.join(__dirname, 'landing-page');

// Read app files
const appHTML = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');
const appJS = fs.readFileSync(path.join(appDir, 'js', 'app.js'), 'utf8');
const logoSVG = fs.readFileSync(path.join(__dirname, 'assets', 'logo.svg'), 'utf8');

// Inline the JS into the HTML
let bundled = appHTML;

// Replace <script src="js/app.js"></script> with inline script
bundled = bundled.replace(
    /<script\s+src=["']js\/app\.js["']\s*><\/script>/,
    `<script>\n${appJS}\n</script>`
);

// Replace logo SVG reference with inline data URI
const logoDataUri = 'data:image/svg+xml;base64,' + Buffer.from(logoSVG).toString('base64');
bundled = bundled.replace(/href="\.\.\/assets\/logo\.svg"/g, `href="${logoDataUri}"`);
bundled = bundled.replace(/src="\.\.\/assets\/logo\.svg"/g, `src="${logoDataUri}"`);

// Remove manifest link (won't work offline as standalone)
bundled = bundled.replace(/<link\s+rel="manifest"\s+href="manifest\.json"\s*\/?>/g, '');

// Remove apple-touch-icon reference (won't work as standalone)
bundled = bundled.replace(/<link\s+rel="apple-touch-icon"\s+href="[^"]*"\s*\/?>/g, '');

// Write the bundled file to landing-page public folder
const outputPath = path.join(landingDir, 'k4-app.html');
fs.writeFileSync(outputPath, bundled, 'utf8');

const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
console.log(`✅ Built k4-app.html (${sizeKB} KB) → ${outputPath}`);
