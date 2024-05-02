import {getJson, PREFIX} from "./common";

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