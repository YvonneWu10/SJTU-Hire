import { PREFIX, getJson } from "./common";

export async function searchPosts(pageIndex, pageSize, postName, city, workType, workStyle) {
    const url = `${PREFIX}/candidate_view/SearchPost?pageIndex=${pageIndex}&pageSize=${pageSize}
                 &postName=${postName}&city=${city}&workType=${workType}&workStyle=${workStyle}`;
    let posts;
    let response;
    try {
        posts = await getJson(url, "candidate");
        if (Array.isArray(posts)) {
            response = {
                total: Math.ceil(posts.length / pageSize),
                items: posts
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

export async function getPostById(id) {
    const url = `${PREFIX}/candidate_view/Post/${id}`;
    let result;
    let response;
    try {
        result = await getJson(url, "candidate");
        response = {
            post: result["post"],
            company: result["company"],
            department: result["department"],
            timeout: result["timeout"],
            delivered: result["delivered"],
            ended: result["ended"],
            invited: result["invited"]
        };
    } catch (e) {
        console.log(e);
        response = {
            post: null,
            company: null,
            department: null,
            timeout: null,
            delivered: null,
            ended: null,
            invited: null
        };
    }

    return response;
}

export async function retPostCities() {
    const url = `${PREFIX}/candidate_view/PostCities`;
    let cities;
    try {
        cities = await getJson(url, "candidate");
        if (!Array.isArray(cities)) {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        cities = [];
    }

    return cities;
}