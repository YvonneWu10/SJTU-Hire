import {PREFIX, post} from "./common";

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
            candId = me["candId"];
        } catch (e) {
            console.log(e);
        }
        return candId;
    } else if (type === "HR"){
        let HRId = null;
        try {
            me = await post(url, type, {type});
            HRId = me["HRId"];
            console.log(`HRId: ${HRId}`);
        } catch (e) {
            console.log(e);
        }
        return HRId;
    }
}