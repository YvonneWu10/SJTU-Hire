import { PREFIX, post } from "./common";

// 登录页面
export async function login(type, username, password) {
    console.log(type,  username, password);
    const url = `${PREFIX}/login`;
    let token, result;

    try {
        token = await post(url, "login", {type, username,  password});
        token = token["token"]
        console.log(`token: ${token}`);
        result = {
            ok: true,
            message: "登录成功",
            token: token
        }
    } catch (e) {
        console.log(`error in login: ${e}`);
        if (e instanceof SyntaxError && e.message === 'Unexpected end of JSON input') {
            result = {
                ok: false,
                message: "用户名或密码错误！",
                token: null
            }
        } else {
            result = {
                ok: false,
                message: "网络错误！",
                token: null
            }
        }
    }
    return result;
}