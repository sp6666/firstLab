var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.fashion = null;
            e.jobImg = null;
            e.lblName = null;
            e.lblTalk = null;
            e.talkNode = null;
            e.headImg = null;
            e.curDta = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.headImg.url = l.uiHelps.getHead(t.sex, t.job);
                this.lblTalk.string = t.xuanyan;
                this.curDta = t;
            }
        };
        e.prototype.onClickRole = function() {
            r.utils.openPrefabView("palace/Palace/5", null, this.curDta);
        };
        __decorate([c(n.default)], e.prototype, "fashion", void 0);
        __decorate([c(n.default)], e.prototype, "jobImg", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([c(cc.Node)], e.prototype, "talkNode", void 0);
        __decorate([c(n.default)], e.prototype, "headImg", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
