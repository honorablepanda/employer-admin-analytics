// backupProjectCode.js
const fs = require("fs");
const path = require("path");

const OUTPUT_FOLDER = "code-backups";
const MAX_CHARACTERS_PER_FILE = 500000; // ~500KB target size per file

const ALLOWED_EXTENSIONS = [".js", ".jsx", ".json", ".html", ".css", ".ts", ".tsx", ".txt", ".md"];

let bundles = [];
let currentBundle = "";
let bundleIndex = 1;

function collectFiles(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach((item) => {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      collectFiles(fullPath);
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        const code = fs.readFileSync(fullPath, "utf8");

        const entry = `File name: ${path.relative(".", fullPath)}\n\nCode:\n${code}\n\n---\n\n`;

        if (currentBundle.length + entry.length > MAX_CHARACTERS_PER_FILE) {
          bundles.push(currentBundle);
          currentBundle = "";
        }

        currentBundle += entry;
      }
    }
  });
}

function writeBundles() {
  if (currentBundle) bundles.push(currentBundle);
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });

  bundles.forEach((content, i) => {
    const filePath = path.join(OUTPUT_FOLDER, `code-bundle-${i + 1}.txt`);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Saved ${filePath}`);
  });
}

console.log("📦 Backing up project code files...");
collectFiles(".");
writeBundles();
console.log("✅ Done. Code backups saved in:", OUTPUT_FOLDER);
