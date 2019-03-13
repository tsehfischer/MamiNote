// pages/noteinfo/noteinfo.js

var util = require('../../utils/util.js');
var UtilCustom = require('../../utils/UtilCustom.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        curr_date: "",
        timearea: ["早空腹", "早饭后", "午饭后", "晚饭后"],
        timeindex: "0",
        dailydata: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("进入noteinfo page");
        var datestamp = new Date();
        var currdate = util.formatTime(datestamp);

        console.log("今天日期是：" + currdate);
        // var divdate = currdate - 26;
        // console.log("26天前日期是：" + divdate);

        this.setData({
            curr_date: currdate
        })

        var that = this;
        wx.getStorage({
            key: currdate,
            success(res) {
                that.setData({
                    dailydata: res.data
                })
            }
        })


    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log("====== data ======")
        console.log(this.data);
        console.log("====== data ======")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /*
     * 时间段选择
     */
    bindTimeChange: function(e) {
        this.setData({
            timeindex: e.detail.value
        })
    },

    bindformSubmit: function(e) {
        if (!e.detail.value.dailydata) {
            wx.showToast({
                title: '请输入检测值',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        var objectName = "t" + e.detail.value.dailytime;
        if (this.data.dailydata[objectName]) {
            wx.showToast({
                title: '该时段已有记录，请更换时段',
                icon: 'none',
                duration: 2000
            })
            return;

        }

        switch (e.detail.value.dailytime) {
            case "0": //早空腹
                this.setData({
                    ["dailydata.t0"]: e.detail.value.dailydata
                })
                break;
            case "1": //早饭后
                this.setData({
                    ["dailydata.t1"]: e.detail.value.dailydata
                })
                break;
            case "2": //午饭后
                this.setData({
                    ["dailydata.t2"]: e.detail.value.dailydata
                })
                break;
            case "3": //晚饭后
                this.setData({
                    ["dailydata.t3"]: e.detail.value.dailydata
                })
                break;
        }

        try {
            wx.setStorageSync(this.data.curr_date, this.data.dailydata)
        } catch (e) {}

        // 弹出 保存成功
        UtilCustom.toastNaviBack('保存成功', 'success');

    }
})