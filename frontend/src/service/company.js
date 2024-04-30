import { PREFIX, getJson } from "./common";

export async function searchCompany(pageIndex, pageSize, companyName) {
    const url = `${PREFIX}/candidate_view/SearchCompany?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &companyName=${companyName}`;
    let company;
    let response;
    try {
        company = await getJson(url, "candidate");
        if (Array.isArray(company)) {
            response = {
                total: Math.ceil(company.length / pageSize),
                items: company
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