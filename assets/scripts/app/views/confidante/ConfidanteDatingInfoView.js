var list=require("../../component/List");
var item = require("../item/ItemSlotUI");
var role=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        lblTitle:{
            //标题
            default:null,
            type:cc.Label
        },
        lblDes:{
            //说明
            default:null,
            type:cc.Label
        },
        lblPoint:{
            //最高分
            default:null,
            type:cc.Label
        },
        lblCount:{
            //剩余次数
            default:null,
            type:cc.Label
        },
        //奖励列表
        lstItem:{
            default:[],
            type:item.default
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
    onClickRwd() {
        //奖励列表
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
