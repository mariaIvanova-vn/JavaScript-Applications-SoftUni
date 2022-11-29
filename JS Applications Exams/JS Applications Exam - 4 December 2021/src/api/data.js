import {del, get, post, put} from './api.js';

export async function getAll(){
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}
export async function getById(id){
    return get('/data/albums/' + id);
}
export async function deleteByIde(id){
    return del('/data/albums/' + id);
}
export async function createAlbum(data){
    return post('/data/albums', data);
}
export async function editAlbum(id, data){
    return put('/data/albums/' + id, data);
}

export async function getSearchAlbum(){
    return get('/data/albums?where=name%20LIKE%20%22${query}%22');
}