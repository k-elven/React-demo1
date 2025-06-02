import { instance } from "@/utils";

export function loginAPI (formData) {
    return instance({
        url: '/authorizations',
        method: 'POST',
        data:formData
    })
}

export function getProfileAPI () {
    return instance({
        url: '/user/profile',
        method: 'GET',
    })
}

