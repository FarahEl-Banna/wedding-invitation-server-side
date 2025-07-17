const fs = require('fs');
const xlsx = require('xlsx');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./tools/invites.json', 'utf-8'));

// Create a new workbook and add the JSON data as a worksheet
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(wb, ws, 'E-Invites');

// Save the Excel file
xlsx.writeFile(wb, './E-invites.xlsx');

console.log('✅ Excel file created: invitees.xlsx');