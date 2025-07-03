// backupProjectStructure.js
const fs = require("fs");
const path = require("path");

const OUTPUT_FOLDER = "structure-backups";
const MAX_LINES_PER_FILE = 4000; // Adjust if needed for ChatGPT

const outputLines = [];

function walk(dir, prefix = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach((item, idx) => {
    const isLast = idx === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    outputLines.push(`${prefix}${connector}${item.name}`);

    if (item.isDirectory()) {
      walk(path.join(dir, item.name), prefix + (isLast ? "    " : "│   "));
    }
  });
}

function writeChunks() {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });

  let part = 1;
  for (let i = 0; i < outputLines.length; i += MAX_LINES_PER_FILE) {
    const chunk = outputLines.slice(i, i + MAX_LINES_PER_FILE).join("\n");
    const filePath = path.join(OUTPUT_FOLDER, `project-structure-part${part}.txt`);
    fs.writeFileSync(filePath, chunk, "utf8");
    console.log(`✅ Saved ${filePath}`);
    part++;
  }
}

console.log("📂 Backing up project folder structure...");
walk(".");
writeChunks();
console.log("✅ Done. Structure backups saved in:", OUTPUT_FOLDER);
