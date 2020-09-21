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
            e.lblScore = null;
            e.lblState = null;
            e.head = null;
            e.lblYm = null;
            e.lblMm = null;
            e.lblYmm = null;
            e.lblFsm = null;
            e.content = null;
            e.check = null;
            e.spineEffect = null;
            e.oldTree = 0;
            e.isFirst = !0;
            e.arr = [1061, 1062, 1063, 1063];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                a.qiushouProxy.QIU_SHOU_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                a.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            facade.subscribe(
                a.qiushouProxy.QIU_SHOU_MY_RID_UPDATE,
                this.onMyRid,
                this
            );
            this.head.url = l.uiHelps.getServantHead(
                a.qiushouProxy.data.selectID
            );
            var t = localcache.getItem(
                localdb.table_hero,
                a.qiushouProxy.data.selectID
            );
            this.lblZy.string = i18n.t("QIUSHOU_ZHEN_YING_TXT", {
                name: t.name
            });
            a.qiushouProxy.myRid
                ? (this.oldTree = a.qiushouProxy.myRid.score)
                : (this.oldTree = 0);
            this.onItemUpdate();
            this.onDataUpdate();
            // this.showTree();
            this.onMyRid();
            this.check.isChecked = a.qiushouProxy.isOneKey;
        };
        e.prototype.onDataUpdate = function() {
            for (
                var t = null, e = null, o = 0;
                o < a.qiushouProxy.data.set.length;
                o++
            )
                a.qiushouProxy.data.set[o].pkID ==
                a.qiushouProxy.data.selectID
                    ? (t = a.qiushouProxy.data.set[o])
                    : (e = a.qiushouProxy.data.set[o]);
            t.score > e.score
                ? (this.lblState.string = i18n.t("QIUSHOU_ZHUANG_TAI_1"))
                : t.score < e.score
                ? (this.lblState.string = i18n.t("QIUSHOU_ZHUANG_TAI_2"))
                : (this.lblState.string = "");
        };
        e.prototype.onMyRid = function() {
            this.lblScore.string = i18n.t("QIUSHOU_ZONG_ZHI_ZHI", {
                num: a.qiushouProxy.myRid.score
            });
        };
        e.prototype.onItemUpdate = function() {
            this.lblYm.string = a.bagProxy.getItemCount(1061) + "";
            this.lblMm.string = a.bagProxy.getItemCount(1062) + "";
            this.lblYmm.string = a.bagProxy.getItemCount(1063) + "";
            this.lblFsm.string = a.bagProxy.getItemCount(1063) + "";
        };
        e.prototype.onClickTab = function(t, e) {
            this.itemIndex = parseInt(e);
            var itemId = this.arr[this.itemIndex];
            if (n.timeUtil.second > a.qiushouProxy.data.info.eTime)
                n.alertUtil.alert18n("ACTHD_OVERDUE");
            else {
                if (this.isWaiting) return;

                var o = this.check.isChecked ? 10 : 1;
                if (itemId == 1063 && a.bagProxy.getItemCount(itemId) < o ){
                    n.alertUtil.alertItemLimit(itemId);
                }
                else if(a.bagProxy.getItemCount(itemId) < o) {
                    n.alertUtil.alertItemLimit(itemId);
                    n.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: a.qiushouProxy.shop[this.itemIndex],
                        activityId: a.qiushouProxy.data.info.id
                    });
                } 
                else
                {
                    this.isWaiting = !0;
                    this.itemNum = o;

                    this.spineEffect.node.active = !0;
                    this.spineEffect.animation = "mu";
                    if(this.itemIndex == 0){
                        this.spineEffect.animation = "jin";
                    }
                    else  if(this.itemIndex == 1){
                        this.spineEffect.animation = "yin";
                    }
                    
                    this.scheduleOnce(this.onShou, 1.5);
                }
            }
        };

        e.prototype.onShou = function() {
            this.isWaiting = !1;
            a.qiushouProxy.sendPlant(
                this.arr[this.itemIndex],
                a.qiushouProxy.data.selectID,
                this.itemNum,
                function(ret){
                    //提示神秘奖励
                    if(ret.a && ret.a.msgwin && ret.a.msgwin.items){
                        for(var i = 0;i< ret.a.msgwin.items.length;++i){
                            var item = ret.a.msgwin.items[i];
                            if(item.id == 1065){
                                n.utils.openPrefabView("qiushou/QiuShouRwdTip");
                                break;
                            }
                        }
                    }
                }
            );
        };

        e.prototype.showTree = function() {
            if (a.qiushouProxy.myRid) {
                for (
                    var t = localcache.getList(localdb.table_chungeng_point),
                        e = 0;
                    e < t.length;
                    e++
                )
                    t[e].cg_grade > a.qiushouProxy.data.level ||
                        this.loadTree(t[e]);
                this.scheduleOnce(this.onTimer, 0.2);
            }
        };
        e.prototype.onTimer = function() {
            a.qiushouProxy.myRid
                ? (this.oldTree = a.qiushouProxy.myRid.score)
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
            a.qiushouProxy.isOneKey = this.check.isChecked;
        };
        __decorate([_(cc.Label)], e.prototype, "lblZy", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblState", void 0);
        __decorate([_(i.default)], e.prototype, "head", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblYm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblYmm", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFsm", void 0);
        __decorate([_(cc.Node)], e.prototype, "content", void 0);
        __decorate([_(cc.Toggle)], e.prototype, "check", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "spineEffect", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
