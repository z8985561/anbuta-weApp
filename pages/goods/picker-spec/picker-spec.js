// pages/goods/picker-spec/picker-spec.js
const app = getApp();
const core = app.requirejs("core");
const jq = app.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    goodsInfo: {},
    active: 0,
    sumNumber:0,
    sumPrice:"0.00"
  },
  changeActive(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      active: index
    })
  },
  // 加减事件
  number(e){
    let { index, max, action } = e.currentTarget.dataset;
    let option = this.data.goodsInfo.option;
    let active = this.data.active;
    max = parseInt(max)
    if (action == "plus"){
      let total = this.plus(option[active].children[index].total);
      if (total > max ){
        core.toast(`最多购买${max}件`, "none");
        option[active].children[index].total = max;
      }else{
        option[active].children[index].total = total;
      }
    } else if (action == "minus"){
      option[active].children[index].total = this.minus(option[active].children[index].total);
    }

    this.setData({
      ["goodsInfo.option"]: option
    })
    this.sum();
  },
  inputNumber(e){
    let { index, max, action } = e.currentTarget.dataset;
    let option = this.data.goodsInfo.option;
    let active = this.data.active;
    let value = parseInt(e.detail.value);
    max = parseInt(max);
    if (value > max){
      core.toast(`最多购买${max}件`,"none");
      value = max;
    }else{
      option[active].children[index].total = value;
    }
    this.setData({
      ["goodsInfo.option"]: option
    })
    this.sum();
  },
  // 加事件
  plus(total){
    if (!total){
      return 1;
    }else{
      return 1+parseInt(total);
    }
  },
  minus(total){
    if (!total || total <=0){
      return 0;
    }else{
      return total - 1;
    }
  },
  // 合计数量 和金额
  sum(){
    let sumNumber = 0;
    let sumPrice = 0;
    let option = this.data.goodsInfo.option;
    option.forEach(item=>{
      item.children.forEach(children=>{
        if (children.total){
          sumNumber = sumNumber + parseInt(children.total);
          sumPrice = sumPrice + parseInt(children.total) * parseFloat(children.marketprice);
        }
      })
    })
    this.setData({
      sumNumber: sumNumber,
      sumPrice: jq.toFixed(sumPrice,2)
    })
  },
  //提交事件
  submit(){
    let option = this.data.goodsInfo.option;
    let goodsArr = [];
    option.forEach(item => {
      item.children.forEach(children => {
        if (children.total > 0) {
          goodsArr.push(children)
        }
      })
    })
    if (!goodsArr.length){
      core.toast(`未选择任何产品`, "none");
      return;
    }
    if (this.options.type == "buy"){
      this.buy(goodsArr)
    } else if (this.options.type == "cart"){
      this.addCart(goodsArr)
    }
  },
  // 购买事件
  buy(goodsArr){
    let option = JSON.stringify(goodsArr);
    let id = this.options.id;
    wx.navigateTo({
      url: `/pages/order/create/index?id=${id}&option=${option}`,
    })
  },
  // 加入购物车事件
  addCart(goodsArr){
    core.post("member.cart.add",{
      id:this.options.id,
      option: goodsArr
    },res=>{
      if(res.error==0){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getGoodsInfo();
    // console.log(jq.toFixed(9.222222, 2))
  },
  getGoodsInfo() {
    core.get("goods.anbuta_picker", {
      id: this.options.id
    }, res => {
      wx.hideLoading();
      if (res.error == 0) {
        this.setData({
          goodsInfo: res.goods
        })
      } else {
        core.toast(res.message, "none")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})