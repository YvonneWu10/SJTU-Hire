import { PREFIX, getJson } from "./common";

export async function searchCompany(pageIndex, pageSize, companyName, companyType, financingStage, companyScale) {
    const url = `${PREFIX}/candidate_view/SearchCompany?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &companyName=${companyName}&companyType=${companyType}&financingStage=${financingStage}&companyScale=${companyScale}`;
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

export async function getCompanyById(id) {
    const url= `${PREFIX}/candidate_view/Company/${id}`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            posts: result["posts"],
            company: result["company"],
            departments: result["departments"]
        };
    } catch (e) {
        console.log(e);
        response = {
            posts: null,
            company: null,
            departments: null
        };
    }

    return response;
}