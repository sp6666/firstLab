var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btns = [];
            e.id = 0;
            e.stopEff = null;
            return e;
        }

        e.prototype.onLoad = function() {
            this.id = this.node.openParam;
            this.stopEff.node.active = false;
            for(var idx = 0; idx < this.btns.length; idx++)
            {
                this.btns[idx].node.on(cc.Node.EventType.TOUCH_START,this.onBtnClick, this);
            }
            this.randomShow();
        };
        e.prototype.showData = function() {
            var t = this._data;
            
        };
        e.prototype.onBtnClick = function(){
            this.node.stopAllActions();
            this.stopEff.node.active = true;
            var self = this;
            facade.send(l.hongbaoProxy.HONGBAO_ITEM_CLICK, self.id);
            utils.utils.showSpine(this.stopEff, "animation", false, function(){
                self.randomShow();  //改变外形
                
            });
        };
        e.prototype.randomShow = function(){
            var show = r.uiUtils.randomNum(0, this.btns.length - 1);
            for(var index = 0; index < this.btns.length; index++)
            {
                this.btns[index].node.active = index == show;
            }
        };

        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "stopEff", void 0);       //被点中的特效
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
