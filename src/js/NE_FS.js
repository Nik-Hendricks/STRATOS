var db = new Nedb({filename: `filesystem.db`, autoload: true})

const FS = {
    mkdir(){},
    
}

const FSSingleton = FS;

window.FS = FSSingleton // web

export default window.FS // this will initialise the singleton instantly