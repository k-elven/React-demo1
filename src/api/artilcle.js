import { instance } from "@/utils";

export function getChannelAPI () {
    return instance({
        url: '/channels',
        method: 'GET',
    })
}

export function createArticleAPI (data) {
    return instance({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

export function fetchArticleList (params) {
    return instance({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

export function deleteArticleList (id) {
    return instance({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

export function getInfoBack (id) {
    return instance({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}