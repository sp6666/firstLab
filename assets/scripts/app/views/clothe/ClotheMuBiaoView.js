var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        listMB:{
            //列表
            default:null,
            type:list.default
        },
        barMB:{
            //进度条
            default:null,
            type:cc.ProgressBar
        },
        nodeMB:{
            //进度条
            default:null,
            type:cc.Node
        },
        nodeListItem:{
            //列表项
            default:null,
            type:cc.Node
        },
        lblCurCount:{
            //当前通关次数
            default:null,
            type:cc.Label
        }
    },


    onLoad () {
        facade.subscribe(init.clothePveProxy.CLOTHE_PVE_GET_RWD_BACK, this.init, this); //获得好友列表
        this.init();
    },

    // start () {

    init () {
        if(!init.clothePveProxy.info.grade)
        {
            //log
            return;
        }
        init.clothePveProxy.canUseCount = 0;
        init.clothePveProxy.usedCount = 0;

        //列表
        var grades = init.clothePveProxy.info.grade;
        var gradeList = [];
        for(var key in grades)
        {
            var item = {};
            item.target = parseInt(key);

            item.rwd = [];
            for(var rwdKey in grades[key])
            {
                var it = new uiUtils.ItemSlotData();
                it.itemid = grades[key][rwdKey].id;
                it.count = grades[key][rwdKey].count;
                it.kind = grades[key][rwdKey].kind;
                item.rwd.push(it)
            }
            
            gradeList.push(item);
        }

        gradeList.sort(this.gradeListSort);
        this.listMB.data = gradeList;

        //进度条
        this.barMB.node.width = gradeList.length * this.nodeListItem.getContentSize().height - 10;
        this.nodeMB.width = this.barMB.node.width;
        //百分比
        this.barMB.progress = (init.clothePveProxy.canUseCount + init.clothePveProxy.usedCount) / gradeList.length;
        //this.nodeMB.width = (init.clothePveProxy.canUseCount + init.clothePveProxy.usedCount) / gradeList.length * this.barMB.node.width;
        //当前通关次数
        this.lblCurCount.string = i18n.t("CLOTHE_PVE_LBL_CUR_COUNT", { num:init.clothePveProxy.base.clear_count });
    },
    // },

    // update (dt) {},

    gradeListSort(r,t) {
        return (r.target - t.target);
    },

    onClickClose() {
        utils.utils.closeView(this, true);
    },
    onClickBack() {
    },
});
