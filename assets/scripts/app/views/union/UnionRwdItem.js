var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    utils = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    Config = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.lblLeft = null;
            e.lblBest = null;
            e.nodeGet = null;
            e.lblGet = null;
            e.bigIcon = null;
            e.lblName = null;
            e.spType = [];
            e.spTwType = [];

            e.btnGet = null;
            return e;
        }
        e.prototype.showData = function () {
            this.canTouch = true;
            var t = this.data;
            if (t) {

                if (t.itemid != undefined) {
                    if (Config.Config.lang == "zh-ch") {
                        this.bigIcon.spriteFrame = this.spType[t.itemid - 1];
                    } else {
                        this.bigIcon.spriteFrame = this.spTwType[t.itemid - 1];
                    }


                    this.lblScore.string = t.total + '';
                } else {

                    if (Config.Config.lang == "zh-ch") {
                        this.bigIcon.spriteFrame = this.spType[t.id - 1];
                    } else {
                        this.bigIcon.spriteFrame = this.spTwType[t.id - 1];
                    }

                    this.lblScore.string = t.count + '';
                }


                if (n.unionProxy.envelopesIndex === 1) {

                    this.lblLeft.node.active = false;
                    this.lblBest.node.active = false;

                    this.lblName.node.active = false;
                    if (t.id === 1) {

                        this.lblName.node.active = true;
                        this.lblName.string = i18n.t('UNION_NOBLE_SHORT_TIP');
                    }


                } else {

                    this.lblLeft.node.active = true;
                    this.lblBest.node.active = true;

                    this.lblLeft.string = i18n.t('UNION_RWD_TIP2', {
                        n1: t.surplus_times,
                        n2: t.max
                    });
                    this.lblBest.string = i18n.t('UNION_RWD_TIP3', {
                        name: t.name
                    });

                    this.lblName.node.active = false;
                }

                this.btnGet.interactable = true;
                switch (n.unionProxy.envelopesIndex) {
                    case 0:
                        this.lblGet.string = i18n.t('ACHIEVE_GET');
                        this.nodeGet.opacity = 0;
                        if (this.data.status === 1) {
                            this.lblGet.string = i18n.t('ACHIEVE_GETED');
                            this.nodeGet.opacity = 255;
                            this.btnGet.interactable = false;
                        }
                        if (this.data.surplus_times === 0) {
                            this.lblGet.string = i18n.t('ACHIEVE_NONE');
                            this.nodeGet.opacity = 255;
                            this.btnGet.interactable = false;
                        }

                        this.lblName.node.active = false;
                        break;
                    case 1:
                        this.lblGet.string = i18n.t('BAG_SHANGCI');
                        this.nodeGet.opacity = 0;
                        if (n.unionProxy.envelopes.surplus_times === 0) {
                            this.nodeGet.opacity = 255;
                            this.btnGet.interactable = false;
                        }


                        break;
                    case 2:
                        this.lblGet.string = i18n.t('ACHIEVE_GET');
                        this.nodeGet.opacity = 0;
                        if (this.data.status === 1) {
                            this.lblGet.string = i18n.t('ACHIEVE_GETED');
                            this.nodeGet.opacity = 255;
                            this.btnGet.interactable = false;
                        }
                        if (this.data.surplus_times === 0) {
                            this.lblGet.string = i18n.t('ACHIEVE_NONE');
                            this.nodeGet.opacity = 255;
                            this.btnGet.interactable = false;
                        }

                        this.lblName.node.active = true;
                        this.lblName.string = this.data.grant_name;
                        break;
                }

                if (t.name === '') {
                    this.lblBest.node.active = false;
                }
            }
        };
        e.prototype.onClickLook = function () {
            switch (n.unionProxy.envelopesIndex) {
                case 0:
                    if (this.data.status === 1) {

                    } else
                        n.unionProxy.sendReceiveEnvelopes(this.data.id);
                    break;
                case 1:
                    if (n.unionProxy.envelopes.surplus_times === 0) {
                        utils.alertUtil.alert(i18n.t('BOITE_ATTEND_NUM_SHORT'));
                    } else if (this.canTouch) {
                        this.canTouch = false;
                        this.scheduleOnce(this.reset, 3);

                        var k = localcache.getItem(localdb.table_unionSend, n.unionProxy.clubInfo.level);

                        if (n.playerProxy.userData.cash < k.red_packet_p) {
                            utils.alertUtil.alertItemLimit(1);
                        } else {
                            utils.utils.showConfirmItem(
                                i18n.t("UNION_BUY_CASH_TIP", {
                                    num: k.red_packet_p
                                }),
                                1,
                                n.playerProxy.userData.cash,
                                () => {
                                    n.unionProxy.sendGrabEnvelope(this.data.id, k.red_packet_p, k.gx);
                                }
                            );
                        }


                    }
                    break;
                case 2:
                    if (this.data.status === 1) {

                    } else
                        n.unionProxy.sendRobEnvelopes(this.data.id);
                    break;
            }

        };
        e.prototype.reset = function () {
            this.canTouch = true;
        };
        __decorate([_([cc.SpriteFrame])], e.prototype, "spType", void 0);
        __decorate([_([cc.SpriteFrame])], e.prototype, "spTwType", void 0);

        __decorate([_(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLeft", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblBest", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);

        __decorate([_(cc.Sprite)], e.prototype, "bigIcon", void 0);

        __decorate([_(cc.Node)], e.prototype, "nodeGet", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblGet", void 0);

        __decorate([_(cc.Button)], e.prototype, "btnGet", void 0);

        return (e = __decorate([c], e));
    })(i.default);
o.default = d;