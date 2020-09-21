const RenderListItem = require("../../component/RenderListItem");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblCount: cc.Label,
    },

    //itemid: 64, count: 8, time: 1582701661
    showData: function () {
        var t = this.data;
        if (this.data) {

            var item = localcache.getItem(localdb.table_item, t.itemid + "");

            //var l = Utils.timeUtil.second - t.time;
            this.lblCount.string = i18n.t("QUEEN_BIG_REWARD_RECORD", {
                time: Utils.timeUtil.getDateDiff(t.time),
                name: item ? item.name : "",
                num: t.count
            });
        }
    },
});