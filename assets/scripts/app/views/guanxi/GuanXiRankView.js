var list=require("../../component/List");
var role=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        //列表
        list:{
            default:null,
            type:list.default
        },
    },


    onLoad () {
        //选中关系好友
        this.updateRankList();
    },

    // start () {},
    // update (dt) {},

    updateRankList(){
        //刷新好友列表
        this.list.data = init.guanxiProxy.relation;
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
