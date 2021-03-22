function ExportPreview() {
  let content = GetPreview();
  var blob = new Blob([content], {type: 'text/html'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download = 'Preview.html';
  a.href = url;
  a.textContent = content;
  a.click();
  a.remove();
  console.log('PEMS Web Product Titles and Descriptions Exported');
}

function GetPreview() {

  var container = document.getElementById('preview');
  container.innerHTML = '';

  var previewtext = '';

  for(var pems_number in products) {
    product = products[pems_number];
    product['Title'] = DescriptionBuilder_PEMS.GetTitle(product);
    product['Description'] = DescriptionBuilder_PEMS.GetDescription(product);
  }

  for(var pems_number in products) {
    var product = products[pems_number];

    let title = product['Title'];
    let description = product['Description'];

    previewtext += `<h1 class='pemsatl'>${title}</h1>${description.replace(`<link rel='stylesheet' href='https://alovitt.github.io/PEMS-Description-Stylesheet/pemsatl_ver0.004.css'>`, '')}</div>`;
  }

  previewtext = `<html><head><link rel='stylesheet' href='https://alovitt.github.io/PEMS-Description-Stylesheet/pemsatl_ver0.004.css'><title>Preview</title></head><body>${previewtext}</body></html>`;

  return previewtext;
}
