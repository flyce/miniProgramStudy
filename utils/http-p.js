import { config } from '../config';

const tips = {
    1: '抱歉，出现一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}

class HTTP {
    request({url, method = "GET", data = {}}) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, method, data);
        });
    }

    _request(url, resolve, reject, method='GET', data={}) {
        wx.request({
            url: config.api_base_url + url,
            method,
            data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appKey
            },
            success: (res) => {
                const code = res.statusCode.toString();
                if(code.startsWith('2')) {
                   resolve(res.data);
                } else {
                    reject();
                    const error_code = res.data.error_code;
                    this._show_error(error_code);
                }
            },
            fail: (err) => {
                reject();
               this._show_error(1);
            }
        })
    }

    _show_error(error_code) {
        if(!error_code) {
            error_code = 1;
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tips ? tip : tips[1],
            icon: 'none',
            duration: 2000
        });
    }
}

export { HTTP }; 