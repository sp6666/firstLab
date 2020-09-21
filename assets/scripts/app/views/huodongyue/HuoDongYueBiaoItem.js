const RenderListItem = require("../../component/RenderListItem");
const List=require("../../component/List");
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
        this.lblNum.string = data.id;
        var data1 = [];
        for(var i = 0; i < data.fixed.length; i ++) {
            var item = {};
            item.slotData = data.fixed[i];
            item.lock = false;
            item.get = data.fGet == 1;
            data1.push(item);
        }

        var data2 = [];
        for(var i = 0; i < data.special_rwd.length; i ++) {
            var item = {};
            item.slotData = data.special_rwd[i];
            item.lock = !data.lionOpen;
            item.get = data.sGet == 1;
            data2.push(item);
        }

        this.list1.data = data1;
        this.list2.data = data2;
        ShaderUtils.shaderUtils.clearNodeShader(this.list1.node);
        ShaderUtils.shaderUtils.clearNodeShader(this.list2.node);
        if(!data.open) {
            ShaderUtils.shaderUtils.setNodeGray(this.list1.node);
            ShaderUtils.shaderUtils.setNodeGray(this.list2.node);
        }

    },
    
});
