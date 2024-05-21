// 根据后端返回结果，处理前端的提示信息
export async function handleBaseApiResponse(res, messageApi, onSuccess, onFail) {
    if (res.ok) {
        await messageApi.success(res.message, 0.5);
        onSuccess?.();
    } else {
        await messageApi.error(res.message, 0.5);
        onFail?.();
    }
}