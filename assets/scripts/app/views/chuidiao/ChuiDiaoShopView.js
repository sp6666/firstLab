var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    uiUtils = require("../../utils/UIUtils"),
    url = require("../../component/UrlLoad"),
    shader = require("../../utils/ShaderUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnList = [];
            e.nodeList = [];

            return e;
        }
        e.prototype.onLoad = function() {
            //
            this.onClickTab(null, 0);
        };

        //切换标签
        e.prototype.onClickTab = function(t, e){
            var curSelect = parseInt(e);
            for(var idx = 0; idx < this.btnList.length; idx++)
            {
                if(this.btnList[idx])
                {
                    var isCur = idx == curSelect;
                    this.btnList[idx].interactable = !isCur;
                }
            }
            for(var idx = 0; idx < this.nodeList.length; idx++)
            {
                if(this.nodeList[idx])
                {
                    this.nodeList[idx].active = idx == curSelect;
                }
            }
        };
        //关闭
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };

        //新的
        __decorate([s([cc.Button])], e.prototype, "btnList", void 0);         //按钮列表
        __decorate([s([cc.Node])], e.prototype, "nodeList", void 0);         //面板列表
        /*
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);         //标题
        __decorate([s(url.default)], e.prototype, "iconTown1", void 0);     //城镇icon1
        __decorate([s(url.default)], e.prototype, "iconTown2", void 0);     //城镇icon2
        __decorate([s(cc.Label)], e.prototype, "lblTownName", void 0);      //lbl城镇名
        __decorate([s(cc.Label)], e.prototype, "lblTownInfo", void 0);      //lbl城镇介绍
        __decorate([s(cc.Label)], e.prototype, "lblReward", void 0);        //lbl奖励介绍
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);          //lbl进城费
        __decorate([s(i.default)], e.prototype, "listReward", void 0);      //list奖励表
        */
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
