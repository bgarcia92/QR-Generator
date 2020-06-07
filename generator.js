var axios = require('axios');
var open = require('open');
const ExcelJS = require('exceljs');

//Variables de configuración para generar QR
var base = 'https://acollazos.qrc.es/api/short?key=';
var key = '84e8bac4421fa0da3039a2749d8117e7';
var folder = 'expresocol'
var file = folder+'.xlsx'
var string = '&folder='+ folder;
var url = '&url='
var typeqr =  '&static=1';
var title = '&title=';
var vanity = '&vanityurl='
var optionAxios = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin' : '*',
        'crossorigin': true,
        'Access-Control-Allow-Credentials':true
    }
};

//variables de configuración para descargar QR
var based = 'https://acollazos.qrc.es'
var format = '/d/'
var size = '/30'
var correction = '/H'
var padding = '/3'

var placas = []

function generateQR(text) {
    var urlfinal = base+key+url+text+typeqr+title+text+string+vanity+text
    axios.get(urlfinal, optionAxios)
    .then(function(response) {
        console.log('QR procesado: ', text,  'url: ', urlfinal )
        downloadQR(text)
    })
    .catch(function(error){
        console.log(error);
    })
    .then(function(){
    });
};

function downloadQR(text) {
    console.log('Descargando ',text, '...')
    var url = based + format + text + size + correction + padding
    open(url)
}

async function readplacas() {
    var workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(file).then(function() {
        var lon=workbook.getWorksheet(1).actualRowCount
        for (var i=1; i<= lon;i++){
            placas[i-1] = workbook.getWorksheet(1).getRow(i).getCell(1).value;
            generateQR(placas[i-1]);
        }
        
    })
    .catch(function(error){
        console.log(error)
    });
    
}

readplacas();
