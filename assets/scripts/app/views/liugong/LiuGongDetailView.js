/**
 * 六宫请安
 */
const RoleSpine = require("../../component/RoleSpine");
const Utils = require("../../utils/Utils");
const UrlLoad = require("../../component/UrlLoad");
const UIUtils = require("../../utils/UIUtils");
const List = require("../../component/List");
const Initializer = require("../../Initializer");
cc.Class({
    extends: cc.Component,

    properties: {
        roleSpine : RoleSpine.default,
        bgUrl : UrlLoad.default,
        lblServerName : cc.Label,
        spTitle : UrlLoad.default,
        list : List.default,
    },

    onLoad() {
        this.data = this.node.openParam;
    },

    start() {
        this.initData();
    },

    initData : function() {
        var info = this.data;
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

            this.list.data = this.data.kuafu;

            var index = Initializer.liuGongProxy.getFeiIndex(this.data.uid);
            if(index != -1) {
                var url = UIUtils.uiHelps.getFeiUrl("liugong_name" + index);
                this.spTitle.url = url;
            }
        }

        

    },



    onClickClose : function() {
        Utils.utils.closeView(this);
    },

});
