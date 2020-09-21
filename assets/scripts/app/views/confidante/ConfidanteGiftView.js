var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var urlLoad = require("../../component/UrlLoad");
var cash = require("./ConfidanteCashShow");
cc.Class({
    extends: cc.Component,

    properties: {
        cashItem:{
            //兑换道具
            default:null,
            type:cash.default
        },
        lstItem:{
            //显示按钮
            default:null,
            type:list.default
        },
        nodeGift:{
            //商城按钮
            default:null,
            type:cc.Node
        },
        nodeGallery:{
            //时装按钮
            default:null,
            type:cc.Node
        }
    },

    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_DONATE_GIFT, this.onUpdateGift, this); //点击陪伴更新界面 
        this.init();
    },

    // start () {

    init () {
        this.onClickGift();
    },
    // },

    // update (dt) {},
    updateData (type) {
        //更新按钮 1是服装， 2是绘画
        this.nodeGift.active = type == 1;
        this.nodeGallery.active = type == 2;

        //兑换道具
        var cash = localcache.getItem(localdb.table_confidante_donate, init.confidanteProxy.hero.id);
        if(cash)
        {
            var id = type == 1 ? cash.item_cash : cash.gallery_cash;
            this.cashItem.updateItem(id);
        }

        //更新商城
        var gft = type == 1 ? localcache.getList(localdb.table_confidante_clothe) : localcache.getList(localdb.table_confidante_gallery);
        var curGiftList = [];
        for(var idx = 0; idx < gft.length; idx++)
        {
            if(init.confidanteProxy.hero.id == gft[idx].hid && gft[idx].is_unlock != 0)
            {
                gft[idx].purchase = !this.canPurchase(gft[idx]);    //是否已经购买
                gft[idx].type = type;
                curGiftList.push(gft[idx]);
            }
        }

        curGiftList.sort(function(t, r){
            if(!t.purchase && !r.purchase){
                return t.id < r.id ? -1 : 1;
            }
            else{
                return t.purchase > r.purchase ? -1 : 1; 
            }
        })
        this.lstItem.data = curGiftList;
    },
    canPurchase(gft) {
        //是否已购买
        if(gft.type == 1)
        {
            //时装
            for(var key in init.confidanteProxy.hero.heros.clothes){
                if(init.confidanteProxy.hero.heros.clothes[key] == gft.id)
                {
                    return false;
                }
            }
        }
        else if(gft.type == 2)
        {
            //绘画
            for(var key in init.confidanteProxy.hero.heros.paints){
                if(init.confidanteProxy.hero.heros.paints[key] == gft.id)
                {
                    return false;
                }
            }
        }
        else
        {
            //都不是就不让买
            return false;
        }

        return true;
    },
    onUpdateGift() {
        this.updateData(init.confidanteProxy.curGiftType);
        facade.send(init.confidanteProxy.ON_CON_DONATE_TO_VIEW);
    },
    onClickGift() {
        //点击商城
        this.updateData(1);
    },
    onClickGallery() {
        //点击绘画
        this.updateData(2);
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
