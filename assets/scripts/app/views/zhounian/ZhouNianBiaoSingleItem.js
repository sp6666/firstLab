const RenderListItem = require("../../component/RenderListItem");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        itemSlotUI : RenderListItem.default,
        nodeLock : cc.Node,
        nodeGet : cc.Node,
    },

    showData : function() {
        var itemSlotUICtr = this.itemSlotUI.getComponent("ItemSlotUI");
        if(itemSlotUICtr) {
            itemSlotUICtr.data = this.data.slotData;
            itemSlotUICtr.showData();
        }

        this.nodeLock.active =  this.data.lock;
        this.nodeGet.active = this.data.get;
    }
});
