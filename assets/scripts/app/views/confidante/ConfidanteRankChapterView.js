var list=require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        lstCpt:{
            //排行列表
            default:null,
            type:list.default
        },
    },

    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_DATING_RANK_SLECT, this.onClickClose, this); //点击章节关闭本界面
        this.init();
    },

    init () {
        //初始化显示第一章的排行
        this.lstCpt.data = init.confidanteProxy.getChapterById();
    },

    // update (dt) {},
   
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
