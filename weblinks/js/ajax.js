// Execute an AJAX GET
// The parameters are the target URL and the callback function called in case of success
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Network erro with the URL " + url);
    });
    req.send(null);
}


// Execute an AJAX POST
// The parameters are the target URL, the data to send and the callback function called in case of success
// The isJson parameter indicates if the data is in JSON format
function ajaxPost(url, data, callback, isJson) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    if (isJson) {
        // Define the content of the request as JSON
        req.setRequestHeader("Content-Type", "application/json");
        // Conversion from JSON to text format before sending
        data = JSON.stringify(data);
    }
    req.send(data);
}
