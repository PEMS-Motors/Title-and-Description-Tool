var css_pems = 'https://alovitt.github.io/PEMS-Description-Stylesheet/pemsatl_ver0.004.css';

var DescriptionBuilder_PEMS = {
  LoadFile: function () {
    let files = document.getElementById('files').files;
    const file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      products = JSON.parse(e.target.result);
    }
    reader.readAsText(file);
    console.log('Products Loaded');
  },

  Compile : function () {
    for(let key in products) {
      let product = products[key + ''];
      product['Title (PEMS Web)'] = this.GetTitle(product);
      product['Description (PEMS Web)'] = this.GetDescription(product);
      product['Text Title'] = this.GetSimpleTextTitle(product);
      product['Text Description'] = this.GetSimpleTextDescription(product);
    }
    console.log('Titles and Descriptions Compiled');
  },

  Export : function() {
    var content = JSON.stringify(products);
    var blob = new Blob([content], {type: "application/json"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = 'products.json';
    a.href = url;
    a.textContent = content;
    a.click();
    a.remove();

    console.log('products exported');
  },

  ExportPEMSWebTitlesAndDescriptions : function() {
    let content = '';
    content += 'PEMS Number\tTitle (PEMS Web)\tDescription (PEMS Web)\tText Title\tText Description';

    for(var pemsnumber in products) {
      let product = products[pemsnumber];
      content += '\n' + product['PEMS Number'] + '\t' + product['Title (PEMS Web)'] + '\t' + product['Description (PEMS Web)'] + '\t' + product['Text Title'] + '\t' + product['Text Description'];
    }

    var blob = new Blob([content], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = 'Titles and Descriptions.txt';
    a.href = url;
    a.textContent = content;
    a.click();
    a.remove();
    console.log('Titles and Descriptions Exported');
  },

  GetTitle: function (product) {
    let section = product['Identification'];

    let brand     = '';
    let catnum    = '';
    let itemclass = '';
    let forOEM    = '';

    if(product.hasOwnProperty('Identification')) {
      if(product['Identification'].hasOwnProperty('Brand')) {
        brand = section['Brand'];
      }
    }

    if(product.hasOwnProperty('Identification')) {
      if(product['Identification'].hasOwnProperty('Catalog Number')) {
        catnum = section['Catalog Number'];

        //if product is a capacitor, show pems number in title instead of catalog number
        if(product['Identification'].hasOwnProperty('Category')) {
          a = product['Identification']['Category'] + '';
          a = a.toLowerCase();
          b = 'Capacitor' + '';
          b = b.toLowerCase();
          if(a.localeCompare(b)==0) {
            catnum = product['PEMS Number'];
          }
        }

      }
    }

    if(product.hasOwnProperty('Identification')) {
      if(product['Identification'].hasOwnProperty('Class')) {
        itemclass = section['Class'];
      }
    }

    if(product.hasOwnProperty('Identification')) {
      let oems;
      oems = product['Cross Reference']['Brands'];
      if(oems.length > 0) {
        for(let i=0; i<oems.length; i++) {
          forOEM += `, ${oems[i].trim()}`;
        }
        forOEM = `For: ${forOEM.substring(1).trim()}`;
      } else {
        forOEM = ``;
      }
    }

    let title = `${brand} ${catnum} ${itemclass} ${forOEM}`;

    return title;
  },

  GetDescription : function(product) {
    let desc = '';

    let identification = '';
    let specifications = '';
    let dimensions = '';
    let crossreference = '';
    let replaces = '';
    let fits = '';
    let applications = '';
    let features = '';
    let details = '';
    let certifications = '';
    let warnings = '';

    if(product.hasOwnProperty('Identification')) {
      identification = this.GetIdentification(product);
    }
    if(product.hasOwnProperty('Specifications')) {
      specifications = this.GetSpecifications(product);
    }
    if(product.hasOwnProperty('Dimensions')) {
      dimensions = this.GetDimensions(product);
    }
    if(product.hasOwnProperty('Cross Reference')) {
      crossreference = this.GetCrossReference(product, 'Cross Reference');
    }
    if(product.hasOwnProperty('Applications')) {
      applications = this.GetApplications(product);
    }
    if(product.hasOwnProperty('Features')) {
      features = this.GetFeatures(product);
    }
    if(product.hasOwnProperty('Details')) {
      details = this.GetDetails(product);
    }
    if(product.hasOwnProperty('Certifications')) {
      certifications = this.GetCertifications(product);
    }
    if(product.hasOwnProperty('Warnings')) {
      warnings = this.GetWarnings(product);
    }

    if(identification.length + specifications.length + dimensions.length > 0) {
      desc += `<div class='pemsatl c1'>${identification}${specifications}${dimensions}</div>`;
    }

    if(applications.length + features.length + crossreference.length > 0) {
      desc += `<div class='pemsatl c2'>${applications}${features}${details}${certifications}${warnings}${crossreference}</section>`
    }

    desc = `<link rel='stylesheet' href='${css_pems}'><div class='pemsatl master'>${desc}</div>`;

    return desc;
  },

  GetSimpleTextTitle : function (product) {
    let simpletitle = '';
    if(product.hasOwnProperty('Identification')) {
      let item_brand = '';
      let item_sku = '';
      let item_class = '';

      if(product['Identification'].hasOwnProperty('Brand')) {
        item_brand = product['Identification']['Brand'];
      } else {
        item_brand = '';
      }

      if(product['Identification'].hasOwnProperty('Catalog Number')) {
        item_sku = product['Identification']['Catalog Number'];
      } else {
        item_sku = '';
      }

      if(product['Identification'].hasOwnProperty('Class')) {
        item_class = product['Identification']['Class'];
      } else {
        item_class = '';
      }

      simpletitle = `${item_brand} ${item_sku} ${item_class}`;
      simpletitle = simpletitle.trim();
      while(simpletitle.includes('  ')) {
        simpletitle.replace('  ', ' ');
      }
      simpletitle = simpletitle.trim();
      console.log(simpletitle);
    }
    return simpletitle;
  },

  GetSimpleTextDescription : function (product) {
    let s = '';
    if(product.hasOwnProperty('Specifications')) {
      for(key in product['Specifications']) {
        if(product['Specifications'][key].trim().length > 0) {
          s = s += `${key}: ${product['Specifications'][key]}; `;
        }
      }
      s = s.trim();
      while(s.includes('  ')) {
        s = s.replace('  ', ' ');
      }
      s = s.trim();
    }
    s = s.trim();
    return s;
  },

  GetParagraphSection : function (label, section) {
    let paragraphsection = '';

    let data = '';
    if(Array.isArray(section)) {
      data = section.filter(() => true);
    } else {
      data = [];
      for(var attr in section) {
        if(attr.length > 0) {
          if(section[attr].length > 0) {
            data.push(`<b>${attr}:</b> ${section[attr]}`);
          }
        }
      }
    }

    for(let i=0; i<data.length; i++) {
      item = data[i].trim();
      if(item.length > 0 ) {
        paragraphsection += `<p>${item}</p>`;
      }
    }

    if(paragraphsection.trim().length > 0) {
      paragraphsection = `<table class='pemsatl table1d'><thead><tr><th>${label}</th></tr></thead><tbody><tr><td>${paragraphsection}</td></tr></tbody></table>`;
    }

    return paragraphsection;
  },

  GetULSection : function (label, section, limit=3) {
    let ulsection = '';

    let lists = [];
    var data;

    if(Array.isArray(section)) {
      data = section.filter(() => true);
    } else {
      data = [];
      for(var attr in section) {
        if(attr.length > 0) {
          if(section[attr].length > 0) {
            data.push(`<b>${attr}:</b> ${section[attr]}`);
          }
        }
      }
    }

    //remove any invalid entries
    for(let i=data.length-1; i>-1; i--) {
      if(data[i].trim().length == 0) {
        arr.splice(i, 1);
      }
    }

    //populate lists in sets of 4
    let list = [];
    let i = -1;
    while(++i < data.length) {
      if(i % limit == 0 && i > 0) {
        lists.push(list);
        list = [];
      }
      list.push(data[i]);
    }
    lists.push(list);

    for(let i=0; i<lists.length; i++) {
      list = lists[i];
      ulsection += this.GetUnorderedList(list);
    }

    if(ulsection.trim().length > 0) {
      //ulsection = `<div class='pemsatl listcontainer'><h4 class='pemsatl sectionheader'>${label}</h4>${ulsection}</div>`;
      ulsection = `<table class='pemsatl table1d'><thead><tr><th>${label}</th></tr></thead><tbody><tr><td>${ulsection}</td></tr></tbody></table>`;
    }

    return ulsection;
  },

  GetUnorderedList : function (data) {
    let unorderedlist = '';
    let items = '';
    for(let i=0; i<data.length; i++) {
      item = data[i];
      items += `<li>${item}</li>`;
    }
    if(items.trim().length > 0) {
      unorderedlist = `<ul>${items}</ul>`;
    }
    return unorderedlist;
  },

  Get1DTable : function (label, section) {
    let table = '';
    let thead = '';
    let tbody = '';

    if(label.trim().length > 0) {
      thead = `<thead><tr><th>${label}</th></tr></thead>`;
    }

    for(var i=0; i<section.length; i++) {
      if(section[i].trim().length > 0) {
        tbody += `<tr><td>${section[i].trim()}</td></tr>`;
      }
    }
    if(tbody.trim().length > 0) {
      tbody = `<tbody>${tbody}</tbody>`;
    }

    if(tbody.trim().length > 0) {
      table = `<table class='pemsatl table1d'>${thead}${tbody}</table>`;
    }
    return table;
  },

  Get2DTable : function (label, section) {
    let table = '';
    let thead='';
    let tbody='';

    if(label.trim().length > 0) {
      thead = `<thead><tr><th colspan=2>${label}</th></tr></thead>`;
    }

    for(var attr in section) {
      attr = attr.trim();
      if(attr.trim().length > 0 && section[attr].trim().length > 0) {
        if(section[attr].valueOf() != '0'.valueOf()) {
          tbody += `<tr><td>${attr.trim()}</td><td>${section[attr].trim()}`;
        }
      }
    }
    if(tbody.trim().length > 0) {
      tbody = `<tbody>${tbody}</tbody>`;
    }

    if(tbody.trim().length > 0) {
      table = `<table>${thead}${tbody}</table>`;
    }
    return table;
  },

  GetIdentification : function (product) {
    return this.Get2DTable(`Product`, product['Identification']);
  },

  GetCrossReference : function (product) {
    let crossreferencesection = '';
    let brands = '';
    let crossrefs = '';
    let replaces = '';
    let fits = '';

    if(product.hasOwnProperty('Cross Reference')) {
      if(product['Cross Reference'].hasOwnProperty('Brands')) brands = this.Get1DTable('For OEMs', product['Cross Reference']['Brands']);
      if(product['Cross Reference'].hasOwnProperty('References')) crossrefs = this.Get1DTable('Cross Reference', product['Cross Reference']['References']);
      if(product['Cross Reference'].hasOwnProperty('Replaces')) replaces = this.Get1DTable('Replaces', product['Cross Reference']['Replaces']);
      if(product['Cross Reference'].hasOwnProperty('Fits')) fits = this.Get1DTable('Fits', product['Cross Reference']['Fits']);

      crossreferencesection = `<div class='pemsatl row'>${brands}${crossrefs}${replaces}${fits}</div>`;
    }

    return crossreferencesection;
  },

  GetSpecifications : function (product) {
    return this.Get2DTable('Specifications', product['Specifications']);
  },

  GetDimensions : function (product) {
    return this.Get2DTable('Dimensions', product['Dimensions']);
  },

  GetApplications : function (product) {
    return this.GetULSection('Applications', product['Applications']);
  },

  GetFeatures : function (product) {
    return this.GetULSection('Features', product['Features']);
  },

  GetDetails : function (product) {
    return this.GetParagraphSection('Details', product['Details']);
  },

  GetCertifications : function (product) {
    return this.Get1DTable('Certifications', product['Certifications']);
  },

  GetWarnings : function (product) {
    return this.GetParagraphSection('Warning', product['Warnings']);
  }
}
