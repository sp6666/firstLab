var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Config"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblZy = null;
            e.lblTree = null;
            e.lblState = null;
            e.head = null;
            e.lblYm = null;
            e.lblMm = null;
            e.lblYmm = null;
            e.lblFsm = null;
            e.content = null;
            e.check = null;
            e.oldTree = 0;
            e.isFirst = !0;
            e.arr = [1018, 1019, 1020, 1021];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                a.laborDayProxy.LABOR_DAY_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                a.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe(
                a.laborDayProxy.LABOR_DAY_MY_RID_UPDATE,
                this.onMyRid,
                this
            );
            this.head.url = l.uiHelps.getServantHead(
                a.laborDayProxy.data.selectID
            );
            var t = localcache.getItem(
                localdb.table_hero,
                a.laborDayProxy.data.selectID
            );
            this.lblZy.string = i18n.t("LABOR_DAY_ZHEN_YING_TXT", {
                name: t.name
            });
            a.laborDayProxy.myRid
                ? (this.oldTree = a.laborDayProxy.myRid.score)
                : (this.oldTree = 0);
            this.onItemUpdate();
            this.onDataUpdate();
            this.showTree();
            this.onMyRid();
            this.check.isChecked = a.laborDayProxy.isOneKey;
        };
        e.prototype.onDataUpdate = function() {
            for (
                var t = null, e = null, o = 0;
                o < a.laborDayProxy.data.set.length;
                o++
            )
                a.laborDayProxy.data.set[o].pkID ==
                a.laborDayProxy.data.selectID
                    ? (t = a.laborDayProxy.data.set[o])
                    : (e = a.laborDayProxy.data.set[o]);
            t.score > e.score
                ? (this.lblState.string = i18n.t("LABOR_DAY_ZHUANG_TAI_1"))
                : t.score < e.score
                ? (this.lblState.string = i18n.t("LABOR_DAY_ZHUANG_TAI_2"))
                : (this.lblState.string = "");
        };
        e.prototype.onMyRid = function() {
            this.lblTree.string = i18n.t("LABOR_DAY_ZONG_ZHI_ZHI", {
                num: a.laborDayProxy.myRid.score
            });
        };
        e.prototype.onItemUpdate = function() {
            this.lblYm.string = a.bagProxy.getItemCount(1018) + "";
            this.lblMm.string = a.bagProxy.getItemCount(1019) + "";
            this.lblYmm.string = a.bagProxy.getItemCount(1020) + "";
            this.lblFsm.string = a.bagProxy.getItemCount(1021) + "";
        };
        e.prototype.onClickTab = function(t, e) {
            if (n.timeUtil.second > a.laborDayProxy.data.info.eTime)
                n.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                var o = this.check.isChecked ? 10 : 1;
                if (a.bagProxy.getItemCount(this.arr[e]) < o) {
                    n.alertUtil.alertItemLimit(this.arr[e]);
                    n.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: a.laborDayProxy.shop[e],
                        activityId: a.laborDayProxy.data.info.id
                    });
                } else
                    a.laborDayProxy.sendPlant(
                        this.arr[e],
                        a.laborDayProxy.data.selectID,
                        o
                    );
            }
        };
        e.prototype.showTree = function() {
            if (a.laborDayProxy.myRid) {
                for (
                    var t = localcache.getList(localdb.table_chungeng_point),
                        e = 0;
                    e < t.length;
                    e++
                )
                    t[e].cg_grade > a.laborDayProxy.data.level ||
                        this.loadTree(t[e]);
                this.scheduleOnce(this.onTimer, 0.2);
            }
        };
        e.prototype.onTimer = function() {
            a.laborDayProxy.myRid
                ? (this.oldTree = a.laborDayProxy.myRid.score)
                : (this.oldTree = 0);
            this.isFirst && (this.isFirst = !1);
        };
        e.prototype.loadTree = function(t) {
            var e = (e = r.Config.skin + "/prefabs/zw/zw_" + t.cg_type),
                o = this;
            cc.loader.loadRes(e, function(e, i) {
                if (null == e && i) {
                    var n = cc.instantiate(i);
                    if (n) {
                        o.content.addChild(n);
                        n.x = t.cg_x;
                        n.y = t.cg_y;
                    }
                }
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickCheck = function() {
            a.laborDayProxy.isOneKey = this.check.isChecked;
        };
        __decorate([_(cc.Label)], e.prototype, "lblZy", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTree", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblState", void 0);
        __decorate([_(i.default)], e.prototype, "head", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblYm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblYmm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFsm", void 0);
        __decorate([_(cc.Node)], e.prototype, "content", void 0);
        __decorate([_(cc.Toggle)], e.prototype, "check", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
