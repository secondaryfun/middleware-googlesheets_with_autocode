const { GoogleSpreadsheet } = require('google-spreadsheet')
const {private_key, client_email} = require('./client_secret.json')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet('1KBGHqv3WW5WmbcleGigZEo1dw0ZjtUgFKiiaZDIHOd0')

const data = {}

async function getData() {

    // Authenticate with the Google Spreadsheets API.
    await doc.useServiceAccountAuth({
        private_key,
        client_email
    })
    
    await doc.loadInfo()
    
    const shtErrata = doc.sheetsByIndex[0],shtFAQ = doc.sheetsByIndex[1], shtSpoilers = doc.sheetsByIndex[2]
    
    const rowsErrata = await shtErrata.getRows()
    const rowsFAQ = await shtFAQ.getRows()
    const rowsSpoilers = await shtSpoilers.getRows()

    data.Errata.rows = rowsErrata
    data.Errata.headers = shtErrata.headerValues
    data.FAQ.rows = rowsFAQ
    data.FAQ.headers = shtFAQ.headerValues
    data.Spoilers.rows = rowsSpoilers
    data.Spoilers.headers = shtSpoilers.headerValues
    
}

getData()