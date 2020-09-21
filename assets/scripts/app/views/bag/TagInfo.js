const Utils = require("../../utils/Utils");
const UrlLoad = require("../../component/UrlLoad");
const UIUtils = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        leftNode : cc.Node,
        layOut : cc.Layout,
        animation : cc.Animation,
        tagArray : [UrlLoad.default],
        tagShuXingArray : [UrlLoad.default],
        tagPercentArray : [cc.Label],
        type: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    setType(type) {
        this.type = type;
        /*
        0：普通
        1：皇子
        */
    },

    start () {
        if(this.leftNode != null) {
            this.scheduleOnce(this.reSize, 0.3);
        }

        this.initTag();
    },

    reSize : function () {
        var leftHeight = this.leftNode.height;
        var detal = this.node.height - leftHeight;
        this.layOut.spacingY -= detal / 5;
    },

    initTag : function() {
        var clotheData = this.node.clotheData;
        if(clotheData != null) {
            cc.log("clotheData is " + clotheData);
            this.node.active = true;
        }else {
            //Utils.alertUtil.alert18n("无法获取服装属性");
            this.node.active = false;
            return;
        }
        var tagInfo = clotheData.tag;
        if(tagInfo == null) return;
        for(var i = 0; i < this.tagArray.length; i ++) {
            var tag = this.tagArray[i];
            var tagShuXing = this.tagShuXingArray[i];
            var tagPercent = this.tagPercentArray[i];
            if(tagInfo[i]) {
                
                tag.url = UIUtils.uiHelps.getTag(tagInfo[i].tag);
                
                if(this.type == 0)
                {
                    var quality = UIUtils.uiUtils.getShuXing(clotheData.part,tagInfo[i].score);
                    tagShuXing.url = UIUtils.uiHelps.getTagShuXing(quality.quality);
                }
                else if(this.type == 1 && tagPercent)
                {
                    tagPercent.string = tagInfo[i].score + "%";
                    tagPercent.node.active = true;
                }
            }
        }
    },


});
