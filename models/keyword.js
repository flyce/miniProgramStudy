import { HTTP } from '../utils/http-p';

class KeywordModel extends HTTP {
    key = 'q';
    maxlength = 10;

    getHistory() {
        const words = wx.getStorageSync(this.key);
        if(!words) {
            return [];
        }
        return words;
    }

    getHot() {
        return this.request({
            url: 'book/hot_word'
        });
    }

    addToHistory(keyword) {
        let words = this.getHistory();
        const has = words.includes(keyword);
        if(!has) {
            if(words.length >= this.maxlength) {
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }
    }
}

export { KeywordModel }