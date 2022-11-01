function solve() {

    let info = document.querySelector('.info');
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');

    let busStops = {
        next: 'depot'
    };

    function depart() {
        departButton.disabled = true;
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStops.next}`)
            .then(response => response.json())
            .then(data => {
                busStops = JSON.parse(JSON.stringify(data));
                info.textContent = `Next stop ${busStops.name}`
            })
            .catch(error=>console.log(error));
            arriveButton.disabled=false;
    }

    function arrive() {
        info.textContent=`Arriving at ${busStops.name}`;
        departButton.disabled = false;
        arriveButton.disabled=true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();