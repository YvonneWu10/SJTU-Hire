import {getJson, PREFIX} from "./common";

export async function getUsernameById(id) {
    console.log(`Enter getUsernameById`);
    const url = `${PREFIX}/candidate_view/username`;
    let username;
    try {
        username = await getJson(url, "candidate");
        console.log(`getUsernameById: ${username}`);
    } catch (e) {
        console.log(e);
        username = null;
    }

    return username["username"];
}