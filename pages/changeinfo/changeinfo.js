// pages/noteinfo/noteinfo.js

var util = require('../../utils/util.js');
var UtilCustom = require('../../utils/UtilCustom.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        curr_date: [],
        currindex: '0',
        timearea: ["早空腹", "早饭后", "午饭后", "晚饭后"],
        timeindex: '0',
        inputvalue: '',
        dailydata: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("进入changeinfo page");
        var datearray = [];
        // 获取当前 Local Storage
        try {
            const res = wx.getStorageInfoSync();
            datearray = res.keys;
            var i = datearray.length;
            while (i--) {
                if (datearray[i] === 'logs') {
                    datearray.splice(i, 1);
                    break;
                }
            }
        } catch (e) {}

        this.setData({
            curr_date: datearray
        })


        var tmpObjName = "t" + this.data.timeindex;
        var that = this;
        wx.getStorage({
            key: that.data.curr_date[that.data.currindex],
            success(res) {
                if (res.data[tmpObjName]) {
                    that.setData({
                        inputvalue: res.data[tmpObjName],
                        dailydata: res.data
                    })
                } else {
                    that.setData({
                        inputvalue: ''
                    })
                }
            }
        })

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        wx.showShareMenu({
            withShareTicket: true
        })
    },

    /**
     * 选择需要修改的日期
     */
    bindCurrDate: function(e) {
        this.setData({
            currindex: e.detail.value
        })

        var tmpObjName = "t" + this.data.timeindex;
        var that = this;
        wx.getStorage({
            key: that.data.curr_date[that.data.currindex],
            success(res) {
                if (res.data[tmpObjName]) {
                    that.setData({
                        inputvalue: res.data[tmpObjName],
                        dailydata: res.data
                    })
                } else {
                    that.setData({
                        inputvalue: ''
                    })
                }
            }
        })
    },

    /*
     * 时间段选择
     */
    bindTimeChange: function(e) {
        this.setData({
            timeindex: e.detail.value
        })

        var tmpObjName = "t" + this.data.timeindex;
        var that = this;
        wx.getStorage({
            key: that.data.curr_date[that.data.currindex],
            success(res) {
                if (res.data[tmpObjName]) {
                    that.setData({
                        inputvalue: res.data[tmpObjName],
                        dailydata: res.data
                    })
                } else {
                    that.setData({
                        inputvalue: ''
                    })
                }
            }
        })

    },

    bindformSubmit: function(e) {
        if (!e.detail.value.dailydata) {
            wx.showToast({
                title: '请输入检测值',
                icon: 'none',
                duration: 1000
            })
            return;
        }

        var objectName = "t" + e.detail.value.dailytime;
        // if (this.data.dailydata[objectName]) {
        //     wx.showToast({
        //         title: '该时段已有记录',
        //         icon: 'none',
        //         duration: 1000
        //     })
        //     return;

        // }

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
            wx.setStorageSync(this.data.curr_date[this.data.currindex], this.data.dailydata)
        } catch (e) {}

        // 弹出 保存成功
        UtilCustom.toastNaviBack('修改成功', 'success');

    }
})