import {getJson, post, PREFIX} from "./common";

export async function getUsernameById(id) {
    console.log(`Enter getUsernameById`);
    const url = `${PREFIX}/candidate_view/username`;
    let username;
    try {
        username = await getJson(url, "candidate");
        console.log(`getUsernameById: ${username}`);
    } catch (e) {
        console.log(e);
        username = null;
    }

    return username["username"];
}

// 管理者条件筛选获取应聘者
export async function AdminsearchCandidates(pageIndex, pageSize, candName, candGender, candUniversity, candMajor) {
    console.log(`Enter AdminsearchCandidates`);
    const url = `${PREFIX}/administer/SearchCandidates?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &candName=${candName}&candGender=${candGender}&candUniversity=${candUniversity}&candMajor=${candMajor}`;
    let candidates;
    let response;
    try {
        candidates = await getJson(url, "admin");
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

// 获取应聘者所有专业
export async function retCandMajors(){
    const url = `${PREFIX}/administer/CandMajors`;
    let majors;
    try {
        majors = await getJson(url, "admin");
        if (!Array.isArray(majors)) {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        majors = [];
    }

    return majors;
}

// 获取应聘者所有大学
export async function retCandUniversities(){
    const url = `${PREFIX}/administer/CandUniversities`;
    let majors;
    try {
        majors = await getJson(url, "admin");
        if (!Array.isArray(majors)) {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        majors = [];
    }

    return majors;
}

// 删除应聘者
export async function adminDeleteCandidate(candId) {
    const url = `${PREFIX}/deleteCandidate/${candId}`; // 假设这是删除岗位的API端点
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
            throw new Error('Failed to delete the candidate. Status: ' + response.status);
        }

        //不期待任何响应内容，直接返回成功状态
        return { success: true };
    } catch (e) {
        console.error('Error deleting candidate:', e);
        throw e; // 重新抛出异常，以便调用者可以处理
    }
}

// 根据token得到求职者姓名
export async function searchCandidateUsername() {
    const url = `${PREFIX}/candidate_view/username`;
    let username;
    try {
        username = await getJson(url, "candidate");
        console.log(`getUsernameById: ${username}`);
    } catch (e) {
        console.log(e);
        return null;
    }

    return username["username"];
}

// 根据token得到求职者简历
export async function searchCandidateInfo() {
    const url = `${PREFIX}/candidate_view/PersonalCenter`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            candidate: result["candidate"],
            projects: result["projects"]
        };
    } catch (e) {
        console.log(e);
        response = {
            candidate: null,
            projects: []
        };
    }

    return response;
}

// 求职者修改简历
export async function candidateEdit(data) {
    const url = `${PREFIX}/candidate_view/CandidateEdit`;
    let result;
    try {
        await post(url, "candidate", data);
        result = {
            ok: true,
            message: "修改成功",
        }
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "修改失败",
        }
    }

    return result;
}

// 求职者修改密码
export async function candidateChangePassword(data) {
    const url = `${PREFIX}/candidate_view/ChangePassword`;
    let result;
    try {
        result = await post(url, "candidate", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "修改失败",
        }
    }

    return result;
}

// 求职者注销
export async function candidateDeleteAccount(data) {
    const url = `${PREFIX}/candidate_view/DeleteAccount`;
    let result;
    try {
        result = await post(url, "candidate", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "注销失败",
        }
    }

    return result;
}

// 求职者注册
export async function candidateRegister(data) {
    const url = `${PREFIX}/candidate_view/Register`;
    let result;
    try {
        result = await post(url, "register", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "注册失败",
        }
    }

    return result;
}