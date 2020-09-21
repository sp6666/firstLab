var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var initializer = require("../../Initializer");

cc.Class({
    extends: cc.Component,

    properties: {
        btn_add:{
            default:null,
            type:cc.Button
        },
        btn_delete:{
            default:null,
            type:cc.Button
        },
        btn_blacklist:{
            default:null,
            type:cc.Button
        },
        btn_visit:{
            default:null,
            type:cc.Button
        },
        btn_chat:{
            default:null,
            type:cc.Button
        },
        btn_back:{
            default:null,
            type:cc.Button
        },
        btn_sister:{
            default:null,
            type:cc.Button
        },
        list:{
            default:null,
            type:list.default
        },
        sister:{
            default:null,
            type:cc.Node
        },
        self:{
            default:null,
            type:cc.Node
        },
        roleSpine:{
            default:null,
            type:roleSpine.default
        },
        sister_num:{
            default:null,
            type:cc.Label
        }

        
    },


    onLoad () {
        this.list.data=initializer.chatProxy.getXXXXX();//聊天记录，但不是这个协议获取
        
    },

    // start () {

    // },

    // update (dt) {},
});
