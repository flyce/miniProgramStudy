// components/music/index.js
import { classicBeh } from '../classic-beh';

const mMgr = wx.getBackgroundAudioManager();

Component({
  behaviors: [classicBeh], 
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function() {
    this._recoverStatus();
    this._monitorSwitch()
  },

  detached: function() {
    // mMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      if(!this.data.playing) {
        this.setData({
          playing: true
        });
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause()
      }
    },

    _recoverStatus: function() {
      if(mMgr.paused) {
        this.setData({
          playing: false
        });
        return ;
      }
  
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });

      mMgr.onPause(() => {
        this._recoverStatus();
      });

      mMgr.onStop(() => {
        this._recoverStatus();
      });

      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    }
  }
})
