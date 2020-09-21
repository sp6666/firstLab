const RenderListItem = require("../../component/RenderListItem");
const ItemSlotUI = require("../../views/item/ItemSlotUI");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        itemSlotUI : ItemSlotUI.default,
        lblIndex : cc.Label,
        lblName : cc.Label,
    },

    showData : function() {
        this.itemSlotUI.data = this.data.items;
        this.lblIndex.string = i18n.t("LINGLANG_QI", {num : this.data.periods_num});
        if(this.data.uid != null) {
            this.lblName.string = this.data.sev_name + " " + this.data.name;
        }else {
            this.lblName.string = i18n.t("LINGLANG_DANGQIANWURENZHONGJIANG");
        }
    }
});
