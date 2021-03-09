const dirExist = (Manager, dirPath) => {
    return new Promise((resolve, reject) => {
        Manager.access({
            path: dirPath,
            complete: res => {
                resolve(res)
            }
        })
    })
}

const dirCreate = (Manager, dirPath) => {
    return new Promise((resolve, reject) => {
        Manager.mkdir({
            dirPath: dirPath,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}


const readdir = (Manager, dirPath) => {
    return new Promise((resolve, reject) => {
        Manager.readdir({
            dirPath: dirPath,
            complete: res => {
                resolve(res)
            }
        })
    })
}

const writeFile = (Manager, filePath, data) => {
    return new Promise((resolve, reject) => {

        Manager.writeFile({
            filePath: filePath,
            data: data,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

const readFile = (Manager, filePath) => {
    return new Promise((resolve, reject) => {
        Manager.readFile({
            filePath: filePath,
            encoding: 'utf8',
            complete: res => {
                resolve(res)
            }
        })
    })
}

const unlink = (Manager, filePath) => {
    return new Promise((resolve, reject) => {
        Manager.unlink({
            filePath: filePath,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

const saveFile = (Manager, filePath) => {
    return new Promise((resolve, reject) => {
        Manager.saveFile({
            tempFilePath: filePath,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

module.exports = {
    dirExist,
    dirCreate,
    readdir,
    writeFile,
    readFile,
    unlink,
    saveFile
}