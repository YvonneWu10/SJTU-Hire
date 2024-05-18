import { PREFIX, getJson } from "./common";

export async function searchCandPost(candName, postName, pageIndex, pageSize) {
    const url = `${PREFIX}/hr_view?pageIndex=${pageIndex}&pageSize=${pageSize}&postName=${postName}&candName=${candName}`;
    let candPostInfo;
    let response;
    try {
        candPostInfo = await getJson(url, "HR");
        console.log(candPostInfo);
        console.log(url);
        if (Array.isArray(candPostInfo["postInfo"])) {
            response = {
                total: Math.ceil(candPostInfo["postInfo"].length / pageSize),
                cands: candPostInfo["candInfo"],
                posts: candPostInfo["postInfo"],
                candPost: candPostInfo["candPost"],
            }
            console.log(response);
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

export async function forwardSubmissionStageByCandPostId(candId, postId) {
    const url = `${PREFIX}/hr_view/forwardSubmissionStage/${candId}/${postId}`;
    let ret;
    try {
        console.log(url);
        ret = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        ret = null;
    }

    return ret;
}

export async function terminateSubmissionStageByCandPostId(candId, postId) {
    const url = `${PREFIX}/hr_view/terminateSubmissionStage/${candId}/${postId}`;
    let ret;
    try {
        ret = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        ret = null;
    }

    return ret;
}

export async function retOpenPosts(){
    const url = `${PREFIX}/hr_view/retOpenPosts`;
    let postNames;
    try {
        postNames = await getJson(url, "HR");
        console.log(postNames);
    } catch (e) {
        console.log(e);
        postNames = null;
    }

    return postNames;
}

export async function retResponsiblePosts() {
    const url = `${PREFIX}/hr_view/retResponsiblePosts`;
    let postNames;
    try {
        postNames = await getJson(url, "HR");
        console.log(postNames);
    } catch (e) {
        console.log(e);
        postNames = null;
    }

    return postNames;
}

export async function inviteByCandPostId(candId, postId) {
    const url = `${PREFIX}/hr_view/invite/${candId}/${postId}`;
    try {
        await getJson(url, "HR");
    } catch (e) {
        console.log(e);
    }
}

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

export async function deliverByPostId(postId) {
    const url = `${PREFIX}/candidate_view/deliver/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

export async function endProcessByPostId(postId) {
    const url = `${PREFIX}/candidate_view/end/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

export async function acceptInvitationByPostId(postId) {
    const url = `${PREFIX}/candidate_view/accept/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}

export async function refuseInvitationByPostId(postId) {
    const url = `${PREFIX}/candidate_view/refuse/${postId}`;
    try {
        await getJson(url, "candidate");
    } catch (e) {
        console.log(e);
    }
}