var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblChapt = null;
            e.lblJiban = null;
            e.btnClick = null;
            e.btnBg = null;
            e.nodeLock = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnClick);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = n.jibanProxy.isOverStory(t.id),
                    o = n.jibanProxy.getJibanIsOpen(t);
                this.btnBg.interactable = !e;
                this.lblName.string = t.name;
                this.lblChapt.string = n.playerProxy.getReplaceName(t.msg);
                this.lblJiban.string = o ? "" : this.getUnlockString();
                this.nodeLock.active = !o;
                this.lblName.node.color = e
                    ? cc.color(91, 74, 78)
                    : cc.color(226, 0, 53);
                this.lblChapt.node.color = e
                    ? cc.color(91, 74, 78)
                    : cc.color(226, 0, 53);
                this.lblJiban.node.color = e
                    ? cc.color(91, 74, 78)
                    : cc.color(226, 0, 53);
            }
        };
        e.prototype.getUnlockString = function() {
            var t = this.data,
                e = "";
            if (t) {
                if (2 == t.type) e = n.playerProxy.getWifeName(t.roleid);
                else if (1 == t.type) {
                    e = localcache.getItem(localdb.table_hero, t.roleid).name;
                }
                switch (t.unlocktype) {
                    case 1:
                    case 2:
                        return i18n.t("SERVANT_JIBAN_NEED" + t.unlocktype, {
                            n: e,
                            c: t.unlock
                        });

                    case 3:
                        var o = localcache.getItem(
                            localdb.table_mainTask,
                            t.unlock
                        );
                        return i18n.t("FIGHT_TASK_LIMIT", {
                            n: o.name
                        });
                }
            }
            return "";
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblChapt", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblJiban", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnClick", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnBg", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeLock", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
