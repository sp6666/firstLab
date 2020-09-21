const RenderListItem = require("../../component/RenderListItem");
const ItemSlotUI = require("../../views/item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        itemSlotUI : ItemSlotUI.default,
    },

    showData : function() {
        this.itemSlotUI.data = this.data;
    },
});
