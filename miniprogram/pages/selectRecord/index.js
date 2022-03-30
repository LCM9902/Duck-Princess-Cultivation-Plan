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
    this.getRecord()
  },

  formatDateTime(date) {
    console.log('date', date)
    console.log('date', new Date())
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
        type: 'selectOperator'
      }
    }).then((resp) => {
      const operatorData = resp.result.data.reverse();
      console.log('resp', resp)
      console.log('operatorData', operatorData)
      if(!operatorData.length){
        this.setData({
          haveGetRecord: true,
          record: ''
        });
        wx.hideLoading();
        return
      }
      operatorData.map(item => {
        item.operator_time = this.formatDateTime(new Date(item.operator_time))
        if (item.operator_type === this.data.operatorType.COMPLETE_MISSION){
          wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
              env: this.data.envId
            },
            data: {
              type: 'selectMission',
              event: {
                id: item.mission_id
              }
            }
          }).then(resp => {
            const missionData = resp.result.data[0];
            if(!missionData){
              wx.hideLoading();
              return
            }
            item.content = missionData.mission_content;
            item.integral = missionData.mission_integral;
            this.setData({
              haveGetRecord: true,
              record: operatorData
            });
            wx.hideLoading();
          })
        } else {
          wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
              env: this.data.envId
            },
            data: {
              type: 'selectGoods',
              event: {
                id: item.goods_id
              }
            }
          }).then(resp => {
            const goodsData = resp.result.data[0];
            if(!goodsData){
              wx.hideLoading();
              return
            }
            item.content = goodsData.goods_content;
            item.integral = goodsData.goods_integral;
            this.setData({
              haveGetRecord: true,
              record: operatorData
            });
            wx.hideLoading();
          })
        }
      })
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
