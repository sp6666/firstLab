var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var l = require("../../Initializer"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblStar = [];
            e.aToggle = [];
            e.sexToggle = [];
            e.backNode = null;
            return e;
        }

        e.prototype.onLoad = function () {
            var i = 1;
            for (var lab of this.lblStar) {
                lab.string = i18n.t("STAR", {
                    n: i
                });
                i++;
            }

            this.sexToggle[0].isChecked = l.sonProxy.selectMsg.sex[0];
            this.sexToggle[1].isChecked = l.sonProxy.selectMsg.sex[1];

            var num = 0;
            for (var check of l.sonProxy.selectMsg.star) {
                this.aToggle[num].isChecked = check;
                num++;
            }
            this.backNode.active = l.sonProxy.selectMsg.show;

            facade.send(l.sonProxy.UPDATE_SON_CHOSE);
        };

        e.prototype.show = function () {
            l.sonProxy.selectMsg.show = !l.sonProxy.selectMsg.show;
            this.backNode.active = l.sonProxy.selectMsg.show;
        };

        e.prototype.choseStar = function (t, e) {
            var type = parseInt(e);
            l.sonProxy.selectMsg.star[type] = t.isChecked;
            var num = 0;
            for (var check of l.sonProxy.selectMsg.star) {
                if (check) {
                    num++;
                }
            }
            if (num === 0) {
                l.sonProxy.selectMsg.star[type] = true;
                t.isChecked = true;
            }

            facade.send(l.sonProxy.UPDATE_SON_CHOSE);
        };

        e.prototype.sex = function (t, e) {
            var type = parseInt(e);
            l.sonProxy.selectMsg.sex[type] = t.isChecked;
            if (!l.sonProxy.selectMsg.sex[0] && !l.sonProxy.selectMsg.sex[1]) {
                l.sonProxy.selectMsg.sex[type] = true;
                this.sexToggle[type].isChecked = true;
            }

            facade.send(l.sonProxy.UPDATE_SON_CHOSE);
        };

        __decorate([p([cc.Label])], e.prototype, "lblStar", void 0);
        __decorate([p([cc.Toggle])], e.prototype, "aToggle", void 0);
        __decorate([p([cc.Toggle])], e.prototype, "sexToggle", void 0);
        __decorate([p(cc.Node)], e.prototype, "backNode", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;