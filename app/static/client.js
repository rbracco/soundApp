var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {
    el('upload-label').innerHTML = input.files[0].name;
    //el('upload-label').innerHTML = "helloWorld";
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze() {
    var uploadFiles = el('file-input').files;
    if (uploadFiles.length != 1) alert('Please select 1 file to analyze!');

    el('analyze-button').innerHTML = 'Analyzing...';
    var xhr = new XMLHttpRequest();
    el('analyze-button').innerHTML = '1...';
    var loc = window.location
    el('analyze-button').innerHTML = '2...';
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
    el('analyze-button').innerHTML = '3...';
    xhr.onerror = function() {alert (xhr.responseText);}
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            el('analyze-button').innerHTML = '5...';
            var response = JSON.parse(e.target.responseText);
            el('rate-label').innerHTML = `Sample Rate = ${response['rate']}`;
            el('length-label').innerHTML = `Audio Length = ${response['length']}`;
        }
        el('analyze-button').innerHTML = 'Analyze';
    }
    var fileData = new FormData();
    fileData.append('file', uploadFiles[0]);
    xhr.send(fileData);
}

