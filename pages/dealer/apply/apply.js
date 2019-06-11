// pages/dealer/apply/apply.js
const app = getApp();
const core = app.requirejs("core");
const jq = app.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qualification:{
      companyName:"",
      corporationName:"",
      corporationMobile:"",
      regional:"",
      workPath:"",
      salesmanId:""
    },
    showPicker:false,
    pval: [0, 0, 0],
    pvalOld: [0, 0, 0],
    ifCheck:false,
    detail: {
      realname: "",
      mobile: "",
      areas: "",
      street: "",
      address: ""
    },
  },
  selectArea(){
    this.setData({
      showPicker: true
    })
  },
  bindChange: function (t) {
    var e = this.data.pvalOld,
      a = t.detail.value;
    e[0] != a[0] && (a[1] = 0), e[1] != a[1] && (a[2] = 0), this.setData({
      pval: a,
      pvalOld: a
    })
  },
  onCancel(){
    this.setData({
      showPicker: !1
    })
  },
  onConfirm: function (t) {
    var e = this.data.pval,
      a = this.data.areas,
      i = this.data.detail;
    i.province = a[e[0]].name, i.city = a[e[0]].city[e[1]].name, i.datavalue = a[e[0]].code + " " + a[e[0]].city[e[1]].code, a[e[0]].city[e[1]].area && a[e[0]].city[e[1]].area.length > 0 ? (i.area = a[e[0]].city[e[1]].area[e[2]].name, i.datavalue += " " + a[e[0]].city[e[1]].area[e[2]].code) : i.area = "", i.street = "", this.setData({
      detail: i,
      streetIndex: 0,
      showPicker: !1
    })
  },
  formSubmit: function (e) {
    console.log(e.detail);
    let formData = e.detail.value;
    formData.formId = e.detail.formId;
    if (!jq.trim(formData.companyName)){
      core.toast("请输入公司名称","none");
      return;
    }
    if (!jq.trim(formData.corporationMobile) || !jq.isMobile(formData.corporationMobile)) {
      core.toast("法人手机格式错误", "none");
      return;
    }
    if (!jq.trim(formData.corporationName)) {
      core.toast("请输入法人名称", "none");
      return;
    }
    if (!jq.trim(formData.regional)) {
      core.toast("请选择省市区", "none");
      return;
    }
    if (!jq.trim(formData.salesmanId)) {
      core.toast("请输入推销员ID", "none");
      return;
    }
    if (!jq.trim(formData.workPath)) {
      core.toast("请输入详细地址", "none");
      return;
    }
    if (!formData.agreement.length){
      core.toast("请同意入驻申请须知协议", "none");
      return;
    }else{
      formData.agreement = formData.agreement.join();
    }
    core.post("member.qualification.post", formData,res=>{
      console.log(res)
      if(res.error==0){
        wx.reLaunch({
          url: '/pages/dealer/apply/check',
        })
      }else{
        core.toast(res.message,"none");
      }
    })
  },
  checkboxChange(e){
    console.log(e)
  },
  toAgreement(e){
    console.log(e)
  },
  getApplyInfo(){
    core.get("member.qualification",{},res=>{
      console.log(res)
      if(res.error == 0){
        this.setData({
          qualification: res.qualification
        })
      }else{
        console.log(res.error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAreas();
    this.setData({
      isIpx:app.getCache("isIpx")
    })
    this.getApplyInfo();
  },
  getAreas(){
    let areas = app.getCache("cacheset").areas;
    if (areas){
      this.setData({
        areas
      });
    }
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