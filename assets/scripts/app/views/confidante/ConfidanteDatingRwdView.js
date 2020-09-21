var list=require("../../component/List");
var item = require("../item/ItemSlotUI");
var role=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        //奖励列表
        lstRwd:{
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
        var lst = [];
        for(var idx = 0; idx < init.confidanteProxy.curShowRwd.length; idx++)
        {
            var it = new uiUtils.ItemSlotData();
            it.id = init.confidanteProxy.curShowRwd[idx].id;
            it.kind = init.confidanteProxy.curShowRwd[idx].kind;
            it.count = init.confidanteProxy.curShowRwd[idx].count;
            lst.push(it);
        }
        this.lstRwd.data = lst;
    },
    onClickClose() {
        init.confidanteProxy.curShowRwd = [];
        utils.utils.closeView(this, true);
    },
});
