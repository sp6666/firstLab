/**
 * 六宫请安
 */
const RoleSpine = require("../../component/RoleSpine");
const Utils = require("../../utils/Utils");
const UrlLoad = require("../../component/UrlLoad");
const UIUtils = require("../../utils/UIUtils");
const Initializer = require("../../Initializer");
cc.Class({
    extends: cc.Component,

    properties: {
        roleSpine : RoleSpine.default,
        btnQA : cc.Button,
        bgUrl : UrlLoad.default,
        lblServerName : cc.Label,
        spTitle : UrlLoad.default,
        successNode : cc.Node,
        lblQA : cc.Label,
        btnGift : cc.Button,
        lblGift : cc.Label,
    },

    onLoad() {
        facade.subscribe(Initializer.liuGongProxy.LIUGONG_QA_SUCCESS, this.updateData, this);
        this.data = this.node.openParam.data;
        this.type = this.node.openParam.type;//0,请安，1送礼
    },

    start() {
        this.initData();
    },

    initData : function() {
        // this.btnQA.node.active = this.type == 0;
        // this.btnGift.node.active = this.type != 0;

        var info = this.data.userInfo;
        if (null != info) {
            this.roleSpine.setClothes(info.sex, info.job, info.level, info.clothe);
            this.bgUrl.node.active = 0 != info.clothe.background;
            if (this.bgUrl.node.active) {
                var item = localcache.getItem(
                    localdb.table_userClothe,
                    info.clothe.background
                );
                if(item) {
                    this.bgUrl.url = UIUtils.uiHelps.getStoryBg(item.model);
                }
            }
            this.lblServerName.string = this.data.sevName + " " + info.name;
            
            var index = Initializer.liuGongProxy.getFeiIndex(this.data.uid);
            if(index != -1) {
                var url = UIUtils.uiHelps.getFeiUrl("liugong_name" + index);
                this.spTitle.url = url;
            }

            if(index != 0 || !Initializer.liuGongProxy.getFengHouOpen()) {
                this.btnQA.node.x = 0;
                this.btnGift.node.active = false;
            }
        }

        this.updateData();
    },

    updateData : function() {
        if(Initializer.liuGongProxy.kneelData != null) {
            //这里注意正式上线需要去掉注释
            this.btnQA.interactable = Initializer.liuGongProxy.kneelData.limit > 0;
            this.lblQA.string = Initializer.liuGongProxy.kneelData.limit > 0 ? i18n.t("RAKN_MOBAI") : i18n.t("RAKN_MOBAIED");
        }

        if(Initializer.liuGongProxy.giftData != null) {
            this.btnGift.interactable = Initializer.liuGongProxy.giftData.limit > 0;
            this.lblGift.string = Initializer.liuGongProxy.giftData.limit > 0 ? i18n.t("LIUGONG_SONGLI") : i18n.t("LIUGONG_YISONGLI");
        }
    },


    onClickClose : function() {
        Utils.utils.closeView(this);
    },

    onClickQA : function(evt, customeData) {
        //请安
        var type = parseInt(customeData);
        if(type == 1) {
            Initializer.liuGongProxy.kneel(type, this.data.uid, (ret)=> {
                this.successNode.active = true;
                this.scheduleOnce(this.hideSuccess, 1.5);
            })
        }else {
            //拦截一下，看是否已过了封后大典的时间
            if(Utils.timeUtil.second > Initializer.liuGongProxy.huangHouData.endTime) {
                Utils.alertUtil.alert18n("ACTHD_OVERDUE");
                return;
            }

            Utils.utils.showConfirmItem(
                i18n.t("LIUGONG_QUEREN", {
                    num: Initializer.liuGongProxy.data.yuanbao,
                }),
                1,
                Initializer.playerProxy.userData.cash,
                ()=> {
                    Initializer.liuGongProxy.kneel(type, this.data.uid, (ret)=> {

                    })
                }
            );

            
        }

    },

    hideSuccess : function() {
        this.successNode.active = false;
    }

});
