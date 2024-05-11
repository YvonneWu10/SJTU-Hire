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
