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
        lstLevel:{
            //等级列表
            default:null,
            type:list.default
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        },
        lblDes:{
            //说明
            default:null,
            type:cc.Label
        }        
    },


    onLoad () {
        this.init();
    },

    // start () {

    init () {
        //领奖返回
        facade.subscribe(init.confidanteProxy.ON_CON_RELATION_GET_RWD, this.updateData, this);
        this.updateData();
    },
    // },

    // update (dt) {},
    updateData () {
        var heroCfg = localcache.getItem(localdb.table_hero, init.confidanteProxy.hero.id);
        if(heroCfg == null)
        {
            return;
        }
        //name
        this.lblName.string = heroCfg.name;

        //des
        this.lblDes.string = heroCfg.txt;

        //list
        var levelLst = localcache.getList(localdb.table_confidante_level);
        this.lstLevel.data = levelLst;
    },

    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
