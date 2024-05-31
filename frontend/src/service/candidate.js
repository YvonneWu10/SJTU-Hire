import {getJson, post, PREFIX} from "./common";

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