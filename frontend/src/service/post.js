import { PREFIX, getJson } from "./common";

export async function searchPosts(pageIndex, pageSize, postName, city, workType, workStyle) {
    const url = `${PREFIX}/candidate_view/SearchPosts?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &postName=${postName}&city=${city}&workType=${workType}&workStyle=${workStyle}`;
    let posts;
    let response;
    try {
        posts = await getJson(url, "candidate");
        if (Array.isArray(posts)) {
            response = {
                total: Math.ceil(posts.length / pageSize),
                items: posts
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

export async function getPostById(id) {
    const url = `${PREFIX}/candidate_view/Post/${id}`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            post: result["post"],
            company: result["company"],
            department: result["department"],
            timeout: result["timeout"],
            delivered: result["delivered"],
            ended: result["ended"],
            invited: result["invited"]
        };
    } catch (e) {
        console.log(e);
        response = {
            post: null,
            company: null,
            department: null,
            timeout: null,
            delivered: null,
            ended: null,
            invited: null
        };
    }

    return response;
}

export async function retPostCities() {
    const url = `${PREFIX}/candidate_view/PostCities`;
    let cities;
    try {
        cities = await getJson(url, "candidate");
        if (!Array.isArray(cities)) {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        cities = [];
    }

    return cities;
}

// 删除岗位
export async function AdmindeletePost(postId) {
    // console.log('deleting post function', postId);
    const url = `${PREFIX}/deletePost/${postId}`; // 假设这是删除岗位的API端点
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
            throw new Error('Failed to delete the post. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting post:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}

export async function HRdeletePost(postId) {
    // console.log('deleting post function', postId);
    const url = `${PREFIX}/deletePost/${postId}`; // 假设这是删除岗位的API端点
    try {
        const response = await fetch(url, {
            method: 'DELETE', // 使用 HTTP DELETE 方法
            headers: {
                'Content-Type': 'application/json',
                // 添加其他需要的头部，如认证信息等
                'token': `${localStorage.getItem("HRToken")}`,
                'user-type': `HR`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete the post. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting post:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}