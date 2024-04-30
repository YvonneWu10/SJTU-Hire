import {DUMMY_RESPONSE, PREFIX, put, post} from "./common";

export async function getMe(type) {
    let token = localStorage.getItem(type + 'Token');
    if (token === null) {
        token = '';
    }

    const url = `${PREFIX}/auth`;
    let me;

    if (type === "candidate") {
        let candId = null;
        try {
            me = await post(url, type, {type});
            // console.log(`me: ${me}`)
            candId = me["candId"];
            // console.log(`candId: ${candId}`);
        } catch (e) {
            console.log(e);
        }
        return candId;
    } else if (type === "HR"){
        let HRId = null;
        try {
            me = await post(url, type, {type});
            // console.log(`me: ${me}`)
            HRId = me["HRId"];
            console.log(`HRId: ${HRId}`);
        } catch (e) {
            console.log(e);
        }
        return HRId;
    }
}

export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;
    let res;
    try {
        res = await put(url, request);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}