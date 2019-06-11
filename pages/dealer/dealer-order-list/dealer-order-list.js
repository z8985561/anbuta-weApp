// pages/dealer/dealer-order-list/dealer-order-list.js
const app = getApp();
const core = app.requirejs("core");
let nowDate = new Date().getFullYear() + "-" + addZero(new Date().getMonth() + 1) + "-" + new Date().getDate();
let nowDate2 = new Date().getFullYear() + "-" + addZero(new Date().getMonth() + 1) ;
function addZero(number){
  var num = parseInt(number);
  if (num <10){
    return "0"+num;
  }else{
    return num;
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: "",
    list: [],
    member:{},
    page: 1,
    time: nowDate2,
    endTime: nowDate
  },
  get_list: function () {
    core.get("commission/order/get_anbutalist",{
      mopenid: this.data.mid,
      date: this.data.time
    },res=>{
      if(res.error==0){
        this.setData({
          list:res.list,
          member:res.member,
          ordermoney: res.ordermoney
        })
      }else{
        console.log(res.error)
      }
    })
  },
  chooseTime(e){
    this.setData({
      time: e.detail.value
    })
    this.get_list();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid:options.mid
    })
    this.get_list();
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