var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var urlLoad = require("../../component/UrlLoad");
var cash = require("./ConfidanteCashShow");
var shader = require("../../utils/ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        urlRole:{
            //蓝颜形象
            default:null,
            type:urlLoad.default
        },
        btnRole:{
            //点击蓝颜
            default:null,
            type:cc.Button
        },
        cashItem1:{
            //兑换道具1
            default:null,
            type:cash.default
        },
        cashItem2:{
            //兑换道具2
            default:null,
            type:cash.default
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        },
        lblUpGrade:{
            //升级经验
            default:null,
            type:cc.Label
        },
        lblUpGradeMax:{
            //满级经验
            default:null,
            type:cc.Label
        },
        lblCurLevel:{
            //当前等级
            default:null,
            type:cc.Label
        },
        nodeTalk:{
            //对话框
            default:null,
            type:cc.Node
        },
        animTalk:{
            //对话框
            default:null,
            type:cc.Animation
        },
        lblTalk:{
            //对话文字
            default:null,
            type:cc.Label
        },
        nodeHasAcco:{
            //已陪伴
            default:null,
            type:cc.Node
        },
        nodeAcco:{
            //陪伴
            default:null,
            type:cc.Node
        },
        //互动
        role:{
            //主角
            default:null,
            type:roleSpine.default
        },
        nodeLeft:{
            //左侧
            default:null,
            type:cc.Node
        },
        nodeRight:{
            //右侧
            default:null,
            type:cc.Node
        },
        nodeSpine:{
            //互动特效
            default:null,
            type:cc.Node
        },
        //end互动
        nodeButterfly:{
            //蝴蝶特效
            default:null,
            type:cc.Node
        },
        nodeHart:{
            //爱心特效
            default:null,
            type:cc.Node
        },
        animUpGrade:{
            //升级
            default:null,
            type:sp.Skeleton
        },
        lstBtns:{
            //按钮列表
            default:[],
            type:cc.Button
        },
        lstDkBtns:{
            //灰态按钮列表
            default:[],
            type:cc.Button
        }
    },


    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_CHANGE_CLOTHE_TO_VIEW, this.updateData, this); //更新衣服
        facade.subscribe(init.confidanteProxy.ON_CONFIDANTE_ACCOMPANY, this.updateData, this); //点击陪伴更新界面
        facade.subscribe(init.confidanteProxy.ON_GET_CONFIDANTE_INFO, this.updateData, this); //更新亲密度
        facade.subscribe(init.confidanteProxy.ON_CON_INTERACTION_BACK, this.hideUI, this); //点击互动返回
        facade.subscribe(init.confidanteProxy.ON_CONFIDANTE_UPGRADE, this.showUpGread, this); //亲密度升级
        facade.subscribe(init.confidanteProxy.ON_CON_DONATE_TO_VIEW, this.updateData, this);

        this.init();
    },
    onDisable() {
        init.confidanteProxy.sendInfo();
    },
    
    // start () {

    init () {
        this.updateData();
        this.updateTalk();
    },

    // update (dt) {},
    updateData () {
        if(init.confidanteProxy.checkNpcExist(init.confidanteProxy.hero.id) == false)
        {
            this.updateNoConfidante();
            return;
        }

        this.nodeSpine.active = false;
        var data = init.confidanteProxy.hero;
        if(!data)
        {
            return;
        }

        //兑换道具
        var items = localcache.getItem(localdb.table_confidante_donate, data.id + "");
        if(items)
        {
            this.cashItem2.updateItem(items.gallery_cash);
            this.cashItem1.updateItem(items.item_cash);
        }
        //config
        var heroCfg = localcache.getItem(localdb.table_hero, data.id + "");
        var levelCfg = localcache.getItem(localdb.table_confidante_level, data.heros.level + "");
        //var nextLvCfg = localcache.getItem(localdb.table_confidante_level, data.heros.level + 1 + "");

        //url
        var clothe = data.heros.clothes_id > 0 ? data.heros.clothes_id : data.id;
        var resId = init.confidanteProxy.getClotheResId(clothe);    //用clothe表的id检出res的id
        this.urlRole.url = uiUtils.uiHelps.getServantSpine(resId);
        
        //name
        this.lblName.string = heroCfg.name;

        //亲密度
        if(levelCfg)
        {
            var cur = data.heros.curr / levelCfg.intimacy_max;
            var pt = cur * 88;  //88是因为需要移动动画的坐标，88最高，0最低；

            this.nodeHart.setPositionY(pt);

            //lbl升级亲密度
            this.lblUpGrade.string = data.heros.curr + "/";
            this.lblUpGradeMax.string = levelCfg.intimacy_max + "";
        }
        /*
        if(nextLvCfg)
        {
            //bar
            var cur = data.heros.curr / data.heros.next;
            var pt = cur * 88;

            this.nodeHart.setPositionY(pt);

            //lbl升级亲密度
            this.lblUpGrade.string = data.heros.curr + "/";
            this.lblUpGradeMax.string = data.heros.next + "";
        }
        else{
            //取不到下一级，认为是最后一级
            //bar
            this.nodeHart.setPosition(0, 88);

            //lbl升级亲密度
            if(levelCfg)
            {
                this.lblUpGrade.string = data.heros.curr + "/";
                this.lblUpGradeMax.string = levelCfg.intimacy_max;
            }
        }
        */

        //隐藏特效
        this.animUpGrade.node.active = false;

        //等级 
        this.lblCurLevel.string = levelCfg.name;

        //陪伴
        this.nodeHasAcco.active = data.heros.is_ay == 1;    //已陪伴
        this.nodeAcco.active = data.heros.is_ay == 0;       //陪伴

        //主角
        var t = init.playerProxy.userData;
        this.role.setClothes(t.sex, t.job, t.level, t.clothe);

        for(var idx = 0; idx < this.lstBtns.length; idx++)
        {
            this.lstBtns[idx].node.active = true;
        }

        for(var idx = 0; idx < this.lstDkBtns.length; idx++)
        {
            this.lstDkBtns[idx].node.active = false;
        }
    },
    updateNoConfidante() {
        //刷新没有情愫的皇子界面
        var hero = init.confidanteProxy.hero;
        var heroCfg = localcache.getItem(localdb.table_hero, hero.id + "");

        var curIs_ay = init.confidanteProxy.hero.heros.is_ay;
        //是否陪伴
        this.nodeHasAcco.active = curIs_ay == 1;    //已陪伴
        this.nodeAcco.active = curIs_ay == 0;       //陪伴

        //隐藏兑换道具
        this.cashItem2.node.active = false;
        this.cashItem1.node.active = false;

        //名字
        this.lblName.string = heroCfg.name;

        //亲密度为0
        this.nodeHart.setPositionY(0);
        this.lblUpGrade.string = 0 + "/";
        this.lblUpGradeMax.string = 0;

        //隐藏特效
        this.animUpGrade.node.active = false;

        //等级 为0
        this.lblCurLevel.string = "";

        //url
        this.urlRole.url = uiUtils.uiHelps.getServantSpine(hero.id);

        for(var idx = 0; idx < this.lstBtns.length; idx++)
        {
            this.lstBtns[idx].node.active = false;
        }

        for(var idx = 0; idx < this.lstDkBtns.length; idx++)
        {
            this.lstDkBtns[idx].node.active = true;
        }
    },
    updateTalk () {
        //更新谈话
        var strTalk = init.confidanteProxy.getCurHeroTalk();
        if(strTalk == "")
        {
            this.nodeTalk.active = false;
            return;
        }
        this.nodeTalk.active = true;
        this.lblTalk.string = strTalk;
        utils.utils.showEffect(this.animTalk, 0);

        this.nodeTalk.runAction(
            cc.sequence(
                cc.fadeTo(0.5,255),
                cc.delayTime(2),
                cc.fadeOut(1),
            )
        );
    },

    hideUI() {
        //隐藏UI
        var self = this;
        init.confidanteProxy.interactMove = true;

        //隐藏蝴蝶特效
        this.nodeButterfly.active = false;

        var selfPt = new cc.Vec2(-100, this.role.node.getPositionY());
        var selfPtBak = new cc.Vec2(-580, this.role.node.getPositionY());

        var wifePt = new cc.Vec2(100, this.urlRole.node.getPositionY());
        var wifePtBak = new cc.Vec2(0, this.urlRole.node.getPositionY());

        var nodeLeftPt = new cc.Vec2(cc.winSize.width * -1, this.nodeLeft.getPositionY());
        var nodeLeftPtBak = new cc.Vec2(cc.winSize.width, this.nodeLeft.getPositionY());

        var nodeRightPt = new cc.Vec2(cc.winSize.width, this.nodeRight.getPositionY());
        var nodeRightPtBak = new cc.Vec2(cc.winSize.width * -1, this.nodeRight.getPositionY());

        //加起来2.5秒
        this.nodeRight.runAction(
            cc.sequence(
                cc.moveBy(0.5, nodeRightPt),
                cc.delayTime(1.5),
                cc.moveBy(0.5, nodeRightPtBak)
            )
        );

        this.nodeLeft.runAction(
            cc.sequence(
                cc.moveBy(0.5, nodeLeftPt),
                cc.delayTime(1.5),
                cc.moveBy(0.5, nodeLeftPtBak)
            )
        );

        this.urlRole.node.runAction(
            cc.sequence(
                cc.moveTo(0.6, wifePt), //蓝颜
                cc.delayTime(1.4),
                cc.moveTo(0.6, wifePtBak),
            )
        );   
        this.role.node.runAction(
            cc.sequence(
                cc.moveTo(0.6, selfPt),   //自己
                cc.callFunc(function() {
                    //结束
                    self.nodeSpine.active = true;
                }),
                cc.delayTime(1.4),
                cc.callFunc(function() {
                    //结束
                    self.nodeSpine.active = false;
                }),
                cc.moveTo(0.6, selfPtBak),
                cc.callFunc(function() {
                    //结束
                    init.confidanteProxy.interactMove = false;

                    //显示蝴蝶特效
                    self.nodeButterfly.active = true;
                }),
            )
        );
    },

    showUpGread() {
        //显示升级特效
        utils.utils.openPrefabView("confidante/ConfidanteUpGradeView");
    },
    
    onClickPeiBan() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //选中陪伴
        init.confidanteProxy.sendAccompany();
    },
    onClickTalk() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //更新聊天
        this.updateTalk();
    },
    onClickDating() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开约会界面
        utils.utils.openPrefabView("confidante/ConfidanteDatingView");
    },
    onClickChange() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开服装界面
        utils.utils.openPrefabView("confidante/ConfidanteChangeView");
    },
    onClickRelation() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开关系界面
        utils.utils.openPrefabView("confidante/ConfidanteRelationView");
    },
    onClickGallery() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开绘画界面
        utils.utils.openPrefabView("confidante/ConfidanteGalleryView");
    },
    onClickDonate() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开赠送界面
        utils.utils.openPrefabView("confidante/ConfidanteDonateView");
    },
    onClickGift() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开商城界面
        utils.utils.openPrefabView("confidante/ConfidanteGiftView");
    },
    onClickInteraction() {
        //互动
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        if(init.confidanteProxy.hero.heros.is_free <= 0)
        {
            //和王磊商定is_free现在用来定义价格，等于0就是免费
            init.confidanteProxy.sendInteraction();
        }
        else
        {
            utils.utils.showConfirm(i18n.t("CONFIDANTE_CONF_INTERACTION", {num: init.confidanteProxy.hero.heros.is_free}), function () {
                init.confidanteProxy.sendInteraction();
            })
        }
    },
    onClickNoHero() {
        //该王子未开启
        utils.alertUtil.alert(i18n.t("CONFIDANTE_NO_OPEN"));
    },
    onClickJiNeng() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        //打开技能界面
        utils.utils.openPrefabView("confidante/ConfidanteSkillView");
    },
    onClickClose() {
        if(init.confidanteProxy.interactMove == true)
        {
            return;
        }
        facade.send(init.confidanteProxy.ON_CON_CHANGE_CLOTHE_TO_HAOYOU);
        utils.utils.closeView(this, true);
    },
});
