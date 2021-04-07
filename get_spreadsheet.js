var fs = require('fs')

const { GoogleSpreadsheet } = require('google-spreadsheet')
const {private_key, client_email} = require('./client_secret.json')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet('1KBGHqv3WW5WmbcleGigZEo1dw0ZjtUgFKiiaZDIHOd0')



async function getData() {

    // Authenticate with the Google Spreadsheets API.
    await doc.useServiceAccountAuth({
        private_key,
        client_email
    })
    
    await doc.loadInfo()
    const data = []
    const worksheetList = doc.sheetsByIndex.map(sheet => sheet.title)
    console.log(worksheetList)
    const worksheets = []
    for (const sheet of doc.sheetsByIndex) {
        const rows = await sheet.getRows()
        const title = sheet.title
        const columns = sheet.headerValues
        const data = cleanData(rows, columns)
        worksheets.push({[title]: data})
    }

    
    
    output('middara.json', worksheets)

    function cleanData(rows, headers) {
        const cleanedData = rows.map(row => { 
            const rowObj = {}
            headers.forEach(column => (rowObj[column] = row[column]))
            return rowObj
        })
        return cleanedData
    }

    function output(filename, data) {
        fs.writeFile(filename,JSON.stringify(data),err=>{
            if(err) throw err;
            console.log(`${filename} created.`)
        })
    }


    return data
}

const updateData = getData()

