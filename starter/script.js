'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (countryObj) => {
    const html = `
            <article class="country">
              <img class="country__img" src="${countryObj.flag}" />
              <div class="country__data">
                <h3 class="country__name">${countryObj.name}</h3>
                <h4 class="country__region">${countryObj.region}</h4>
                <p class="country__row"><span>👫</span>${(+countryObj.population/1000000).toFixed(1)} Mn</p>
                <p class="country__row"><span>🗣️</span>${countryObj.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${countryObj.currencies[0].name}</p>
              </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML(`beforeend`, html);
        countriesContainer.style.opacity = 1;
        // console.log(data);
}

const getCountryData = function(country) {

    // const request = new XMLHttpRequest();
    // request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country.toLowerCase()}`);
    // request.send();

    const request = fetch(`https://countries-api-836d.onrender.com/countries/name/${country.toLowerCase()}`);
    // request here is a promise
    console.log(request);

    // request.then(function(response) {
    //     return response.json()
    // })
    // .then(function(data){
    //     console.log("data >>", data);
    // })


    request
        .then(response => response.json())
        .then(data => {
              renderCountry(data[0]);
              const neighbour = data[0].borders?.[0];
              if(!neighbour)
                return;

                return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data))
        .catch(error => console.error(error))




    // request.addEventListener('load', function () {
    //     const [data] = JSON.parse(this.responseText);

    
    // })

}


// getCountryData(`Republic of India`);
// getCountryData(`usa`);
getCountryData(`china`);
