import {del, get, post, put} from './api.js';

export async function getAll(){
    return get('/data/books?sortBy=_createdOn%20desc');
}
export async function getById(id){
    return get('/data/books/' + id);
}
export async function deleteByIde(id){
    return del('/data/books/' + id);
}
export async function createBook(data){
    return post('/data/books', data);
}
export async function editBook(id, data){
    return put('/data/books/' + id, data);
}

export async function getMyBooks(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}