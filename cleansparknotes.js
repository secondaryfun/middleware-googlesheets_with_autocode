var fs = require('fs')

const data = require('./middara.json')
const cleaned = sortSparknotes(data[2].Sparknotes)


writeOut('middara1.json', cleaned)
testData(cleaned)

function sortSparknotes(sparknotes) {
    sparknotes = sparknotes.sort((a, b) => (a.ORDER - b.ORDER))
    sparknotes = sparknotes.sort((a, b) => (a.SUBCHAPTER - b.SUBCHAPTER))
    sparknotes = sparknotes.sort((a, b) => (a.CHAPTER - b.CHAPTER))
    const output = []
    for(i=1;i<6;i++) {
        output.push({
            chapter: i,
            content: []
        })
    } 

    sparknotes.forEach(i => {
        const chapter = parseInt(i.CHAPTER) - 1
        const subchapterNum = i.SUBCHAPTER
        let subChptr = output[chapter].content.find(o => o.subchapter === subchapterNum)

        if (!subChptr) {  
            subChptr = {subchapter: i.SUBCHAPTER, content: [], title: i.TITLE}
            output[chapter].content.push(subChptr)	
        
        } 
        else {
        }
        let itemCheck = subChptr.content.find(o => parseInt(o.ORDER) === i.ORDER)
        if (i.ORDER > 1 && !itemCheck) {
            subChptr.content.push({
                order: i.ORDER,
                listItem: `<li>${i.CONTENT}<li>`
            })
        }
    })

    output.forEach(chapter => {
        chapter.content.sort((a, b) => (a.subchapter - b.subchapter))
        chapter.content.forEach(subC => {
            subC.content.sort((a, b) => (a.order - b.order))
        })
    })

    return output
}

function testData(data) {
    data.forEach(chapter => {
        chapter.content.forEach(subchap => {
            let orders = 0
            subchap.content.forEach(i => orders++)
            console.log(`chapter: ${chapter.chapter}, subchap ${subchap.subchapter} = ${orders} orders`)
        })
    })
}

function writeOut(filename, data) {
    fs.writeFile(filename,JSON.stringify(data),err=>{
        if(err) throw err;
        console.log(`${filename} created.`)
    })
}