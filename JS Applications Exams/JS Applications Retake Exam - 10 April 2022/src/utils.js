export function getUserData(){
    let data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}
export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData(){
    sessionStorage.clear();
}
export function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        let formData=new FormData(event.target);
        let data = Object.fromEntries(formData);
        callback(data);
    }
}