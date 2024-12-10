const fs = require('fs');
const path = require('path');

function readDirRecursive(directory) {
    const files = fs.readdirSync(directory);
    let result = [];
    files.forEach((file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            result.push(filePath);
            result = result.concat(readDirRecursive(filePath)); // Recursive call to handle subdirectories
        }
    });
    return result;
}

const folderStructure = readDirRecursive('./');
const formattedStructure = folderStructure.map((dir) => dir.replace(__dirname, ''));

fs.writeFileSync('folder_structure.txt', formattedStructure.join('\n'));
console.log('Folder structure saved to folder_structure.txt');
