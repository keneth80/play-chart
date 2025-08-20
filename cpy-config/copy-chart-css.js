const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, '../public/charts');
const destRoot = path.join(__dirname, '../dist/assets/css');

if (!fs.existsSync(destRoot)) {
  fs.mkdirSync(destRoot, { recursive: true });
}

fs.readdirSync(srcRoot).forEach(dir => {
  const cssPath = path.join(srcRoot, dir, 'style.css');
  if (fs.existsSync(cssPath)) {
    fs.copyFileSync(cssPath, path.join(destRoot, `${dir}.css`));
    console.log(`Copied: ${dir}/style.css -> ${dir}.css`);
  }
});