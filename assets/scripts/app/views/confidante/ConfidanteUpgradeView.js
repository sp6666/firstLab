var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var utils = require("../../utils/Utils");

cc.Class({
    extends: item.default,

    properties: {
        nodeSpine:{
            //动画节点
            default:null,
            type:cc.Node
        }
    },

    onLoad() { 
        var self = this;
        utils.utils.showSpine(this.nodeSpine, "animation", false, function(){
            self.onClickClose();
        });
    },

    onClickClose() {
        utils.utils.closeView(this);
    },
});
