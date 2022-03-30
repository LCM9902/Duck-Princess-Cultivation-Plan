Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: '',
    operatorType: {
      COMPLETE_MISSION: 'complete mission',
      EXCHANGE_REWARDS: 'exchange rewards'
    }
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
    this.getRecord();
  },

  formatDateTime() {
    var date = new Date();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return m + '-' + d+' '+h+':'+minute;
  },

  showMissionModal(event){
    const goodsId = event.target.id;
    const data = this.data.record.find(item => {
      return item._id === goodsId
    })
    const exchangeRewards = this.exchangeRewards;
    wx.showModal({
      title: '请确认',
      content: '兑换 '+data.goods_content,
      success (res) {
        if (res.confirm) {
          exchangeRewards(data)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  exchangeRewards(goods) {
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectUser',
      }
    }).then((resp) => {
      const userIntegral = resp.result.data[0].user_integral
      if (userIntegral < goods.goods_integral) {
        wx.showToast({
          title: '鸡分不足',
          icon: 'error',
          duration: 2000
        })
      } else {
        const date = this.formatDateTime();
        wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'setOperator',
          data: {
            goods_id: goods._id,
            operator_type: 'exchange rewards',
            operator_time: date
          }
        }
      }).then((resp) => {
        wx.cloud.callFunction({
          name: 'quickstartFunctions',
          config: {
            env: this.data.envId
          },
          data: {
            type: 'updateUser',
            data: {
              integral: -goods.goods_integral
            }
          }
        }).then(resp => {
          wx.hideLoading()
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000
          })
        })
      }).catch((e) => {
      });
      }
    })
    
    
 },

  getRecord() {
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectGoods'
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        record: resp.result.data
      });
      wx.hideLoading();
   }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
   });
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  }
});
