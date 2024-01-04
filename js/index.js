/* Select form */
const search_form = document.querySelector(".header_form");

search_form.addEventListener("submit", (event) => {
    /* stop form from auto submiting on click */
    event.preventDefault();

    /* get the value of the form field */
    const value = document.querySelector("#search").value;

    /* Pass the Ip address to the search_Ip_Address() function */
    search_Ip_Address(value);
})

/* Search for an IpAddress */
async function search_Ip_Address(ip_address) {
    const api_key = "xxxxxxxxxxxxxxxxxxxxxxx";
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip_address}`);
    const response = await request.json();

    /* Update the UI on the page */
    const { location, ip, isp } = response;
    update_ui(ip, location.city, location.timezone, isp)
}

/* update UI function */
function update_ui(ip_address, location, timezone, isp) {
    /* select all the elements on the page */
    const address = document.querySelector(".address");
    const city = document.querySelector(".location");
    const utc = document.querySelector(".utc");
    const isprovider = document.querySelector(".isp");


    /* Update all the elements on the page */
    address.textContent = ip_address;
    city.textContent = location;
    utc.textContent = 'UTC' + timezone;
    isprovider.textContent = isp;
}
/* create the map */
let map;
function create_map(lat, lng) {
    map = L.map('map').setView([lat, lng, country, region], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
    	.bindPopup(`${region}, ${country}`)
    	.openPopup();
   }
/* Search for an IpAddress */
async function search_Ip_Address(ip_address) {
    const api_key = "at_HhKzCe09UZIYJC9pY7YTg7kMMUzZd";
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip_address}`);
    const response = await request.json();

    const { location, ip, isp } = response;

    /* Update the ui on the page */
    update_ui(ip, location.city, location.timezone, isp)

    /* Update the map on the page */
     /* first remove all map instances if any */
     if (map !== undefined && map !== null) {
        map.remove()
     }
    create_map(location.lat, location.lng, location.country, location.region)
}
    const defaultIp = "197.210.78.172";
search_Ip_Address(defaultIp)
