// components/search/index.js
import { KeywordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';
import { paginationBev } from '../behaviors/pagination';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({

  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  attached() {
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot,
        historyWords: keywordModel.getHistory()
      });
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if(!this.data.q) {
        return ;
      }

      // 避免点击过快 重复加载
      if(this.isLocked()) {
        return ;
      }

      // const length = this.data.dataArray.length;
      if(this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books);
          this.unLocked();
        }, err => {
          this.unLocked();
        });
      }
    },

    onCancel(event) {
      this.initialize();
      this.triggerEvent('cancel', {}, {});
      this.setData({
        dataArray: []
      })
    },

    onConfirm(event) {
      this.initialize();

      const keyword = event.detail.value || event.detail.text;
      if(!keyword) {
        wx.showToast({
          title: '没有输入搜索内容嗷～',
          icon: 'none',
          duration: 1000
        });
        return ;
      }

      this._showResult();
      this._showLoadingCenter();
      bookModel.search(0, keyword).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        this.setData({
          q: keyword
        });
        keywordModel.addToHistory(keyword);
        this._hideLoadingCenter();
      })
    },

    onClear(event) {
      this.setData({
        q: '',
      });
      this._hideResult();
      this.initialize();
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    },

    _showResult() {
      this.setData({
        searching: true
      });
    },

    _hideResult() {
      this.setData({
        searching: false
      });
    }
  },
})
