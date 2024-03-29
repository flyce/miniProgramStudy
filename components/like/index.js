// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false,
      observe: () => {

      }
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yseSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      if(this.properties.readOnly) {
        return ;
      }

      let { like, count } = this.properties;
      count = like ? count - 1 : count + 1;
      this.setData({
        count,
        like: !like
      });

      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', { behavior }, {});
    }
  }
})
