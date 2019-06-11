// pages/order/voucher/voucher
const app = getApp();
const core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{},
    voucher:""
  },
  upload(e){
    var {type} = e.currentTarget.dataset;
    if (type == "image"){
      core.upload(res=>{
        if (res.status==1){
          this.setData({
            voucher:res.url
          })
        }else{
          console.log(res.status)
        }
      })
    } else if (type == "image-remove"){
      this.setData({
        voucher: ""
      })
    } else if (type == "image-preview"){
      console.log(this.data.voucher)
      wx.previewImage({
        current: this.data.voucher,
        urls: [this.data.voucher]
      });
    }
  },
  submit(){
    if (!this.data.voucher){
      core.toast("请上传凭证","none")
      return;
    }
    core.confirm("确认上传该凭证？",()=>{
      core.post("order/proof/post",{
        id: this.data.options.id,
        url: this.data.voucher
      },res=>{
        if(res.error==0){
          wx.reLaunch({
            url: '/pages/member/index/index',
          })
        }else{
          core.alert(res.message,()=>{
            console.log(res.message)
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ options })
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