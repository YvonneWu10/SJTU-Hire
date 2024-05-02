import { PREFIX, getJson } from "./common";
import axios from "axios";

export async function getAllCompany() {
    const url = `${PREFIX}/company/getAllCompany`;
    let response;
    try {
        response = await getJson(url, "admin");
        return response;
    } catch (e) {
        console.log(e);
        response = {
            total: 0,
            items: []
        };
    }
}

export async function AdminsearchCompanies(pageIndex, pageSize, companyName, companyType, companyScale) {
    const url = `${PREFIX}/administer/SearchCompanies?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &companyName=${companyName}&companyType=${companyType}&companyScale=${companyScale}`;
    let companies;
    let response;
    try {
        companies = await getJson(url, "admin");
        if (Array.isArray(companies)) {
            response = {
                total: Math.ceil(companies.length / pageSize),
                items: companies
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