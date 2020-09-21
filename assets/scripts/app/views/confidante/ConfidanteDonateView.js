var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var urlLoad = require("../../component/UrlLoad");
cc.Class({
    extends: cc.Component,

    properties: {
        lstIntimacy:{
            //赠送列表
            default:null,
            type:list.default
        },
        lblIntimacy:{
            //好感度
            default:null,
            type:cc.Label
        },
        animUpGrade:{
            //升级
            default:null,
            type:sp.Skeleton
        }
    },


    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_GIFT_BACK, this.init, this); //赠送返回
        facade.subscribe(init.confidanteProxy.ON_CONFIDANTE_UPGRADE, this.showUpGread, this); //亲密度升级
        this.init();
    },

    // start () {

    init () {
        this.updateData();
        this.updateList();

        facade.send(init.confidanteProxy.ON_CONFIDANTE_ACCOMPANY);  //刷新界面
    },
    // },

    // update (dt) {},
    updateData () {
        this.lblIntimacy.string = init.confidanteProxy.hero.heros.curr;
    },

    updateList () {
        //更新赠送物品列表
        var donateLst = localcache.getItem(localdb.table_confidante_donate, init.confidanteProxy.hero.id + "");
        if(donateLst)
        {
            var tmpLst = [];
            for(var idx = 0; idx < donateLst.items.length; idx++)
            {
                var item = {};
                item.id = donateLst.items[idx];
                tmpLst.push(item);
            }
            this.lstIntimacy.data = tmpLst;
        }

        this.animUpGrade.node.active = false;
    },
    showUpGread() {
        //显示升级特效
        var self = this;
        self.animUpGrade.node.active = true;
        utils.utils.showSpine(this.animUpGrade, "animation", false, function(){
            self.animUpGrade.node.active = false;
        });
    },

    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
