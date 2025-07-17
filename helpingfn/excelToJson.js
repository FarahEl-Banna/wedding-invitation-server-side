const xlsx = require('xlsx');
const fs = require('fs');

// 1. Read the Excel file
const workbook = xlsx.readFile('./tools/E_Invite.xlsx'); // Replace with your actual file
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 2. Convert to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

//3. Add a side to each row
const processed = jsonData.map((row) => ({
  ...row,
  phone: String(row.phone).replace(/\s+/g, '').replace(/^\+/, ''),
  side: 'B'
}));

console.log(processed)
// 4. Write the JSON data to a file
const outputFilePath = './tools/invites.json';
fs.writeFileSync(outputFilePath, JSON.stringify(processed, null, 2), 'utf8');
