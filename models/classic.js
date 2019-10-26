import { HTTP } from '../utils/http';

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: "classic/latest",
            success: (res) => {
              sCallback(res);
              this._setLatestIndex(res.index);
              wx.setStorageSync(this._getKey(res.index), res);
            }
        });
    }

    getClassic(index, nextOrPrevious, sCallback) {
        const key = this._getKey(nextOrPrevious == 'next' ? index + 1 : index -1);
        let classic = wx.getStorageSync(key);
        if(!classic) {
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res);
                }
            });
        } else {
            sCallback(classic);
        }
       
    }

    isFirst(index) {
        return index == 1 ? true : false;
    }

    isLatest(index) {
        const latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false;
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }

    _getLatestIndex() {
        const index = wx.getStorageSync('latest');
        return index;
    }

    _getKey(index) {
        return 'classic-' + index;
    }
}

export { ClassicModel };