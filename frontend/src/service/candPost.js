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

// 根据status查找已投递/已结束流程的岗位
export async function searchDeliveredEndedPosts(pageIndex, pageSize, status) {
    const url = `${PREFIX}/candidate_view/${status}`;
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

// 查找被邀请的岗位
export async function searchInvitedPosts(pageIndex, pageSize) {
    const url = `${PREFIX}/candidate_view/InvitedPost`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            total: Math.ceil(result["candPosts"].length / pageSize),
            posts: result["posts"],
            companies: result["companies"],
            candPosts: result["candPosts"],
            timeout: result["timeout"]
        };
    } catch (e) {
        console.log(e);
        response = {
            total: 0,
            posts: [],
            companies: [],
            candPosts: [],
            timeout: []
        };
    }

    return response;
}

// 求职者投递岗位postId
export async function deliverByPostId(postId) {
    const url = `${PREFIX}/candidate_view/deliver/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

// 求职者结束岗位postId的流程
export async function endProcessByPostId(postId) {
    const url = `${PREFIX}/candidate_view/end/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

// 求职者接受岗位postId的邀请
export async function acceptInvitationByPostId(postId) {
    const url = `${PREFIX}/candidate_view/accept/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

// 求职者拒绝岗位postId的邀请
export async function refuseInvitationByPostId(postId) {
    const url = `${PREFIX}/candidate_view/refuse/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}


