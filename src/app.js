import redirects from './redirects';

let passthrough = process.env.PASSTHROUGH;
let slug = window.location.pathname;

// Use console mode to prevent redirects during development.
let consoleMode = false;

let redirected = false;

let destination = "";

function setDestination(value){
    destination = value;
    document.getElementById("redirect-location").innerHTML = destination;
    document.getElementById("redirect-button").href = destination;
}

function goNow() {
    console.log("Redirect triggered");
    setTimeout(function () {
        window.location.replace(destination);
    }, 1000);
}

for(let i = 0; i < redirects.length; i++) {
    if(redirects[i].slug === slug || (redirects[i].slug + "/") === slug) {
        redirected = true;
        setDestination(redirects[i].destination);
        console.log("redirect: ", true);
        console.log("url:", slug);
        console.log("location:", redirects[i].destination);
        if(!consoleMode) {
            goNow();
        }
    }
}

if(!redirected) {
    setDestination(passthrough + slug);
    if(!consoleMode) {
        goNow();
    }
    console.log("redirect: ", "passthrough");
    console.log("url:", slug);
    console.log("location:", passthrough + slug);
    console.log(passthrough);
}
