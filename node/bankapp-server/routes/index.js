var express = require('express');
var router = express.Router();
const https = require('https');
const _ = require('lodash');
const FormData = require('form-data');
const zip = require('node-zip')();
var appId = "wfqO2AYhfdblte3PW3LZ";
var appCode = "YAg7VwUeOmV1idPCIZUlIw";
var availCabes = {};

/* GET home page. */
router.get('/getUserDetails', function(req, res, next) {
  var obj = {status:"success", name: "Abhinav", id: "R1001"};
  return res.json(obj);
});

router.post('/getRideDetails', function(req, res, next) {
  var reqId = req.body.reqId;
  var lat = req.body.lat;
  var lng = req.body.lng;


  var exampleDrivers = [
  { name: "Bahubali", location: {lat : 30.73751515346441, lon: 76.77682507934571}, id:"d1", rideType: "N" }
];


var pickup = { lat: lat, lon: lng };

// Routing mode (fastest car route accounting for traffic)
var mode = 'fastest;car;traffic:enabled';

// Extract coordinates from drivers
var starts = exampleDrivers.map((driver) => {
        return { lat: driver.location.lat, lon: driver.location.lon };
      });

var destinations = [ pickup ];

getEtaMatrix(starts, destinations, mode, res)
  .then(function(matrix){
    var eta = matrix[0].eta;
    eta = eta / 60;
    res.send({isArrived: 'n', eta : eta, coords : {lat : 30.73751515346441, lng: 76.77682507934571}});
  })


  
});

router.post('/getRides', function(req, res, next) {
  var lat = req.body.lat;
  var lng = req.body.lng;
   

  var exampleDrivers = [
  { name: "Bahubali", location: { lat: 30.73751515346441, lon: 76.77682507934571 }, id:"d1", rideType: "N" },
  { name: "Krish", location: { lat: 30.73752515346441, lon: 76.77682507934571 }, id:"d2", rideType: "P"},
  { name: "Drona", location: { lat: 30.73753515346441, lon: 76.77682507934571 } , id:"d3", rideType: "N"}
];

var pickup = { lat: lat, lon: lng };

// Routing mode (fastest car route accounting for traffic)
var mode = 'fastest;car;traffic:enabled';

// Extract coordinates from drivers
var starts = exampleDrivers.map((driver) => {
        return { lat: driver.location.lat, lon: driver.location.lon };
      });

// Only one destination
var destinations = [ pickup ];
var rideObj = {'P' : [], 'N' : []};

getEtaMatrix(starts, destinations, mode, res)
  .then(function(matrix){
    for(var i=0;i<matrix.length;i++){
      var eta = matrix[i].eta;
      var id = exampleDrivers[i].id;
      var type = exampleDrivers[i].rideType;
      var obj = rideObj[type];
      obj.push({id: id, eta : eta})
    }
    console.log(rideObj);
    var pObj = rideObj['P'];
    var pEta = 0;
    for(var i=0;i<pObj.length;i++){
      pEta = pEta + pObj[i].eta;
    }
    pEta = Math.round(pEta / pObj.length);

    var nObj = rideObj['N'];
    var nEta = 0;
    for(var i=0;i<nObj.length;i++){
      nEta = nEta + nObj[i].eta;
    }
    nEta = Math.round(nEta / nObj.length);
    nEta = Math.ceil(nEta/60);

    pEta = Math.ceil(pEta/60);

    var ret = {reqId : "r001", rideDetails : [{id: "N",type: 'Normal', fare: 'Rs. 250', time: +nEta}, {id: "P", type: 'Prime', fare: 'Rs. 350', time: +pEta}]};

  	res.send(ret);
  })
  .catch(console.error);

  
  
});

 
module.exports = router;


