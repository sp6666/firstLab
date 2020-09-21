var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../views/item/ItemSlotUI"),
    l = require("../utils/UIUtils"),
    r = require("./SelectMax"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.textLabel = null;
            e.lblLeft = null;
            e.lblRight = null;
            e.itemSlot = null;
            e.silder = null;
            e.edit = null;
            e.toggle = null;
            e.lblcount = null;
            return e;
        }
        o = e;
        e.prototype.onLoad = function() {
            this.edit && (this.edit.placeholder = i18n.t("COMMON_INPUT_TXT"));
            var t = this.node.openParam;
            if (t) {
                this.textLabel.string = t.txt;
                var e = t.skip;
                this.toggle &&
                    (this.toggle.node.active = !i.stringUtil.isBlank(e));
                if (!i.stringUtil.isBlank(e) && o.checks[e]) {
                    this.node.active = !1;
                    this.onClickOK(null, 1);
                    return;
                }
                this.toggle && (this.toggle.isChecked = o.checks[e]);
                t.color && (this.textLabel.node.color = t.color);
                if (this.itemSlot) {
                    var n = new l.ItemSlotData();
                    n.id = t.itemId;
                    n.count = t.count;
                    this.itemSlot.data = n;
                    if (this.silder) {
                        this.silder.baseCount = t.baseCount;
                        this.silder.node.active &&
                            (t.baseCount && 0 != t.baseCount
                                ? (this.silder.max = Math.floor(
                                      t.count / t.baseCount
                                  ))
                                : (this.silder.max = t.count));
                    }
                }
                this.edit && (this.edit.placeholder = t.txt);
                this.lblcount &&
                    (this.lblcount.string =
                        i18n.t("COMMON_HOLD") + this.lblcount.string);
                this.lblLeft &&
                    (this.lblLeft.string = t.left
                        ? t.left
                        : i18n.t("COMMON_YES"));
                this.lblRight &&
                    (this.lblRight.string = t.right
                        ? t.right
                        : i18n.t("COMMON_NO"));
            }
        };
        e.prototype.onClickOK = function(t, e) {
            void 0 === e && (e = null);
            var n = this.node.openParam;
            if (n && n.handler) {
                if (this.toggle) {
                    var l = n.skip;
                    i.stringUtil.isBlank(l) ||
                        null != e ||
                        (o.checks[l] = this.toggle.isChecked);
                }
                n.target
                    ? this.silder
                        ? n.handler.apply(n.target, [
                              this.silder.node.active ? this.silder.curValue : 1
                          ])
                        : this.edit
                        ? n.handler.apply(n.target, [this.edit.string])
                        : n.handler.apply(n.target)
                    : this.silder
                    ? n.handler(
                          this.silder.node.active ? this.silder.curValue : 1
                      )
                    : this.edit
                    ? n.handler(this.edit.string)
                    : n.handler();
            }
            i.utils.closeView(this);
        };
        e.prototype.onClickCancel = function() {
            var t = this.node.openParam;
            t &&
                t.right &&
                !i.stringUtil.isBlank(t.right) &&
                t &&
                t.handler &&
                (t.target ? t.handler.apply(t.target, o.NO) : t.handler(o.NO));
            i.utils.closeView(this);
        };
        e.isSkip = function(t) {
            if (!i.stringUtil.isBlank(t.skip) && o.checks[t.skip]) {
                t.target ? t.handler.apply(t.target) : t.handler();
                return !0;
            }
            return !1;
        };
        e.NO = "NO";
        e.checks = {};
        __decorate([c(cc.RichText)], e.prototype, "textLabel", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLeft", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblRight", void 0);
        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([c(r.default)], e.prototype, "silder", void 0);
        __decorate([c(cc.EditBox)], e.prototype, "edit", void 0);
        __decorate([c(cc.Toggle)], e.prototype, "toggle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcount", void 0);
        return (e = o = __decorate([s], e));
        var o;
    })(cc.Component);
o.default = _;
