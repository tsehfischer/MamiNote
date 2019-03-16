// pages/searchinfo/searchinfo.js

var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dailyrecordinfo: [],

        YearData: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        Yearindex: '',
        MonthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', ],
        Monthindex: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("进入search page");

        var tmpdate = new Date();
        var currentYear = tmpdate.getFullYear().toString();
        var curYearIndex = this.data.YearData.indexOf(currentYear);

        this.setData({
            Yearindex: curYearIndex
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
        wx.showShareMenu({
            withShareTicket: true
        })
    },

    bindYearPicker: function(e) {
        this.setData({
            Yearindex: e.detail.value
        })
    },

    bindMonthPicker: function(e) {
        this.setData({
            Monthindex: e.detail.value
        })
    },

    bingBtnSearch: function(e) {
        var currMonthLastday = util.getLastDay(this.data.YearData[this.data.Yearindex], this.data.MonthData[this.data.Monthindex]);
        var currMonthFirstDay = this.data.YearData[this.data.Yearindex] + this.data.MonthData[this.data.Monthindex] + '01';
        let dailyrecord = [];

        for (var curday = currMonthFirstDay; curday <= currMonthLastday; curday++) {

            try {
                const res = wx.getStorageSync(curday.toString())
                if (res) {
                    dailyrecord.push({
                        date: curday.toString(),
                        t0: res.t0,
                        t1: res.t1,
                        t2: res.t2,
                        t3: res.t3,
                    });
                }
            } catch (e) {
                // Do something when catch error
            }
        }

        this.setData({
            dailyrecordinfo: dailyrecord
        })

    }
})