var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../item/ItemSlotUI"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.servantShow = null;
            e.itemRwd = null;
            e.btnQianDao = null;
            e.btnYiQianDao = null;
            e.lblTime = null;
            e.curItem = null;
            e.nodeItems = null;
            e.nodeArrow = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                i.thirtyDaysProxy.THIRTY_DAY_DATA_UPDATE,
                this.onUpdateShow,
                this
            );
            i.thirtyDaysProxy.sendOpenActivity();
            this.nodeItems.active = false;
            //this.onUpdateShow();
        };
        e.prototype.onUpdateShow = function () {
            var t = this,
                e = i.thirtyDaysProxy.data;
            if (e && e.rwd) {
                this.curItem = e.rwd[e.days - 1];
                this.curItem || (this.curItem = e.rwd[e.rwd.length - 1]);
                a.uiUtils.countDown(e.info.eTime, this.lblTime, function () {
                    n.timeUtil.second >= e.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                if (e.rwd[this.curItem.id - 1]) {
                    this.itemRwd.data = e.rwd[this.curItem.id - 1].items[0];
                }

                this.btnYiQianDao.node.active = !(this.btnQianDao.node.active =
                    0 == this.curItem.get);
                this.setRoleShow(e);

                this.nodeItems.active = true;
            }
        };
        e.prototype.setRoleShow = function (t) {
            var e = this;
            if (this.servantShow) {
                this.servantShow.loadHandle = function () {
                    var t = e.servantShow.node.children[0];
                    t && (t = t.children[0]) && (t.color = n.utils.BLACK);
                };
                var o = "",
                    i = t.rwd[6].items[0].id;
                if (i > 200) {
                    var l = localcache.getItem(localdb.table_wife, i - 200);
                    l && l.res && (o = a.uiHelps.getWifeBody(l.res));
                } else o = a.uiHelps.getServantSpine(i);
                this.servantShow.url = o;
            }
        };
        e.prototype.onClickTab = function (t, e) {
            if (0 == e) {
                if (this.curItem && 0 != this.curItem.get) {
                    1 == this.curItem.get &&
                        n.alertUtil.alert18n("TIRTY_DAY_YI_QIAN_DAO");
                    return;
                }
                i.thirtyDaysProxy.sendGet();
            } else if (e == 1) {
                this.nodeArrow.active = !this.nodeArrow.active;
                this.nodeItems.active = !this.nodeItems.active;
            }
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([_(r.default)], e.prototype, "servantShow", void 0);
        __decorate([_(l.default)], e.prototype, "itemRwd", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnQianDao", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnYiQianDao", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);

        __decorate([_(cc.Node)], e.prototype, "nodeItems", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeArrow", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;