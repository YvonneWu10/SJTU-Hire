import {getJson, post, PREFIX} from "./common";

export async function getHRPosts(pageIndex, pageSize, postName) {
    const url = `${PREFIX}/hr_view/managePosts?pageIndex=${pageIndex}&pageSize=${pageSize}&postName=${postName}`;
    let posts;
    let response;
    try {
        posts = await getJson(url, "HR");
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

export async function getHRPostById(postId) {
    const url = `${PREFIX}/hr_view/managePosts/postDetail/${postId}`;
    let posts;
    try {
        posts = await getJson(url, "HR");
    } catch (e) {
        console.log(e);
        posts = null;
    }
    return posts;
}

export async function retHRPostCities() {
    const url = `${PREFIX}/hr_view/PostCities`;
    let cities;
    try {
        cities = await getJson(url, "HR");
        if (!Array.isArray(cities)) {
            throw new Error('Received post data is not an array!');
        }
    } catch (e) {
        console.log(e);
        cities = [];
    }

    return cities;
}

export async function hrEditPost(values) {
    const url = `${PREFIX}/hr_view/editPostDetail/`;

    console.log(values);
    try {
        let res = await post(url, "HR", values);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}