const List = require("../../component/List");
const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const UIUtils = require("../../utils/UIUtils");
const RoleSpine = require("../../component/RoleSpine");
const UrlLoad = require('../../component/UrlLoad');
cc.Class({
    extends: cc.Component,

    properties: {
        list : List.default,
        lblTime : cc.Label,
        roleSpine : RoleSpine.default,
        bgUrl : UrlLoad.default,
        timeNode : cc.Node,
        lblTip : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        facade.subscribe(
            Initializer.jingYiHuaShangProxy.JINGYIHUASHANG_INFO_UPDATE,
            this.onUpdate,
            this
        );
        
        //Initializer.jingYiHuaShangProxy.getInfo();
    },

    start () {
        this.onUpdate();
    },

    onUpdate : function () {
        var shopList = Initializer.jingYiHuaShangProxy.shop;
        if(shopList) {
            var itemListData = [];
            for (i = 0; i < shopList.length; i++) {
                var itemSlotData = new UIUtils.ItemSlotData();
                itemSlotData.id = shopList[i].items.id;
                itemSlotData.count = shopList[i].items.count;
                itemSlotData.kind = shopList[i].items.kind;
                itemSlotData.ext = shopList[i];
                var e = Initializer.playerProxy.isUnlockCloth(itemSlotData.id);
                itemSlotData.ext.alreadyHave = e;
                itemListData.push(itemSlotData);
            }
            this.list.data = itemListData;
            if(itemListData.length > 3) {
                this.list.node.y = 58;
                this.timeNode.y = -220;
            }else {
                this.list.node.y = 38;
                this.timeNode.y = -165;
            }

            var clotheInfo = {
                animal : 0,
                background: 0,
                body: 0,
                ear: 0,
                effect: 0,
                head: 0,

            }

            if(shopList[0]) clotheInfo.body = shopList[0].items.id;
            if(shopList[1]) clotheInfo.head = shopList[1].items.id;
            if(shopList[2]) clotheInfo.ear = shopList[2].items.id;
            this.roleSpine.setClothes(2, 1, 1, clotheInfo);
        }

        if(Initializer.jingYiHuaShangProxy.info) {
            UIUtils.uiUtils.countDown(Initializer.jingYiHuaShangProxy.info.info.eTime, this.lblTime, ()=> {
                this.lblTime.string = i18n.t("ACTHD_OVERDUE");
            });
            //更新bg
            if(Initializer.jingYiHuaShangProxy.info.info.bgName != null) {
                this.bgUrl.url = UIUtils.uiHelps.getCommonLangImg("shoppingStreet", Initializer.jingYiHuaShangProxy.info.info.bgName);
            }

            var tipColor = Initializer.jingYiHuaShangProxy.info.info.tipColor;
            if(tipColor != null) {
                this.lblTip.node.color = cc.color(tipColor[0], tipColor[1], tipColor[2]);
            }
        }

    },

    onDisCountChangeClick : function () {
        if (Utils.timeUtil.second > Initializer.jingYiHuaShangProxy.info.info.eTime) {
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
            return;
        }
        
        Utils.utils.openPrefabView(
            "ActivityShopView",
            null,
            Initializer.jingYiHuaShangProxy.dhShop
        );
    },
    
    onCloseClick : function() {
        Utils.utils.closeView(this);
    },

});
