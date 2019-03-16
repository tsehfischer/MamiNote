// pages/record/record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemList: [{
                name: "记录",
                url: "../noteinfo/noteinfo",
                pic: "../../image/navigator/noteinfo.png"
            },
            {
                name: "修改",
                url: "../changeinfo/changeinfo",
                pic: "../../image/navigator/changeinfo.png"
            },
            {
                name: "查询",
                url: "../searchinfo/searchinfo",
                pic: "../../image/navigator/searchinfo.png"
            },
            {
                name: "导出",
                url: "../exportinfo/exportinfo",
                pic: "../../image/navigator/exportinfo.png"
            },
            {
                name: "清空",
                url: "../clear/clear",
                pic: "../../image/navigator/trash.png"
            }
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("进入record page");
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
        //显示
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        wx.showShareMenu({
            withShareTicket: true
        })
    }
})