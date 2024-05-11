import { PREFIX, getJson } from "./common";

export async function searchCandPost(candName, postName, pageIndex, pageSize) {
    const url = `${PREFIX}/hr_view?pageIndex=${pageIndex}&pageSize=${pageSize}&postName=${postName}&candName=${candName}`;
    let candPostInfo;
    let response;
    console.log(url);
    try {
        candPostInfo = await getJson(url, "HR");
        if (Array.isArray(candPostInfo["postInfo"])) {
            response = {
                total: Math.ceil(candPostInfo["postInfo"].length / pageSize),
                cands: candPostInfo["candInfo"],
                posts: candPostInfo["postInfo"],
                candPost: candPostInfo["candPost"]
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

export async function AdminsearchCandPost(pageIndex, pageSize, candName, postName) {
    const url = `${PREFIX}/administer/searchCandPost?pageIndex=${pageIndex}&pageSize=${pageSize}
                        &postName=${postName}&candName=${candName}`;
    let candPostInfo;
    let response;
    console.log(url);

    try {
        candPostInfo = await getJson(url, "admin");
        // console.log("Searched resumes: ", candPostInfo); //调试

        if (Array.isArray(candPostInfo["data"])) {
            // 遍历数据并整合信息
            const items = candPostInfo["data"].map(item => ({
                candID: item["candID"],
                candName: item["candName"],
                postID: item["postID"],
                postName: item["postName"],
                submissionStage: item["submissionStage"],
                submissionDate: item["submissionDate"]
            }));

            if (candPostInfo["totalPages"]){
                response = {
                    total: candPostInfo["totalPages"]-1,
                    items: items // 分页
                };
            } else {
                response = {
                    total: Math.ceil(items.length / pageSize)-1,
                    items: items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize) // 分页
                };
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

export async function getCandPostById(candId, postId) {
    const url = `${PREFIX}/hr_view/candPostDetail/${candId}/${postId}`;
    let candPostInfo;
    try {
        candPostInfo = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        candPostInfo = null;
    }

    return candPostInfo;
}

// 删除投递信息
export async function adminDeleteResume(candID, postID) {
    const url = `${PREFIX}/deleteCandPost/candID=${candID}&postID=${postID}`; // 假设这是删除岗位的API端点
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
            throw new Error('Failed to delete the candPost. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting candPost:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}