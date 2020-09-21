var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        //黑名单列表
        blackLlist:{
            default:null,
            type:list.default
        }
    },


    onLoad () {
        facade.subscribe(init.chatProxy.UPDATE_BLACK_MSG, this.updateBlackList, this);    //搜索列表
        
        init.chatProxy.sendBlackList();    //黑名单
    },

    // start () {

    // },

    // update (dt) {},

    updateBlackList() {
        //申请列表
        var list = [];
        if(init.chatProxy.blackMsg.length > 0)
        {
            for(var idx = 0; idx < init.chatProxy.blackMsg.length; idx++)
            {
                var item = init.chatProxy.blackMsg[idx].user;
                item.type = 5;
                list.push(item);
            }
        }
        
        this.blackLlist.data = list;
    },
    onClickClose() {
        utils.utils.closeView(this);
    },
});
