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

export async function searchDeliveredPosts(pageIndex, pageSize) {
    const url = `${PREFIX}/candidate_view/DeliveredPost`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            total: Math.ceil(result["candPosts"].length / pageSize),
            posts: result["posts"],
            companies: result["companies"],
            candPosts: result["candPosts"]
        };
        // console.log(`response in searchDeliveredPosts: ${response.companies}`);
    } catch (e) {
        console.log(e);
        response = {
            total: 0,
            posts: [],
            companies: [],
            candPosts: []
        };
    }

    return response;
}