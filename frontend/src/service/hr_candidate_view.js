import {getJson, PREFIX} from "./common";

export async function getAllCandidatesAvailable(pageIndex, pageSize, candDegree, candWorkYear) {
    const url = `${PREFIX}/hr_view/allCandidates?pageIndex=${pageIndex}&pageSize=${pageSize}&candDegree=${candDegree}&candWorkYear=${candWorkYear}`;
    let candidates;
    let response;
    try {
        candidates = await getJson(url, "HR");
        console.log(candidates);
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

export async function getCandInfoByCandId(candId) {
    const url = `${PREFIX}/hr_view/getCandInfoByCandId/${candId}`;
    let cand;
    try {
        cand = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        cand = null;
    }

    return cand;
}