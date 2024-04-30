import {getJson, PREFIX} from "./common";

export async function getAllCandidatesAvailable(pageIndex, pageSize) {
    const url = `${PREFIX}/hr_view/allCandidates?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let candidates;
    let response;
    try {
        candidates = await getJson(url, "HR");
        if (Array.isArray(candidates)) {
            response = {
                total: Math.ceil(candidates.length / pageSize),
                items: candidates
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

export async function getHRPosts(pageIndex, pageSize, postName) {
    const url = `${PREFIX}/hr_view/managePosts?pageIndex=${pageIndex}&pageSize=${pageSize}&postName=${postName}`;
    let posts;
    let response;
    try {
        posts = await getJson(url, "HR");
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

export async function getHRPostById(postId) {
    const url = `${PREFIX}/hr_view/managePosts/postDetail/${postId}`;
    let posts;
    try {
        posts = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        posts = null;
    }
    return posts;
}