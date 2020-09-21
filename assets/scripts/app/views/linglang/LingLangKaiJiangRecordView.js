const List=require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        list : List.default,
        lblIndex : cc.Label,
    },


    onLoad() {
        if(Initializer.lingLangProxy.kaiJiangRecords == null) {
            Utils.utils.closeView(this);
            Utils.alertUtil.alert18n("COMMON_NODATA");
            return;
        }

        facade.subscribe(Initializer.lingLangProxy.LINGLANG_KAIJIANG_RECORDS_UPDATE, this.onDataUpdate, this);
        this.onDataUpdate();
    },

    onDataUpdate() {
        if(Initializer.lingLangProxy.kaiJiangRecords == null)return;
        var kaiJiangRecords = Initializer.lingLangProxy.kaiJiangRecords;
        this.lblIndex.string = i18n.t("LINGLANG_DANGQIANQI", {num : Initializer.lingLangProxy.data.periods_num});
        this.list.data = kaiJiangRecords;
    },
    onCloseClick : function() {
        Utils.utils.closeView(this);
    },
});
