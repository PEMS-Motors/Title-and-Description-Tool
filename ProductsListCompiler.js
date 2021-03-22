var products = {};
var lists_of_entries = [];

function Export() {
  var content = JSON.stringify(products);
  var blob = new Blob([content], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download = 'products.json';
  a.href = url;
  a.textContent = content;
  a.click();
  a.remove();
  console.log('products exported');
}

function Compile() {
  for(let i=0; i<lists_of_entries.length; i++) {
    var list = lists_of_entries[i];
    for(let i=0; i<list.length; i++) {
      MergeEntries(products, list[i]);
    }
  }
  console.log('products compiled');
}

function MergeEntries(dictionary, entry) {
  if(entry.hasOwnProperty('PEMS Number')) {
    let pems_number = entry['PEMS Number'];
    if(!products.hasOwnProperty(pems_number)) products[pems_number] = '';
    products[pems_number] = GetMergedProduct(products[pems_number], entry);
  }
  console.log('entries merged');
}

function LoadFiles() {
  lists_of_entries = [];
  var files = document.getElementById('files').files;
  for(let i=0; i<files.length; i++) {
    if(files.length == 0) return;
    const file = files[i];
    var reader = new FileReader();
    reader.onload = function(e) {
      lists_of_entries.push(JSON.parse(e.target.result));
    }
    reader.readAsText(file);
  }

  for(let i=0; i<lists_of_entries.length; i++) {
    new_entries = lists_of_entries[i];
    for(let ii=0; ii<new_entries.length; i++) {
      let new_entry = new_entries[i];

      if(new_entry.hasOwnProperty('PEMS Number')) {

        let pemsnumber = new_entry['PEMS Number'];

        if(!products.hasOwnProperty(pemsnumber)) products[pemsnumber] = '';

        products[pemsnumber] = GetMergedProduct(products[pemsnumber], new_entry);

      } else {
        //skip if no pems number exists in new entry
      }
    }
  }
  console.log('Files Loaded');
}

function GetProductTemplate() {
  var o = {
    'PEMS Number' : '',
    'Title (PEMS Web)' : '',
    'Description (PEMS Web)' : '',

    'Identification' : {
      'PEMS Number' : '',
      'Catalog Number' : '',
      'Brand' : '',
      'Category' : '',
      'Class' : '',
      'Country of Origin' : '',
      'UPC Number' : '',
      'Units in Package' : ''
    },

    'Specifications' : {
      'Electrical Type' : '',
      'Capacitor' : '',
      'Capacitor Included' : '',
      'Phase' : '',
      'Frame' : '',
      'Motor Diameter (in)' : '',
      'Inlets' : '',
      'HP' : '',
      'Watts' : '',
      'Kilowatts' : '',
      'CFM' : '',
      'Torque' : '',
      'Speeds' : '',
      'Enclosure' : '',
      'Current (amps)' : '',
      'Amps' : '',
      'Voltage' : '',
      'RPM' : '',
      'Rotation (SE)' : '',
      'Frequency (hz)' : '',
      'Bearings (DE/ODE)' : '',
      'C-Dim (in)' : '',
      'Overload Protection' : '',
      'Service Factor' : '',
      'Outlet Flange (in)' : '',
      'Outlet Shape' : '',
      'Material' : '',
      'Efficiency' : ''
    },

    'Dimensions' : {
      'Length (in)' : '',
      'Width (in)' : '',
      'Height (in)' : '',
      'Weight (lb)' : ''
    },

    'Cross Reference' : {
      'Brands' : [],
      'References' : [],
      'Replaces' : [],
      'Fits' : []
    },

    'Applications' : [],
    'Features' : {},
    'Details' : [],
    'Certifications' : [],
    'Warnings' : [],
  };
  return o;
};

function GetMergedProduct(product1, product2) {

  var template = GetProductTemplate();

  attr = 'PEMS Number';
  if(product1.hasOwnProperty(attr)) {
    template[attr] = product1[attr];
  }
  if(product2.hasOwnProperty(attr)) {
    if(product2[attr].length > 0) {
      template[attr] = product2[attr];
    }
  }

  attr = 'Identification';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Specifications';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Dimensions';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Cross Reference';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Replaces';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Fits';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Applications';
  if(product1.hasOwnProperty(attr)) {
    for(let i=0; i<product1[attr].length; i++) {
      val = product1[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let i=0; i<product2[attr].length; i++) {
      val = product2[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }

  attr = 'Features';
  if(product1.hasOwnProperty(attr)) {
    for(let a in product1[attr]) {
      val = product1[attr][a];
      if(val.length > 0) template[attr][a] = product1[attr][a];
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let a in product2[attr]) {
      val = product2[attr][a];
      if(val.length > 0) template[attr][a] = product2[attr][a];
    }
  }

  attr = 'Details';
  if(product1.hasOwnProperty(attr)) {
    for(let i=0; i<product1[attr].length; i++) {
      val = product1[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let i=0; i<product2[attr].length; i++) {
      val = product2[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }

  attr = 'Certifications';
  if(product1.hasOwnProperty(attr)) {
    for(let i=0; i<product1[attr].length; i++) {
      val = product1[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let i=0; i<product2[attr].length; i++) {
      val = product2[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }

  attr = 'Warnings';
  if(product1.hasOwnProperty(attr)) {
    for(let i=0; i<product1[attr].length; i++) {
      val = product1[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }
  if(product2.hasOwnProperty(attr)) {
    for(let i=0; i<product2[attr].length; i++) {
      val = product2[attr][i];
      if(val.length > 0) template[attr].push(val);
    }
  }

  return template;
};
