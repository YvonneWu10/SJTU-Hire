import { PREFIX, getJson } from "./common";

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