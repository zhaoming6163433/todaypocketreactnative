import appConfigs from './configs'

//GET请求
function GET(url, params, timeout = appConfigs.timeout) {

    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }

    var dispatchTimeout = null;
    var timeoutPromise = new Promise((resolve, reject) => {
        dispatchTimeout = () => {
            reject('请求超时')
        }
    })
    setTimeout(() => {
        dispatchTimeout();
    }, timeout);

    var getPromise = new Promise((resolve, reject) => {
        fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                resolve(responseData)
            })
            .catch((error) => {
                reject(error);
            })
    })
    return Promise.race([getPromise, timeoutPromise]);
}
//POST请求
function POST(url, version, body, timeout = _timeout) {

    var dispatchTimeout = null;
    var timeoutPromise = new Promise((resolve, reject) => {
        dispatchTimeout = () => {
            reject('请求超时')
        }
    })
    setTimeout(() => {
        dispatchTimeout();
    }, timeout);

    var postPromise = new Promise((resolve, reject) => {
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })
            .then((response) => response.json())
            .then((responseData) => {
                resolve(responseData)
            })
            .catch((error) => {
                reject(error)
            });
    })

    return Promise.race([postPromise, timeoutPromise]);
}

export {
    GET,
    POST
}