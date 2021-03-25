# Connect Googlesheets API 

## To Run
1. npm run start

## Installation
1. Go to the Google APIs Console.
2. Create a new project.
3. Click Enable API. Search for and enable the Google Drive API.
4. Create credentials for a Web Server to access Application Data.
5. Name the service account and grant it a Project Role of Editor.
6. Download the JSON file.
7. Copy the JSON file to your code directory and rename it to client_secret.json
8. Find the client_email inside client_secret.json. Back in your spreadsheet, click the Share button in the top right, and paste the client email into the People field to give it edit rights. Hit Send.

# Read Data from a Spreadsheet with Node.js

Now from your code directory, you’ll need to install the Google Spreadsheet package with the following terminal command:

```
npm install google-spreadsheet
```

Then copy and paste the following code into a file called spreadsheet.js:

```
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');


// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('*spreadsheet ID*');


// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {


  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});
```
Don’t forget to replace the spreadsheet ID in that code with your own spreadsheet’s ID. The spreadsheet ID is the long key in the URL of the spreadsheet when you view it. For example, mine was 1tO3BDTA0Ix1dIj7JayA0nrX3wmh4PN7l8139Il11aK8.

Run the code with the following command to see a bunch of data from your spreadsheet printed to the console:

```
node spreadsheet.js
```
Insert, Update, and Delete from a Spreadsheet with Node


We’ve only scratched the surface of this library’s documented and comprehensive functionality.

For instance, given a reference to the rows array you had in the innermost function of the current code, you can delete a row from the spreadsheet:

```
rows[0].del() // this is asynchronous
```

And find out the total number of rows:

```
console.log(rows.length);
```

You can also insert a new row in the spreadsheet, if you want to pretend that I am a United States legislator:

```
doc.addRow(1, { last_name: 'Agnew', first_name: 'Samuel' }, function(err) {
  if(err) {
    console.log(err);
  }
});
```
Check the API reference for the full details on these functions along with a few dozen others.
Using Google Spreadsheets with Node.js opens possibilities like building an Express app with a spreadsheet as the persistence layer. But you’ve probably got even better ideas than that.

## References
* https://github.com/theoephraim/node-google-spreadsheet#api
* https://www.npmjs.com/package/google-spreadsheet
* https://theoephraim.github.io/node-google-spreadsheet/#/