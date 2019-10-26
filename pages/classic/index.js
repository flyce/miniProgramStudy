import { ClassicModel } from '../../models/classic';
import { LikeModel } from '../../models/like';

const classicModel = new ClassicModel();
const likeModel = new LikeModel();

// pages/classic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res
      });
    })
  },

  onLike: function (event) {
    console.log(event);
    const { behavior } = event.detail;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },

  onNext: function(event) {

  },

  onPrvious: function(event)  {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})