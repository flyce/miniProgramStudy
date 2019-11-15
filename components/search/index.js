// components/search/index.js
import { KeywordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "_load_more"
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
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
    _load_more() {
      console.log(123123);
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
    },

    onConfirm(event) {
      this.setData({
        searching: true
      });
      const keyword = event.detail.value || event.detail.text;
      bookModel.search(0, keyword).then(res => {
        this.setData({
          dataArray: res.books,
          q: keyword
        });
        keywordModel.addToHistory(keyword);
      })
    },

    onClear(event) {
      this.setData({
        q: '',
        searching: false
      });
    }
  },
})
