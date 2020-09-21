var SelectMax = require("../../component/SelectMax"),
    RenderListItem = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    u = require("../../utils/Utils"),
    i = require("../../Initializer"),
    n = require("../item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblName: cc.Label,
        lblNum: cc.Label,
        slot: n.default,
        btnAction:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addBtnEvent(this.btnAction);
    },

    start () {

    },

    showData: function() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_item, t.id);
            this.lblName.string = e.name;
            this.lblNum.string = "(" + i18n.t("COMMON_HOLD") +":"+ t.count +")";

            //item
            this.slot.data = e;

            if(t.count == 0){
                s.shaderUtils.setNodeGray(this.node);
                //
                this.btnAction.interactable = false;
            }
        }
        else{
            s.shaderUtils.setNodeGray(this.node);
            //如果为空，置灰
            this.btnAction.interactable = false;
        }
    },

    // update (dt) {},


});
