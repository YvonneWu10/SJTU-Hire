import {getJson, PREFIX} from "./common";

export async function AdminsearchHRs(pageIndex, pageSize, HRName) {
    console.log(`Enter AdminsearchHRs`);
    const url = `${PREFIX}/administer/SearchHRs?pageIndex=${pageIndex}&pageSize=${pageSize}&HRName=${HRName}`;
    let HRs;
    let response;
    try {
        HRs = await getJson(url, "admin");
        if (Array.isArray(HRs)) {
            response = {
                total: Math.ceil(HRs.length / pageSize),
                items: HRs
            }
        } else {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        response = {
            total: 0,
            items: []
        };
    }

    return response;
}