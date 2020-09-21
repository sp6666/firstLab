var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    config = require("../../Config"),
    urlPro = require("../../component/UrlLoad"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.lblTime = null;
            e.tipNode = null;
            e.item = null;
            e.dengNum = 0;
            e.urlKiteName = null;
            e.denging = false;
            e.spfKites = [];
            e.spKite = null;
            e.lblWindTip = null;
            e.spineWind = null;

            e.typeNode = null;
            e.spKiteName = null;
            e.lblKiteHeight = null;
            e.lblKiteHp = null;
            e.lblKiteStatus = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                n.kiteProxy.KITE_DATA_UPDATE,
                this.onDataUpdate,
                this
            );


            facade.subscribe(n.kiteProxy.KITE_WIND_BACK, this.showWindEffect, this);
            facade.subscribe(n.kiteProxy.KITE_ITEM_RED, this.onItemRed, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            n.kiteProxy.sendOpenInfo();
            n.shopProxy.sendList(!1);
            this.onItemUpdate();

            this.spineWind.setAnimation(0, "idle", true);

            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function () {
            var t = this,
                data = n.kiteProxy.data;
            if (data) {
                l.uiUtils.countDown(data.info.eTime, this.lblTime, function () {
                    i.timeUtil.second >= data.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                this.lblBall.string =
                    n.bagProxy.getItemCount(data.present.id) + "";
                this.tipNode.active =
                    0 == n.bagProxy.getItemCount(data.present.id);

                this.lblKiteHeight.string = i18n.t('KITE_HEIGHT', {
                    n: data.kite_status.height
                });

                var kite = n.kiteProxy.getKiteById(data.kite_status.id);
                if (kite) {
                    this.lblKiteHp.string = i18n.t('KITE_HP', {
                        n: data.kite_status.durability + '/' + kite.durability
                    });
                }


                if (data.kite_status.durability > 0) {
                    this.lblKiteStatus.string = i18n.t('KITE_STATUS_GOOD');
                } else {
                    this.lblKiteStatus.string = i18n.t('KITE_STATUS_BAD');
                }

                var kiteConfig = localcache.getItem(
                    localdb.table_kite,
                    data.kite_status.id
                );
                if (kiteConfig) {
                    this.spKite.url = config.Config.skin + kiteConfig.img;
                    this.urlKiteName.url = this.getNameUrl(kiteConfig.nameImg);
                }

                this.spKite.node.active = true;
                this.urlKiteName.node.active = true;

                this.lblWindTip.string = i18n.t('KITE_TIMES_TIP', {
                    num: n.kiteProxy.data.need_durability
                });
            } else {
                this.lblKiteHeight.string = '';
                this.lblKiteHp.string = '';
                this.lblKiteStatus.string = '';
                this.spKite.node.active = false;
                this.urlKiteName.node.active = false;
                this.lblWindTip.string = '';
            }

            this.schedule(this.updateSpineStatus, 0);
        };

        t.prototype.getNameUrl = function (imgPath) {
            return "zh-ch" == config.Config.lang ?
                config.Config.skin + imgPath :
                config.Config.skin + "_" + config.Config.lang + imgPath;
        };

        e.prototype.updateSpineStatus = function (t) {
            var kiteSpine = this.spKite.node.children[0];
            if (kiteSpine) {
                if (n.kiteProxy.data.kite_status.durability > 0) {
                    kiteSpine.getComponent(sp.Skeleton).timeScale = 1;
                } else {
                    kiteSpine.getComponent(sp.Skeleton).timeScale = 0;
                }
                this.unschedule(this.updateSpineStatus);
            }
        };
        e.prototype.onItemRed = function () {};
        e.prototype.onItemUpdate = function () {
            if (n.kiteProxy.data) {
                var t = n.bagProxy.getItemCount(n.kiteProxy.data.present.id);
                this.tipNode.active = 0 == t;
                this.lblBall.string = t + "";
            }
        };

        e.prototype.showWindEffect = function () {
            this.spineWind.setAnimation(0, "qifeng", false);
            this.spineWind.addAnimation(0, "idle", true);
        };


        e.prototype.onClickTab = function (t, e) {
            switch (e) {
                case "0":
                    i.utils.openPrefabView(
                        "ActivityShopView",
                        null,
                        n.kiteProxy.dhShop
                    );
                    break;

                case "1":
                    var o = n.limitActivityProxy.KITE_TYPE;
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null, {
                            type: o
                        }
                    );
                    break;

                case "2":
                case "3":
                    n.kiteProxy.sendPaiHang(e);
            }
        };
        e.prototype.onClickAdd = function () {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.kiteProxy.shop[0],
                activityId: n.kiteProxy.data.info.id
            });
            n.shopProxy.openShopBuy(n.kiteProxy.data.present.id);
        };

        e.prototype.onClickWind = function (t, e) {


            var data = n.kiteProxy.data;
            if (!data) {
                return;
            }
            var need = parseInt(e);

            if (need > 1) {
                if (data.kite_status.durability < n.kiteProxy.data.need_durability) {
                    i.alertUtil.alert(i18n.t('KITE_FULL_ERROR_CLIENT', {
                        num: n.kiteProxy.data.need_durability
                    }));
                    return;
                }
            }
            if (
                n.bagProxy.getItemCount(data.present.id) >= need
            ) {
                n.kiteProxy.sendWind(e);
            } else {
                this.onClickAdd();
                i.alertUtil.alertItemLimit(data.present.id);
            }
        };

        e.prototype.onClickType = function () {
            this.typeNode.active = true;
        };
        e.prototype.onClickCloseType = function () {
            this.typeNode.active = false;
        };

        e.prototype.onClickRepair = function () {
            var data = n.kiteProxy.data;
            var kite = n.kiteProxy.getKiteById(data.kite_status.id);
            if (kite) {
                var loss = kite.durability - data.kite_status.durability;
                var need = Math.ceil(loss / data.present.repair);
                var itemNum = n.bagProxy.getItemCount(data.present.id);
                if (loss == 0) {
                    i.alertUtil.alert18n('KITE_FULL');
                } else {
                    var self = this;
                    i.utils.showConfirmItem(
                        i18n.t("KITE_REPAIR_TIP", {
                            num: need
                        }),
                        data.present.id,
                        itemNum,
                        function () {
                            if (itemNum < need) {
                                self.onClickAdd();
                                i.alertUtil.alertItemLimit(data.present.id);
                            } else {
                                n.kiteProxy.sendRepair();

                            }
                        },
                        ""
                    );
                }



            }


        };

        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };


        __decorate([s(sp.Skeleton)], e.prototype, "spineWind", void 0);
        __decorate([s(urlPro.default)], e.prototype, "spKite", void 0);
        __decorate([s(urlPro.default)], e.prototype, "urlKiteName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "item", void 0);
        __decorate([s(cc.Node)], e.prototype, "typeNode", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblWindTip", void 0);

        __decorate([s(cc.Sprite)], e.prototype, "spKiteName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblKiteHeight", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblKiteHp", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblKiteStatus", void 0);

        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;