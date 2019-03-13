const toastNaviBack = (toastText, icon) => {
    wx.showToast({
        title: toastText,
        icon: icon,
        duration: 2000,
    })

    setTimeout(function() {
        wx.navigateBack({
            delta: 1
        })
    }, 2000);
}



module.exports = {
    toastNaviBack: toastNaviBack
}