function buildIsolineRoutingRequestOptions(rangeType, isReverse, location, range, mode) {
  var locationParamKey = isReverse ? 'destination' : 'start';
  var locationParam = {};
  locationParam[locationParamKey] = 'geo!' + location.lat + ',' + location.lon;
  var requestParams = _({
              'rangeType': rangeType,
              'range': range,
              'mode': mode,
              'app_id': appId,
              'app_code': appCode,
            }).assign(locationParam)
              .map((value, key) => {
              return key + '=' + encodeURIComponent(value);
            }).join('&');
  return {
    method: 'GET',
    hostname: 'isoline.route.cit.api.here.com',
    path: ['/routing/7.2/calculateisoline.json', requestParams].join('?')
  };
}

function getReverseIsochrone(location, range, mode) {
  return new Promise((fulfill, reject) => {
    var options = buildIsolineRoutingRequestOptions('time', true, location, range, mode);
    var wkt = "";
    var req = https.request(options, (res) => {
      var data = "";
      res.on('data', (d) => {
        data += d;
      });
      res.on('end', () => {
        if(res.statusCode >= 400) {
          reject(new Error(data));
        }
        else
        {
          var json = JSON.parse(data);
          // If the response contains one or more isolines, convert them to a
          // WKT MULTIPOLYGON
          if(json.response && json.response.isoline) {
            wkt = "MULTIPOLYGON (" + json.response.isoline.map((isoline) => {
              return isoline.component.map((component) => {
                return "((" + component.shape.map((shape) => {
                  // Reverse order of latitude and longitude, WKT expects
                  // them in the format X Y, where X is longitude and Y 
                  // is latitude
                  return shape.split(',').reverse().join(' ');
                }).join(', ') + "))";
              }).join(', ');
            }).join(', ') + ")";
          }
          fulfill(wkt);
        }
      })
    });
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
}

/*
// Coordinates for downtown Berkeley, CA
var downtownBerkeley = { lat: 37.870242, lon: -122.268234 };

// Isochrone range in seconds
var range = 300;

// Routing mode (fastest car route accounting for traffic)
var mode = 'fastest;car;traffic:enabled';


getReverseIsochrone(downtownBerkeley, range, mode)
  .then(console.log)
  .catch(console.error);
*/
  function buildUploadLayerRequestOptions(layerId, form) {
  var requestParams = _({
              'layer_id': layerId,
              'app_id': appId,
              'app_code': appCode,
            }).map((value, key) => {
              return key + '=' + encodeURIComponent(value);
            }).join('&');
  return {
    method: 'POST',
    hostname: 'cle.cit.api.here.com',
    path: ['/2/layers/upload.json', requestParams].join('?'),
    headers: form.getHeaders()
  };
}

function uploadWkt(layerId, wkt) {
  return new Promise((fulfill, reject) => {
    // The Geofencing Extension expects the data as "multipart/form-data" MIME-type, 
    // hence we use the FormData module to append the data
    var form = new FormData();

    // The data must be zipped before uploading to the Geofencing Extension
    // The WKT filename is arbitrary, but must have the .wkt extension
    zip.file('wktUpload.wkt', wkt);
    var data = zip.generate({type: 'base64',compression:'DEFLATE'});
    var buffer = new Buffer(data, 'base64');

    // The file must be appended as 'zipfile'
    form.append('zipfile', buffer, {filename: 'wktUpload.wkt.zip', 
      contentType: 'application/zip'});

    var options = buildUploadLayerRequestOptions(layerId, form);
    var req = https.request(options, (res) => {
      var data = "";
      res.on('data', (d) => {
        data += d;
      });
      res.on('end', () => {
        if(res.statusCode >= 400) {
          reject(new Error(data));
        }
        else
        {
          fulfill();
        }
      })
    });
    form.pipe(req);
    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

/*
var wkt = "ID\tWKT\n1\tMULTIPOLYGON (((-122.2859859 37.8705597, -122.2833252 37.8705597, ... , -122.2859859 37.8705597)))"

// Example layer id
var layer = 1;

uploadWkt(layer, wkt)
  .then(() => { console.log("Uploaded WKT layer") })
  .catch(console.error)
*/
function buildGfeWithCustomLayersRequestOptions(location, layerIds, keyAttributes) {
  var requestParams = _({
              'layer_ids': layerIds.join(','),
              'key_attributes': keyAttributes.join(','),
              'proximity': location.lat + ',' + location.lon,
              'app_id': appId,
              'app_code': appCode,
            }).map((value, key) => {
              return key + '=' + encodeURIComponent(value);
            }).join('&');
  return {
    method: 'GET',
    hostname: 'cle.cit.api.here.com',
    path: ['/2/search/proximity.json', requestParams].join('?')
  };
}

function searchCustomLayers(location, layerIds, keyAttributes) {
  return new Promise((fulfill, reject) => {
    var options = buildGfeWithCustomLayersRequestOptions(location, layerIds, keyAttributes);
    var rows = [];
    var req = https.request(options, (res) => {
      var data = "";
      res.on('data', (d) => {
        data += d;
      });
      res.on('end', () => {
        if(res.statusCode >= 400) {
          reject(new Error(data));
        }
        else
        {
          var json = JSON.parse(data);
          var geometries = json['geometries'];
          if(geometries) {
            rows = geometries.filter((geometry) => {
              return geometry.distance <= 0;
            }).map((geometry) => {
              var keyAttribute;
              // The geometry doesn't necessarily have a layerId object if the
              // request contained only one layer
              if(geometry.layerId) {
                keyAttribute = 
                  keyAttributes[layerIds.indexOf(geometry.layerId)];
              } else {
                keyAttribute = keyAttributes[0];
              }
              return geometry.attributes[keyAttribute];
            });
          }
          fulfill(rows);
        }
      })
    });
    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

/*
// Example driver
var driver = { name: "Bob J.", location: { lat: 37.868943, lon: -122.267870 } };

// Example layer ids
var layerIds = ['ON_DEMAND_DEMO_LAYER'];

// Key attributes for layers
var keyAttributes = [ 'ID' ];

searchCustomLayers(driver.location, layerIds, keyAttributes)
  .then(console.log)
  .catch(console.error);
*/
  function buildEtaMatrixRoutingRequestOptions(starts, destinations, mode) {
  var startParams = _(starts).map((value, index) => {
    var key = 'start' + index;
    var val = 'geo!' + value.lat + ',' + value.lon;
    return [key, val];
  }).fromPairs();
  var destinationParams = _(destinations).map((value, index) => {
    var key = 'destination' + index;
    var val = 'geo!' + value.lat + ',' + value.lon;
    return [key, val];
  }).fromPairs();
  var requestParams = _({
              'mode': mode,
              'summaryAttributes': 'traveltime',
              'app_id': appId,
              'app_code': appCode,
            }).assign(startParams.value())
              .assign(destinationParams.value())
              .map((value, key) => {
              return key + '=' + encodeURIComponent(value);
            }).join('&');
  return {
    method: 'GET',
    hostname: 'matrix.route.cit.api.here.com',
    path: ['/routing/7.2/calculatematrix.json', requestParams].join('?')
  };
}

function getEtaMatrix(starts, destinations, mode, res) {
  return new Promise((fulfill, reject) => {
    var options = buildEtaMatrixRoutingRequestOptions(starts, destinations, mode);
    var etaMatrix = [];
    var req = https.request(options, (res) => {
      var data = "";
      res.on('data', (d) => {
        data += d;
      });
      res.on('end', () => {
        if(res.statusCode >= 400) {
          reject(new Error(data));
        }
        else
        {
          var json = JSON.parse(data);
          if(json.response && json.response.matrixEntry) {
            etaMatrix = json.response.matrixEntry.map((element) => {
              return {startIndex: element.startIndex,
                  destinationIndex: element.destinationIndex, 
                  eta: element.summary.travelTime};
            });
          }
          fulfill(etaMatrix);
        }
      })
    });
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
}

