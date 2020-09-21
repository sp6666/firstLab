var r = require("../../utils/Utils"),
    n = require("../../Initializer"),
    UtilsUI = require("../../utils/UIUtils"),
    List = require("../../component/List"),
    s = require("../../utils/ShaderUtils"),
    l = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        list: List.default,
        warnNode: cc.Node,
        oneBtn: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        facade.subscribe(n.unionProxy.UNION_GIFTS_DATA_UPDATE, this.onDataUpdate, this); //获得数据

        n.unionProxy.sendGiftsInfo();

    },

    start() {

    },

    // update (dt) {},

    onDataUpdate: function () {

        this.warnNode.active = !(n.unionProxy.gifts && n.unionProxy.gifts.lists && n.unionProxy.gifts.lists.length > 0);

        if (n.unionProxy.gifts && n.unionProxy.gifts.lists && n.unionProxy.gifts.lists.length > 0) {
            this.list.data = n.unionProxy.gifts.lists;
            this.oneBtn.interactable = true;
        } else {
            this.list.data = null;
            this.oneBtn.interactable = false;
        }

    },

    onRecords: function () {

    },

    onItemUpdate: function () {

    },

    onClickGetAll: function () {
        n.unionProxy.sendGetGift(2, 0);
    },

    onClickAdd: function () {
        r.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: n.unionProxy.shop[0],
            activityId: n.unionProxy.data.info.type
        });
        // n.shopProxy.openShopBuy(n.unionProxy.data.need);
    },

    onClickOpenLiHe: function () {
        if (0 != n.bagProxy.getItemCount(n.unionProxy.THANKSGIVING_ITEM_LI_HE)) {
            var t = {
                id: n.unionProxy.THANKSGIVING_ITEM_LI_HE
            };
            r.utils.openPrefabView("bag/BagUse", !1, t);
        } else r.alertUtil.alertItemLimit(n.unionProxy.THANKSGIVING_ITEM_LI_HE);
    },

    onClickTab: function (t, e) {
        switch (e) {
            case "1":
                r.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    n.unionProxy.dhShop
                );
                break;
            case "2":
                r.utils.openPrefabView("thanksGiving/ThanksGivingReward");
                break;
            case "3":
                r.utils.openPrefabView(
                    "limitactivity/LimitActivityView",
                    null, {
                        type: n.limitActivityProxy.THANKSGIVING_TYPE
                    }
                );
                break;
            default:
                break;
        }
    },

    onClickFood: function (t, e) {
        var index = parseInt(e);
        var item = n.unionProxy.foodList[index];
        var t = localcache.getItem(localdb.table_item, item.id);
        r.utils.openPrefabView("ItemInfo", !1, t);
    },

    onClickReward: function (sender, customData) {
        var index = parseInt(customData) + 1;

        if (sender.target._claim != null && !sender.target._claim) {
            if (n.unionProxy.data != null) {
                var score_rwd = n.unionProxy.data.score_rwd;
                var rwdIndex = 1;
                var t = null;
                for (var key in score_rwd) {
                    if (index == rwdIndex) {
                        t = score_rwd[key];
                        break;
                    }

                    rwdIndex++;
                }
                t && r.utils.openPrefabView("thanksGiving/ThanksGivingRwdView", !1, t);
            }
        } else {
            n.unionProxy.sendRwd(index, function () {
                n.unionProxy.sendOpenActivity();
            });
        }
    },

    onClickClose: function () {
        r.utils.closeView(this);
    },


});