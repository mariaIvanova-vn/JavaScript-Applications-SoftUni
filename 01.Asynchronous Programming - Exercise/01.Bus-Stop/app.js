function getInfo() {
    let baseURL = 'http://localhost:3030/jsonstore/bus/businfo';
    let inputEl = document.getElementById('stopId').value;
    let ulElements = document.getElementById('buses');
    let divEl = document.getElementById('stopName');

    fetch(`${baseURL}/${inputEl}`)
        .then(response => response.json())
        .then(data => {
            let buses=data.buses;
            let name=data.name;

            divEl.textContent=name;
            ulElements.innerHTML='';
            Object.keys(buses).forEach(bus=>{
                let liElement=document.createElement('li');
                liElement.textContent=`Bus ${bus} arrives in ${buses[bus]} minutes`
                ulElements.appendChild(liElement);
            })
        })
        .catch(error=>{
            divEl.textContent="Error";
            ulElements.innerHTML='';
        })
}