export async function getJson(url, type) {
    let opts = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    if (type === "candidate") {
        // 统一命名为token传给后端，否则不知道为什么后端会识别不出来
        opts.headers['token'] = localStorage.getItem("candidateToken");
    }
    else if (type === "HR") {
        opts.headers['token'] = localStorage.getItem("HRToken");
    }

    let res = await fetch(url, opts);
    console.log(`Response in getJson: ${res}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res;
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res.json();
}


export async function post(url, type, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    if (type === "candidate") {
        // 统一命名为token传给后端，否则不知道为什么后端会识别不出来
        opts.headers['token'] = localStorage.getItem("candidateToken");
    }
    else if (type === "HR"){
        opts.headers['token'] = localStorage.getItem("HRToken");
    }

    let res = await fetch(url, opts);
    console.log(res);
    return res.json();
}


export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const PREFIX = BASEURL;
export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}