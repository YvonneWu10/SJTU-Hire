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

export async function AdminsearchPosts(pageIndex, pageSize, postName, city, workType, workStyle) {
    const url = `${PREFIX}/administer/SearchPosts?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &postName=${postName}&city=${city}&workType=${workType}&workStyle=${workStyle}`;
    let posts;
    let response;
    try {
        posts = await getJson(url, "admin");
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
    // console.log(`posts:`, response);
    return response;
}

export async function getPostById(id) {
    const url = `${PREFIX}/candidate_view/Post/${id}`;
    let post;
    try {
        // console.log(url);
        post = await getJson(url, "candidate");
        // console.log(post);
    } catch (e) {
        console.log(e);
        post = null;
    }

    return post;
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

export async function retAdminPostCities() {
    const url = `${PREFIX}/administer/PostCities`;
    let cities;
    try {
        cities = await getJson(url, "admin");
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

// export async function createPost(postData, userType) {
//     const url = `${PREFIX}/administer/createPost`;
//     let headers = {
//         'Content-Type': 'application/json'
//     };
//
//     // 根据 userType 直接设置授权信息
//     if (userType === "candidate") {
//         headers['token'] = localStorage.getItem("candidateToken");
//         headers['User-Type'] = "candidate";
//     } else if (userType === "HR") {
//         headers['token'] = localStorage.getItem("HRToken");
//         headers['User-Type'] = "HR";
//     } else if (userType === "admin") {
//         headers['token'] = localStorage.getItem("adminToken");
//         headers['User-Type'] = "admin";
//     } else {
//         throw new Error("Unauthorized user type"); // 处理未知用户类型或未授权的访问
//     }
//
//     let response;
//     try {
//         response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'User-Type': "admin",
//
//                 // 这里可以包括额外的头部信息，如授权信息
//             },
//             body: JSON.stringify(postData)
//         });
//         if (!response.ok) {
//             throw new Error('网络响应不正常。');
//         }
//         return await response.json(); // 假设服务器以 JSON 响应
//     } catch (e) {
//         console.error('创建岗位失败:', e);
//         throw e; // 重新抛出或根据需要处理错误
//     }
// }
