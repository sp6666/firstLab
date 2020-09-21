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
        urlRole:{
            //蓝颜形象
            default:null,
            type:urlLoad.default
        },
        lstClothe:{
            //衣服列表
            default:null,
            type:list.default
        },
        lblDes:{
            //说明
            default:null,
            type:cc.Label
        },
        lblUnLock:{
            //解锁条件
            default:null,
            type:cc.Label
        },
        lstClotheProp:{
            //属性
            default:null,
            type:list.default
        },
        nodeBot:{
            //底板
            default:null,
            type:cc.Node
        },
        nodeShow:{
            //显示按钮
            default:null,
            type:cc.Node
        },
        nodeHide:{
            //收起按钮
            default:null,
            type:cc.Node
        },
        nodeUnlock:{
            //解锁按钮
            default:null,
            type:cc.Node
        },
        /*
        showTag:{
            //显示按钮
            default:null,
            type:cc.Boolean
        },
        */
        tagNodeShow:{
            //显示按钮
            default:null,
            type:cc.Node
        },
        tagNodeHide:{
            //隐藏按钮
            default:null,
            type:cc.Node
        },
        tagNode:{
            //隐藏按钮
            default:null,
            type:cc.Sprite
        },
        tagContainerNode:{
            //属性界面
            default:null,
            type:cc.Node
        }
    },


    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CONFIDANTE_ACCOMPANY, this.updateData, this);          //点击陪伴更新界面  
        facade.subscribe(init.confidanteProxy.ON_CON_CHANGE_CLOTHE, this.updateOnClotheSelect, this);                   //刷新形象
        facade.subscribe(init.confidanteProxy.ON_CON_CHANGE_CLOTHE_LST, this.updateOnClotheSelect, this);               //刷新列表
        facade.subscribe(init.confidanteProxy.ON_CON_DONATE_GIFT, this.updateUnlockBack, this);         //解锁返回

        this.tagCtr = this.tagContainerNode.getComponent("TagInfo");
        this.tagNodeHide.active = false;
        this.tagNodeShow.active = true;
        this.showTag = false;
        utils.utils.showEffect(this.tagNode, 1);
        this.init();
    },

    // start () {

    init () {
        //进界面的时候先看有没有衣服id，没有衣服id就默认皇子id
        init.confidanteProxy.curClothe = init.confidanteProxy.hero.heros.clothes_id > 0 ? init.confidanteProxy.hero.heros.clothes_id : init.confidanteProxy.hero.id;

        this.updateData();
        this.updateClotheList();
        this.updateClotheInfo();
        this.onClickShowBot();
    },
    // },

    // update (dt) {},
    updateUnlockBack() {
        //更新兑换道具
        var cash = localcache.getItem(localdb.table_confidante_donate, init.confidanteProxy.hero.id);
        if(cash)
        {
            this.cashItem.updateItem(cash.gallery_cash);
        }

        //更新服饰
        this.onClickChange();
    },
    updateOnClotheSelect() {
        //选中衣服
        this.updateData();          //更新形象
        this.updateClotheList();    //刷新列表
        this.updateClotheInfo();    //刷新衣服数据
    },
    updateData () {
        //更新形象
        var data = init.confidanteProxy.hero;
        if(!data)
        {
            return;
        }

        //兑换道具
        var cash = localcache.getItem(localdb.table_confidante_donate, data.id);
        if(cash)
        {
            this.cashItem.updateItem(cash.item_cash);
        }

        //url
        var clothe = init.confidanteProxy.curClothe > 0 ? init.confidanteProxy.curClothe : (init.confidanteProxy.hero.heros.clothes_id > 0 ? init.confidanteProxy.hero.heros.clothes_id : data.id);
        var resId = init.confidanteProxy.getClotheResId(clothe);
        this.urlRole.url = uiUtils.uiHelps.getServantSpine(resId);

        //通知蓝颜界面
        if(init.confidanteProxy.hero.heros.clothes_id > 0)
        {
            facade.send(init.confidanteProxy.ON_CON_CHANGE_CLOTHE_TO_VIEW);
        }
    },

    updateClotheList () {
        //更新衣服列表
        this.lstClothe.data = init.confidanteProxy.getClotheList();
    },
    updateClotheInfo(){
        var data = init.confidanteProxy.hero;
        var clothe = init.confidanteProxy.curClothe;
        var cfg = localcache.getItem(localdb.table_confidante_clothe, clothe + "");
        if(!data || !cfg)
        {
            return;
        }
        
        //更新数据
        //说明
        this.lblDes.string = cfg.desc;

        //解锁条件
        this.nodeUnlock.active = cfg.is_unlock == 2 && init.confidanteProxy.checkUse(cfg.id) <= 0;    //目前道具解锁显示按钮
        switch(cfg.is_unlock)
        {
            case 0:
                {
                    //无条件解锁
                    this.lblUnLock.string = i18n.t("CONFIDANTE_TIP_CHANGE_LOCK");
                    break;
                }
            case 1:
                {
                    //亲密度解锁
                    this.lblUnLock.string = i18n.t("CONFIDANTE_TIP_CHANGE_UNLOCK_1", {lv:cfg.lv});
                    break;
                }
            case 2:
                {
                    //道具解锁
                    if(cfg.need.length > 0)
                    {
                        var need = cfg.need[0];
                        var item = localcache.getItem(localdb.table_item, need.item);
                        if(item)
                        {
                            this.lblUnLock.string = i18n.t("CONFIDANTE_TIP_CHANGE_UNLOCK_2", {num:need.count, name:item.name});
                        }
                    }
                    
                    break;
                }
        }

        //属性
        this.lstClotheProp.data = cfg.props;

        if(this.tagContainerNode)
        {
            if(this.tagContainerNode.clotheData && this.tagContainerNode.clotheData.id == cfg.id)
            {
                return;
            }
        }
        if(this.tagCtr) {
            this.tagContainerNode.clotheData = cfg;
            this.tagCtr.initTag();

            if(this.showTag == true)
            {
                this.tagNodeHide.active = true;
                this.tagNodeShow.active = false;
                utils.utils.showEffect(this.tagNode, 0);
            }
        }
    },

    onClickChange() {
        //选中服饰
        this.updateData();
        this.updateClotheList();
        this.updateClotheInfo();    //刷新衣服数据

        //发消息穿衣服
        init.confidanteProxy.sendFashion(init.confidanteProxy.curClothe);
        facade.send(init.confidanteProxy.ON_CON_CHANGE_CLOTHE);
    },

    onClickPeiBan() {
        //选中陪伴
        init.confidanteProxy.sendAccompany();
    },
    onClickTalk() {
        //更新聊天
        this.updateTalk();
    },

    onClickShowBot() {
        //显示信息
        this.nodeBot.stopAllActions();

        var size = this.nodeBot.getContentSize();

        var lastPt = new cc.Vec2(this.nodeBot.getPositionX(), 0);
        this.nodeBot.setPosition(this.nodeBot.getPositionX(), 0 - size.height);

        var self = this;
        this.nodeBot.runAction(
            cc.sequence(
                cc.moveTo(0.3, lastPt),
                cc.callFunc(function(){
                    self.nodeShow.active = false;
                    self.nodeHide.active = true;
                })
        ));
    },
    onClickHideBot() {
        //隐藏信息
        this.nodeBot.stopAllActions();

        var size = this.nodeBot.getContentSize();

        var lastPt = new cc.Vec2(this.nodeBot.getPositionX(), 0 - size.height);
        this.nodeBot.setPosition(this.nodeBot.getPositionX(), 0);

        var self = this;
        this.nodeBot.runAction(
            cc.sequence(
                cc.moveTo(0.3, lastPt),
                cc.callFunc(function(){
                    self.nodeShow.active = true;
                    self.nodeHide.active = false;
                })
        ));
    },
    onClickUnlock() {
        //解锁当前服饰
        init.confidanteProxy.sendUnlock(1, init.confidanteProxy.curClothe);
    },
    onClickTagInfo() {
        //点击
        var visible = this.tagNodeHide.active;
        this.tagNodeHide.active = !visible;
        this.tagNodeShow.active = visible;
        utils.utils.showEffect(this.tagNode, visible ? 1 : 0);
        this.showTag = !visible;
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
