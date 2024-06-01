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

// 删除HR
export async function adminDeleteHR(HRId) {
    const url = `${PREFIX}/deleteHR/${HRId}`; // 假设这是删除岗位的API端点
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
            throw new Error('Failed to delete the HR. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting HR:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}