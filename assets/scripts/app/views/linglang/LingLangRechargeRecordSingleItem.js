const RenderListItem = require("../../component/RenderListItem");
const ItemSlotUI = require("../../views/item/ItemSlotUI");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        itemSlotUI : ItemSlotUI.default,
        nodeGet : cc.Node,
        nodeWeiZhong : cc.Node,
    },

    showData : function() {
        this.itemSlotUI.data = this.data.slotData;
        this.nodeGet.active = this.data.get;
        this.nodeWeiZhong.active = !this.data.zhongjiang;
    }
});
