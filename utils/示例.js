// onLoad: function() {
//         this.initData();
//     },

//     async initData() {
//         await this.initMyData(); //请求接口1
//         await this.initTodayData(); //请求接口2
//     }

// initMyData: function() {
//     console.log('开始请求1')
//         ........
//         //回调函数的方法内写
//     console.log("完成请求1")


// }

// initTodayData: function() {
//     console.log('开始请求2')
//         ........
//         //回调函数的方法内写
//     console.log("完成请求2")
// }


Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.testing()
        this.promiseFn()
        await this.testAsync()
    },



    testing() {
        console.log('test')
    },

    promiseFn() {
        this.testPromise().then((res) => {
            console.log(res)
        })
    },

    testPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Promise handle')
                resolve(123)
            }, 2000)
        })
    },

    async testAsync() {
        const result = await this.testPromise()
        console.log('async test--', result)
    }
})