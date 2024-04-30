import {DUMMY_RESPONSE, PREFIX, put, post, getJson} from "./common";

export async function getHRInfo(){
    const url = `${PREFIX}/hr_view/user`
    let res;
    try{
        res = await getJson(url, "HR");
    } catch(e) {
        console.log(e);
        res = null;
    }
    return res;
}

export async function changeHRPassword(request) {
    const url = `${PREFIX}/hr_view/user/me/password`;
    let res;
    try {
        res = await put(url, request);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}