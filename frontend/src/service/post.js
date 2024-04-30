import { PREFIX, getJson } from "./common";

export async function searchPosts(pageIndex, pageSize, postName, city, workType, workStyle) {
    const url = `${PREFIX}/candidate_view/SearchPosts?pageIndex=${pageIndex}&pageSize=${pageSize}
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
    let post;
    try {
        // console.log(url);
        post = await getJson(url, "candidate");
        // console.log(post);
    } catch (e) {
        console.log(e);
        post = null;
    }

    return post;
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