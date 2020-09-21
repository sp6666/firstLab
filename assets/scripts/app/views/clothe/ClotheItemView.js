var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/SelectMax"),
    a = require("../../utils/UIUtils"),
    UrlLoad = require("../../component/UrlLoad"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGate = null;
            e.lblScore = null;
            e.lblCount = null;
            e.list = null;
            e.lblDes = null;
            e.lblTime = null;
            e.lblHighScore = null;
            e.select = null;
            e.nodeClear = null;
            e.nodeFight = null;
            e.nodeUnopen = null;
            e.tag1 = null;
            e.tag2 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this._curData = this.node.openParam;
            facade.subscribe(
                l.clothePveProxy.UPDATE_CLOTHE_BASE,
                this.updateCount,
                this
            );
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            var t = [],
                e = 0;
            this.nodeClear.active =
                l.clothePveProxy.base.gate >= this._curData.id;
            this.nodeClear.active &&
                (this.select.max =
                    l.clothePveProxy.info.count - l.clothePveProxy.base.use);
            this.lblTime.node.active =
                Math.ceil(
                    (i.timeUtil.second - l.clothePveProxy.info.info.sTime) /
                        86400
                ) < this._curData.day;
            this.nodeUnopen.active =
                l.clothePveProxy.base.gate + 1 < this._curData.id &&
                !this.lblTime.node.active;
            this.nodeFight.active =
                l.clothePveProxy.base.gate + 1 == this._curData.id &&
                !this.lblTime.node.active;
            if (this.lblTime.node.active) {
                var o = this,
                    n =
                        l.clothePveProxy.info.info.sTime +
                        86400 * (this._curData.day - 1);
                a.uiUtils.countDown(
                    n,
                    this.lblTime,
                    function() {
                        o.updateShow();
                    },
                    !0,
                    "CLOTHE_PVE_OPEN_REMAIN",
                    "d"
                );
            }
            for (
                var r = i.utils.getParamInt("clothe_score_item"), s = 0;
                s < this._curData.rwds.length;
                s++
            )
                this._curData.rwds[s].id == r
                    ? (e = this._curData.rwds[s].count)
                    : t.push(this._curData.rwds[s]);
            for (s = 0; s < this._curData.prop_rwds.length; s++)
                t.push(this._curData.prop_rwds[s]);
            var c = localcache.getItem(
                localdb.table_clothepve,
                this._curData.gateid
            );
            this.lblDes.string = c.intro;
            var _ = i18n.t("CLOTHE_PVE_GATE", {
                d: i.utils.getHanzi(this._curData.id)
            });
            this.lblGate.string = i18n.t("COMMON_ADD_2", {
                n: _,
                c: c.name
            });
            this.lblScore.string = i18n.t("CLOTHE_PVE_SCORE_ADD", {
                d: e
            });
            this.list.data = t;
            this.list.node.x = -this.list.node.width / 2;
            this.lblHighScore.string = i18n.t("CLOTHE_PVE_MY_HIGH", {
                d: l.clothePveProxy.getIdScore(this._curData.id)
            });
            this.updateCount();
            //更新标签
            this.initCureentTag();

        };
        e.prototype.onClickAdd = function() {
            if (
                l.clothePveProxy.info &&
                l.clothePveProxy.info.info.eTime < i.timeUtil.second
            )
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                i.utils.openPrefabView("ConfirmBuyMore",null, 1);
                /*
                var t = i.utils.getParamInt("clothe_cost");
                i.utils.showConfirmItem(
                    i18n.t("CLOTHE_PVE_ADD_CONFIRM", {
                        d: t
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        l.playerProxy.userData.cash < t
                            ? i.alertUtil.alertItemLimit(1)
                            : l.clothePveProxy.sendAdd();
                    },
                    "CLOTHE_PVE_ADD_CONFIRM"
                );
                */
            }
        };
        e.prototype.updateCount = function() {
            this.lblCount.string = i18n.t("CLOTHE_PVE_REMAIN", {
                d: l.clothePveProxy.info.count - l.clothePveProxy.base.use
            });
            if (this.nodeClear.active) {
                this.select.max =
                    l.clothePveProxy.info.count - l.clothePveProxy.base.use;
                this.select.curValue =
                    this.select.curValue > this.select.max
                        ? this.select.max
                        : this.select.curValue < 1
                        ? 1
                        : this.select.curValue;
            }
        };
        e.prototype.onClickFight = function() {
            if (
                l.clothePveProxy.info &&
                l.clothePveProxy.info.info.eTime < i.timeUtil.second
            )
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            else if (
                l.clothePveProxy.info.count - l.clothePveProxy.base.use <= 0 &&
                l.clothePveProxy.base.gate >= this._curData.id
            )
                i.alertUtil.alert18n("CLOTHE_COUNT_LIMIT");
            else {
                i.utils.openPrefabView(
                    "clothe/ClotheChange",
                    !1,
                    this._curData
                );
                this.onClickClost();
            }
        };
        e.prototype.onClickFast = function() {
            l.clothePveProxy.info &&
            l.clothePveProxy.info.info.eTime < i.timeUtil.second
                ? i.alertUtil.alert18n("ACTHD_OVERDUE")
                : l.clothePveProxy.info.count - l.clothePveProxy.base.use <
                      this.select.curValue || 0 == this.select.curValue
                ? i.alertUtil.alert18n("CLOTHE_COUNT_LIMIT")
                : this._curData.id > l.clothePveProxy.base.gate ||
                  l.clothePveProxy.sendClear(
                      this._curData.id,
                      this.select.curValue
                  );
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.initCureentTag = function() {
            var pveInfos = localcache.getItem(localdb.table_clothepve, this._curData.gateid);
            var tags = pveInfos.clothe_score;
            tags.sort(function (a, b) {
                return b.point - a.point;
            });
            this.tag1.url = a.uiHelps.getTag(tags[0].tag);
            this.tag2.url = a.uiHelps.getTag(tags[1].tag);  
        };
        
        __decorate([_(cc.Label)], e.prototype, "lblGate", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblHighScore", void 0);
        __decorate([_(r.default)], e.prototype, "select", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeClear", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnopen", void 0);
        __decorate([_(UrlLoad.default)], e.prototype, "tag1", void 0);
        __decorate([_(UrlLoad.default)], e.prototype, "tag2", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
