const RenderListItem = require("../../component/RenderListItem");
const List=require("../../component/List");
const Initializer = require("../../Initializer");
const ShaderUtils = require("../../utils/ShaderUtils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblNum : cc.Label,
        list1 : List.default,
        list2 : List.default,

    },

    showData : function() {
        var data = this._data;
        this.lblNum.string = i18n.t("LINGLANG_QI", {num : data.periods_num});
        var data1 = [];
        {
            var item = {};
            item.slotData = data.prize;
            item.get = data.status == 2;
            item.zhongjiang = data.status != 0;
            data1.push(item);
        }


        // var data2 = [];
        // for(var i = 0; i < data.special_rwd.length; i ++) {
        //     var item = {};
        //     item.slotData = data.special_rwd[i];
        //     item.lock = !data.lionOpen;
        //     item.get = data.sGet == 1;
        //     data2.push(item);
        // }

        this.list1.data = data1;
        this.list2.repeatX = data.items.length;
        this.list2.data = data.items;
        ShaderUtils.shaderUtils.clearNodeShader(this.list1.node);
        if(data.status == 0) {
            ShaderUtils.shaderUtils.setNodeGray(this.list1.node);
        }

    },
    
});
