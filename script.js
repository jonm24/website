
var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
gapi.load('client:auth2', initClient);
var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyCWyqHJRZrQRPy8vhGCdE9q_ZdINuyJ998',
        'discoveryDocs': [discoveryUrl],
        'clientId': '877138000037-g99ldraobhdaio5e7ovb6lppg2pst2qc.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();
    });
}

function execute() {
    var input = $("input").text();
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 25,
      "q": input + "in sign language"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                var videoId = response.result.items[0].videoId;
                var video = document.getElementById("vid").src += videoId;
              },
              function(err) { console.error("Execute error", err); });
}


function search() {
    $(".hide").toggle();
}