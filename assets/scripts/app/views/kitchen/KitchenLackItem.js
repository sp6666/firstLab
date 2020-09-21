var item = require("../item/ItemSlotUI");
var renderList = require("../../component/RenderListItem")
cc.Class({
    extends: renderList.default,

    properties: {
        //item itemicon
        itemSlot: {
            default: null,
            type: item.default
        },
        //itemicon
        costIcon: {
            default: null,
            type: cc.Sprite
        },
        //单个花费
        cost: {
            default: null,
            type: cc.Label
        },
        //缺少数量
        lackCount: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    showData() {
        var item = this._data;
        this.itemSlot.data ={
            id:item.id
        };//itemid
        this.cost.string = item.cost;
        this.lackCount.string = i18n.t("KIT_LACK_COUNT", {
            d: item.count
        });
        
        item.count;
        console.log(this._data);
    },

    start() {

    },

    // update (dt) {},
});
