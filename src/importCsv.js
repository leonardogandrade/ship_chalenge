const csv = require('csv-parser');
const fs = require('fs');
const Store = require('../models').Store;
const path = require('path');

function input(){
    if(process.argv[2] == null){
        console.log("syntax: node [path]/imputCsv.js [file_to_import]")
        process.exit(0);
    }
    return process.argv[2];   
}

const file = input();

fs.createReadStream(path.resolve(__dirname,'../', `${file}`))
  .pipe(csv())
  .on('data', (row) => {
    try{
        const location = row['Location'].toString()
            .replace(/[']/g,'\"')
            .replace(/False/g,'\"false\"')
            .replace(/\"{\"/g,'\"')
            .replace(/\"}\"/g,'\"')
            .replace(/[{}]/g,'')
            .replace(/\"human_address\":/g,'');
            const obj = JSON.parse(
                `{"County" : "${row['County']}", 
                "License_Number" : "${row['License Number']}",
                "Operation_Type" : "${row['Operation Type']}",
                "Establishment_Type" : "${row['Establishment Type']}",
                "Entity_Name" : "${row['Entity Name']}",
                "DBA_Name" : "${row['DBA Name']}",
                "Street_Number" : "${row['Street Number']}",
                "Street_Name" : "${row['Street Name']}",
                "Address_Line_2" : "${row['Address Line 2']}",
                "Address_Line_3" : "${row['Address Line 3']}",
                "City" : "${row['City']}",
                "State" : "${row['State']}",
                "Zip_Code" : "${row['Zip Code']}",
                "Square_Footage" : "${row['Square Footage']}",
                "longitude" : "${row['longitude']}",
                "needs_recoding" : "${row['needs_recoding']}",
                "human_address" : "${row['human_address']}",
                "address" : "${row['address']}",
                "city_2" : "${row['city']}",
                "state_2" : "${row['state']}",
                "zip" : "${row['zip']}",
                "latitude" : "${row['latitude']}",
            ${location}}`)
            
            Store.create(obj);

            console.log(obj);
    }catch(err){
        console.log(`do not found Location column. ${err}`)
    }  
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });