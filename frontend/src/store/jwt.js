async function jwtFetch(url, options = {}) {
    // Set options.method to 'GET' if there is no method.
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
   
    // Set the "Authorization" header to the value of "jwtToken" in localStorage.
    // Remember to add 'Bearer ' to the front of the token.
    const jwtToken = localStorage.getItem("jwtToken");
    
    console.log(jwtToken);
    if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;
    
    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json".

    // TAKE A LOOK PLS , FIGURE OUT CSRF TOKEN, AFTER AWS CHANGES
    if (options.method.toUpperCase() !== "GET") {
      
      if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
        
      }
      options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }
   

  

    // this should not be so public, should be restricted to certain requests
    // options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");

  
    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);

    // If the response status code is 400 oder above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
  }


  export function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;   
    }
    return null;
  }
  
  export default jwtFetch;


  