// pages/exportinfo/exportinfo.js

var UtilCustom = require('../../utils/UtilCustom.js');
var util = require('../../utils/util.js');
const utilFileManage = require('../../utils/utilFileManage.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        YearData: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        Yearindex: '',
        MonthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', ],
        Monthindex: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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



        //UtilCustom.toastNaviBack('建设中', 'none');

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
    bingBtnExport: function(e) {

        wx.showLoading({
            title: '数据生成中，请稍候',
        })

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


        const Manager = wx.getFileSystemManager()

        var dirPath = `${wx.env.USER_DATA_PATH}/cache`;
        var fatherDirPath = `${wx.env.USER_DATA_PATH}`

        var filePath = `${wx.env.USER_DATA_PATH}/cache/cache.txt`;

        var jsonstr = JSON.stringify(dailyrecord)

        this.exportData(Manager, dirPath, filePath, jsonstr);

        wx.hideLoading()

    },
    async exportData(Manager, dirPath, filePath, data) {

        // 第三步： 写入文件

        const resdirExist = await utilFileManage.dirExist(Manager, dirPath);
        // fail no such file or directory

        if (resdirExist.errMsg.indexOf("ok") != -1) {
            // dir path is exist , nothing
            console.log('resdirExist resolved');
        } else {
            // dir path is not exist , create dir path
            console.log('resdirExist reject');
            await utilFileManage.dirCreate(Manager, dirPath);
        }

        const writeFileRes = await utilFileManage.writeFile(Manager, filePath, data);
        console.log(writeFileRes);

    }

})