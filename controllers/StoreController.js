const fs = require('fs');
const path = require('path');
const User = require('../models').Store;
const haversine = require('haversine-dist');

function persistLog(data){
    const objLog = {
        logArray : []
    }
    
    try{
        if (fs.existsSync(path.resolve(__dirname,'../logs','access.log.json'))){
            const logContent = fs.readFileSync(path.resolve(__dirname,'../logs','access.log.json'),'utf8');
            const logContentJson = JSON.parse(logContent);
            objLog.logArray.push(logContentJson);
            objLog.logArray.push(data);
            fs.writeFileSync(path.resolve(__dirname, '../logs','access.log.json'),JSON.stringify(objLog.logArray),'utf8');
        }else
        objLog.logArray.push(data);
        fs.writeFileSync(path.resolve(__dirname, '../logs','access.log.json'),JSON.stringify(objLog.logArray),'utf8');
        
    }catch(err){
        console.log(err);
    }
}

async function returnCalculatedDistance(latParam,lonParam,latitude,longitude){
    if(typeof(Number.prototype.toRad) === "undefined"){
        Number.prototype.toRad = function(){
          return this * Math.PI / 180;
        }
    }
    const calculatedDistance = await haversine.calculate([parseFloat(latParam), parseFloat(lonParam)], [parseFloat(latitude), parseFloat(longitude)], 'km');
    return calculatedDistance;
}

async function listStores(req,res,next){
    const stores = [];

    const {latitude : latParam,longitude : lonParam} = await req.body;
    
    if(latParam == null || lonParam == null ){
        return res.sendStatus(400);
    }else{
        const response = await User.findAll({attributes : ['County','latitude','longitude']});            
        for(line of response){
            const {County,latitude,longitude} = line;    
            
            if(typeof(Number.prototype.toRad) === "undefined"){
                Number.prototype.toRad = function(){
                  return this * Math.PI / 180;
                }
            }
            
            var distanceCalculated = await returnCalculatedDistance(parseFloat(latParam), parseFloat(lonParam), parseFloat(latitude), parseFloat(longitude));

            const obj = {
                County : County,
                latitude : parseFloat(latitude),
                longitude : parseFloat(longitude),
                distance : distanceCalculated,
            }
            
            if(obj.distance < 7800){
                stores.push(obj);
            }               
        }
        
        const log = {
            timestamp : Date.now(),
            latitude : latParam,
            longitude : lonParam,
            Stores : stores.length
        }
        persistLog(log);
        return res.json(stores.sort((a,b) => (a.distance > b.distance ? 1 : -1)));
    }
    next();      
}

module.exports = {
    returnCalculatedDistance,
    listStores
}