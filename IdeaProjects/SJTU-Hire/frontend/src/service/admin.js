import {getJson, PREFIX} from "./common";

export async function getAdminnameByToken() {
    console.log(`Enter getAdminnameByToken`);
    const url = `${PREFIX}/administer-main/adminname`;
    let adminname;
    try {
        adminname = await getJson(url, "admin");
        console.log(`getUsernameByToken: ${adminname}`);
    } catch (e) {
        console.log(e);
        adminname = null;
    }

    return adminname["adminname"];
}