import {getJson, post, PREFIX} from "./common";

export async function searchCandidateUsername() {
    // console.log(`Enter getUsernameById`);
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