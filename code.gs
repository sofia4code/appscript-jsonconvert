function ImportJSON(url) {
  url= 'https://raw.githubusercontent.com/sofia4code/church-test/main/keys.json';
  return ImportJSONAdvanced(url);
}
function ImportJSONAdvanced(url) {
  var jsondata = UrlFetchApp.fetch(url);
  var object   = JSON.parse(jsondata.getContentText());
  return parseJSONObject_(object.keys);
}
function parseJSONObject_(object) {
  var headers = new Array();
  var data    = new Array();
  
 // get all headers
  for(var i=0; i< object.length; i++){
    for (var key in object[i]){
      if(! headers.includes(key)){
        headers.push(key)
      }
    }
  }
  data[0]=headers;
  return parseData_(headers, data, "", {rowIndex: 1}, object);
  
}
function hasOption_(options, option) {
  return options && options.indexOf(option) >= 0;
}
function parseData_(headers, data, path, state, value) {
  var dataInserted = false;
 
  if (Array.isArray(value) && isObjectArray_(value)) {
    for (var i = 0; i < value.length; i++) {
      let d= []
      for( var j=0; j< headers.length; j++){
        d.push(value[i][headers[j]])
      }
      data[state.rowIndex]=d;
      state.rowIndex++;
    }
    
  }
  console.log(data);
  return data;
}

/** 
 * Parses the headers array and inserts it into the first row of the data array.
 */
function parseHeaders_(headers, data) {
  data[0] = new Array();

  for (key in headers) {
    data[0][headers[key]] = key;
  }
}

/** 
 * Returns true if the given test value is an object; false otherwise.
 */
function isObject_(test) {
  return Object.prototype.toString.call(test) === '[object Object]';
}

/** 
 * Returns true if the given test value is an array containing at least one object; false otherwise.
 */
function isObjectArray_(test) {
  for (var i = 0; i < test.length; i++) {
    if (isObject_(test[i])) {
      return true; 
    }
  }  

  return false;
}

