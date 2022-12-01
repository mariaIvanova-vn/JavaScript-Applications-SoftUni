import {del, get, post, put} from './api.js';

export async function getAll(){
    return get('/data/games?sortBy=_createdOn%20desc');
}
export async function getById(id){
    return get('/data/games/' + id);
}
export async function deleteByIde(id){
    return del('/data/games/' + id);
}
export async function createGame(data){
    return post('/data/games', data);
}
export async function editGame(id, data){
    return put('/data/games/' + id, data);
}

export async function getLAtestGames(){
    return get(`/data/games?sortBy=_createdOn%20desc&distinct=category`);
}

export async function getComments(gameId){
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function addComment(data){
  return post('/data/comments', data);
}