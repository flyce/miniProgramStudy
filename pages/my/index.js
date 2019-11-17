// pages/my/index.js
import { ClassicModel } from '../../models/classic';
import { BookModel } from '../../models/book';

const classicModel = new ClassicModel();
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: '',
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if(data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true
              });
            }
          })
        } else {
          console.log('err');
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      });
    }
  },

  getMyBookCount() {
    bookModel.getBookCount().then(res => {
      this.setData({
        bookCount: res.count
      });
    });
  },

  getMyFavor() {
    classicModel.getMyFavor(res=> {
      this.setData({
        classics: res
      });
    })
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/book/index'
    })
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