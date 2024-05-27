import {getJson, PREFIX} from "./common";

// 获取管理者名称
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

// 获取进展中岗位比例
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

// 获取岗位热度排名
export async function getHotJob(rank){
    console.log(`Enter getHotJob`);
    const url = `${PREFIX}/hotJob/${rank}`;
    let response;
    try {
        const hotJob = await getJson(url, "admin");

        if (Array.isArray(hotJob)) {
            // 解析并构建需要的格式
            const items = hotJob.map(item => ({
                post: item.post,
                count: item.count,
            }));

            response = {
                items: items,
            }
        } else {
            throw new Error('Received hotJob data is not an array!');
        }
    } catch (e) {
        console.log(e);
        response = {
            items: []
        }
    }
    // console.log(`final response:`, response);
    return response;
}

// 获取应聘者年龄分布
export async function getCandidateAgeDistribution() {
    const url = `${PREFIX}/countCandidatesByAgeRange`;
    try {
        const response = await getJson(url, "admin");
        if (Array.isArray(response)) {
            return response;
        } else {
            throw new Error('Received data is not an array!');
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

// 获取应聘者学历分布
export async function getCandidateDegreeDistribution() {
    const url = `${PREFIX}/candidateDegreeDistribution`;
    try {
        const response = await getJson(url, "admin");
        if (Array.isArray(response)){
            return response;
        } else {
            throw new Error('Received data is not an array!');
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

// 获取岗位薪资学历聚类
export async function getSalaryAndDegreeNum() {
    // console.log('SalaryAndDegre!!')
    const url = `${PREFIX}/salaryAndDegreeNum`;
    try {
        const response = await getJson(url, "admin");
        // console.log('SalaryAndDegre response:', response)
        if (Array.isArray(response)){
            return response;
        } else {
            throw new Error('Received data is not an array!');
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

// 获取求职者和岗位薪资聚类
export async function getSalaryDistribution() {
    const url = `${PREFIX}/salaryDistribution`;
    try {
        const response = await getJson(url, "admin");
        // console.log('SalaryAndDegre response:', response)
        if (Array.isArray(response)){
            return response;
        } else {
            throw new Error('Received data is not an array!');
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

// 获取岗位城市聚类
export async function getCityDistribution() {
    const url = `${PREFIX}/cityDistribution`;
    try {
        const response = await getJson(url, "admin");
        // console.log('City response:', response)
        if (Array.isArray(response)){
            return response;
        } else {
            throw new Error('Received data is not an array!');
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}