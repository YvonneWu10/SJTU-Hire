import {DUMMY_RESPONSE, PREFIX, put, post, getJson} from "./common";

// 获得HR的个人信息
export async function getHRInfo(){
    const url = `${PREFIX}/hr_view/user`
    let res;
    try{
        res = await getJson(url, "HR");
    } catch(e) {
        console.log(e);
        res = null;
    }
    return res;
}

// 提交密码的修改
export async function HRChangePassword(data) {
    const url = `${PREFIX}/hr_view/ChangePassword`;
    let result;
    try {
        result = await post(url, "HR", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "修改失败",
        }
    }

    return result;
}

// 将新录入的公司信息提交数据库
export async function HR_EditCompany(data) {
    const url = `${PREFIX}/hr_view/editCompany/`;
    let result;
    try {
        result = await post(url, "HR", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "修改失败",
        }
    }

    return result;
}

// 注销请求传递
export async function HRDeleteAccount() {
    const url = `${PREFIX}/hr_view/DeleteAccount`;
    let result;
    try {
        result = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "注销失败",
        }
    }

    return result;
}

// 将修改的个人信息提交后端
export async function HR_EditPersonalInfo(data) {
    const url = `${PREFIX}/hr_view/editPersonalInfo`;
    let result;
    try {
        result = await post(url, "HR", data);
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "修改失败",
        }
    }

    return result;
}

// HR的注册，将HR信息加入数据库
export async function HRRegister(data) {
    const url = `${PREFIX}/hr_view/register`;
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