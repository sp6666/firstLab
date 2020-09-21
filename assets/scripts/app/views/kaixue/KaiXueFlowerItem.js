var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.items = [];
            e.fullEff = null;
            return e;
        }
        e.prototype.onLoad = function() {
        };
        e.prototype.showData = function() {
            var t = this._data;
            this.setState(parseInt(t));
        };

        //
        e.prototype.setState = function (state) {
            for (var index = 0; index < this.items.length; index++) {
                this.items[index].active = index < state;
            }

            //eff
            this.fullEff.node.active = state >= this.items.length;
        };

        //
        __decorate([c([cc.Node])], e.prototype, "items", void 0);           //��ɶ�
        __decorate([c(sp.Skeleton)], e.prototype, "fullEff", void 0);       //��ɶ���
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
