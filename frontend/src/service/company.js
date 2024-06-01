import { PREFIX, getJson } from "./common";

// 根据条件查找公司
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

// 得到公司id的详细信息
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

export async function getAllCompanyNames() {
    const url= `${PREFIX}/getAllCompanies`;
    let result;
    try {
        result = await getJson(url);
    } catch (e) {
        console.log(e);
        result = null;
    }

    return result;
}

// 获取所有公司信息
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

// 管理者条件筛选公司
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

// 删除公司
export async function adminDeleteCompany(companyId) {
    // console.log('deleting post function', postId);
    const url = `${PREFIX}/deleteCompany/${companyId}`; // 假设这是删除岗位的API端点
    try {
        const response = await fetch(url, {
            method: 'DELETE', // 使用 HTTP DELETE 方法
            headers: {
                'Content-Type': 'application/json',
                // 添加其他需要的头部，如认证信息等
                'token': `${localStorage.getItem("adminToken")}`,
                'user-type': `admin`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete the company. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting company:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}