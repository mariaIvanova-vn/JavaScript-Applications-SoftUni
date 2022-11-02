function attachEvents() {
    let input = document.getElementById('location');
    let getButton = document.getElementById('submit');
    let divDisplay = document.getElementById('forecast');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let baseURL = 'http://localhost:3030/jsonstore/forecaster';
    let sunny = '&#x2600';
    let partlySunny = '&#x26C5';
    let overcast = '&#x2601';
    let rain = '&#x2614';
    let degrees = '&#176';
    let code = '';

    let divElUpcoming = document.createElement('div');
    let divElCurrent = document.createElement('div');

    getButton.addEventListener('click', (event) => {
        divElUpcoming.innerHTML = '';
        divElCurrent.innerHTML = '';

        divElUpcoming.setAttribute('class', 'forecast-info');
        divElCurrent.setAttribute('class', 'forecasts');

        divDisplay.style.display = 'inline';

        fetch(`${baseURL}/locations`)
            .then(response => response.json())
            .then(data => {
                data.forEach(locationInfo => {
                    if (locationInfo.name == input.value) {
                        return code = locationInfo.code;
                    }
                });

                fetch(`${baseURL}/today/${code}`)
                    .then(response => response.json())
                    .then(data => {
                        let tempSpan = document.createElement('span');
                        let locationSpan = document.createElement('span');
                        let groupSpan = document.createElement('span');
                        let conditionSpan = document.createElement('span');
                        let iconSpan = document.createElement('span');

                        tempSpan.setAttribute('class', 'forecast-data');
                        locationSpan.setAttribute('class', 'forecast-data');
                        groupSpan.setAttribute('class', 'condition');
                        conditionSpan.setAttribute('class', 'forecast-data');
                        iconSpan.setAttribute('class', 'condition symbol');

                        locationSpan.textContent = data.name;
                        tempSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
                        conditionSpan.textContent = data.forecast.condition;
                        let condition = data.forecast.condition;
                        if (condition == 'Sunny') {
                            iconSpan.innerHTML = sunny;
                        } else if (condition == 'Partly sunny') {
                            iconSpan.innerHTML = partlySunny;
                        } else if (condition == 'Overcast') {
                            iconSpan.innerHTML = overcast;
                        } else if (condition == 'Rain') {
                            iconSpan.innerHTML = rain;
                        }

                        groupSpan.appendChild(locationSpan);
                        groupSpan.appendChild(tempSpan);
                        groupSpan.appendChild(conditionSpan);
                        divElCurrent.appendChild(iconSpan);
                        divElCurrent.appendChild(groupSpan);

                        currentDiv.appendChild(divElCurrent);

                    })
                    .catch(error => console.log(error));

                fetch(`${baseURL}/upcoming/${code}`)
                    .then(response => response.json())
                    .then(data => {

                        data.forecast.forEach(day => {
                            let tempSpan = document.createElement('span');
                            let locationSpan = document.createElement('span');
                            let groupSpan = document.createElement('span');
                            let conditionSpan = document.createElement('span');
                            let iconSpan = document.createElement('span');

                            tempSpan.setAttribute('class', 'forecast-data');
                            groupSpan.setAttribute('class', 'upcoming');
                            conditionSpan.setAttribute('class', 'forecast-data');
                            iconSpan.setAttribute('class', 'symbol');


                            tempSpan.innerHTML = `${day.low}${degrees}/${day.high}${degrees}`;
                            conditionSpan.textContent = day.condition;
                            let condition = day.condition;
                            if (condition == 'Sunny') {
                                iconSpan.innerHTML = sunny;
                            } else if (condition == 'Partly sunny') {
                                iconSpan.innerHTML = partlySunny;
                            } else if (condition == 'Overcast') {
                                iconSpan.innerHTML = overcast;
                            } else if (condition == 'Rain') {
                                iconSpan.innerHTML = rain;
                            }

                           // groupSpan.appendChild(locationSpan);
                            groupSpan.appendChild(tempSpan);
                            groupSpan.appendChild(conditionSpan);
                            divElUpcoming.appendChild(iconSpan);
                            divElUpcoming.appendChild(groupSpan);

                            upcomingDiv.appendChild(divElUpcoming);
                        })
                    })
            })
    })

}

attachEvents();