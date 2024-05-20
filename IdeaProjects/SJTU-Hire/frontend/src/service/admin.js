import {getJson, PREFIX} from "./common";

export async function getAdminnameByToken() {
    console.log(`Enter getAdminnameByToken`);
    const url = `${PREFIX}/administer-main/adminname`;
    let adminname;
    try {
        adminname = await getJson(url, "admin");
        console.log(`getUsernameByToken: ${adminname}`);
    } catch (e) {
        console.log(e);
        adminname = null;
    }

    return adminname["adminname"];
}

export async function getpostInProgress(){
    console.log(`Enter getPostInProgress`);
    const url = `${PREFIX}/administer/postInProgressData`;
    let postInProgress;
    try{
        postInProgress = await getJson(url, "admin");
        // console.log(`postInProgress: ${postInProgress}`);
    } catch (e) {
        console.log(e);
        postInProgress = null;
    }
    return postInProgress["data"];
}

// 获取总岗位数
export async function getPostNum(){
    console.log(`Enter getPostNum`);
    const url = `${PREFIX}/postNum`;
    let postNum;
    try {
        postNum = await getJson(url, "admin");
    } catch (e) {
        console.log(e);
        postNum = null;
    }
    return postNum["data"];
}

// 获取总应聘者数
export async function getCandidateNum(){
    console.log(`Enter getCandidateNum`);
    const url = `${PREFIX}/candidateNum`;
    let candidateNum;
    try {
        candidateNum = await getJson(url, "admin");
    } catch (e) {
        console.log(e);
        candidateNum = null;
    }
    return candidateNum["data"];
}

// 获取总HR数
export async function getHRNum(){
    console.log(`Enter getHRNum`);
    const url = `${PREFIX}/HRNum`;
    let HRNum;
    try {
        HRNum = await getJson(url, "admin");
    } catch (e) {
        console.log(e);
        HRNum = null;
    }
    return HRNum["data"];
}

// 获取总公司数
export async function getCompanyNum(){
    console.log(`Enter getCompanyNum`);
    const url = `${PREFIX}/companyNum`;
    let companyNum;
    try {
        companyNum = await getJson(url, "admin");
    } catch (e) {
        console.log(e);
        companyNum = null;
    }
    return companyNum["data"];
}