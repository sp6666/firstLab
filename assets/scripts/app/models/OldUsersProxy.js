var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../component/RedDot"),
    l = require("../Initializer"),
    a = (function () {
        function t() {

            this.data = null;
            this.regression = null;



            this.OLD_USERS_BACK = "OLD_USERS_BACK";

        }
        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.mate.cfg, this.onDataUpdate, this);
            JsonHttp.subscribe(proto_sc.mate.regression, this.onRegression, this);
        };

        t.prototype.clearData = function () {
            this.data = null;
            this.regression = null;

        };

        t.prototype.onRegression = function (t) {

            this.regression = t;



            if (this.data && this.data.regression_shop) {
                for (var i = 0; i < this.data.regression_shop.length; i++) {
                    var item = this.data.regression_shop[i];
                    var num = this.regression.shop_record[item.id];
                    if (num) {
                        this.data.regression_shop[i].limit -= num;
                    }
                }

            }

            this.sendUIChange();

        };

        t.prototype.onDataUpdate = function (t) {
            if (t) {
                this.data = t;
                this.sendUIChange();
            }

        };

        t.prototype.sendUIChange = function () {
            if (this.data && this.regression) {

                for (var i = 0; t.rwd && i < t.rwd.length; i++) {
                    this.data.order_rwd[i].get = true;
                }

                facade.send(this.OLD_USERS_BACK);
                this.updateRedDot();
            }

        };



        t.prototype.sendRegressionRwd = function () {
            var e = new proto_cs.huodong.hd6280RegressionRwd();
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };



        t.prototype.sendInvitedRwd = function () {
            var e = new proto_cs.huodong.hd6280InvitedRwd();
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendInviteRwd = function (uid) {
            var e = new proto_cs.huodong.hd6280InviteRwd();
            e.uid = uid;

            var self = this;
            JsonHttp.send(e, function () {
                if (self.regression && self.regression.invite_user && self.regression.invite_user !== 0) {
                    i.alertUtil.alert18n("FRIEND_CHAT_SEND_SUCCESS");
                }
            });
        };


        t.prototype.sendActivityRwd = function (id, level) {
            var e = new proto_cs.huodong.hd6280ActivityRwd();
            e.id = id;
            e.level = level;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendOrderRwd = function (id) {
            var e = new proto_cs.huodong.hd6280OrderRwd();
            e.id = id;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendCashBuy = function (id) {
            var e = new proto_cs.huodong.hd6280CashBuy();
            e.id = id;
            e.num = 1;
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendInfoCmd = function () {
            JsonHttp.send(new proto_cs.huodong.hd6280Info());
        };

        t.prototype.sendGetSevenDayRwd = function (id) {
            var e = new proto_cs.huodong.hd6280SignRwd();
            e.id = id;

            var str = '';
            switch (id) {
                case 1:
                    str = 'oldusers_story_day_1';
                    break;
                case 3:
                    str = 'oldusers_story_day_2';
                    break;
                case 5:
                    str = 'oldusers_story_day_3';
                    break;
            }

            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
                if (str !== '') {
                    var t = i.utils.getParamStr(str);
                    l.playerProxy.addStoryId(t);
                    i.utils.openPrefabView("StoryView", !1, {
                        type: 3
                    });
                }
            });
        };

        t.prototype.updateRedDot = function () {
            var bReturnRwd = false,
                bRwd = false,
                bActivity = false,
                bGift = false,
                bRecharge = false;
            //回归礼包bReturnRwd
            if (this.regression.regression_rwd_got === 0) {
                bReturnRwd = true;
            }

            //累计充值bRwd
            for (var t of this.data.order_rwd) {
                if (this.regression.cons >= t.need && this.regression.rwd < t.id) {
                    bRwd = true;
                    break;
                }
            }
            //七日登录bGift
            for (var o = 0; this.regression.sign_level && o < this.regression.sign_level.length; o++) {
                if (1 == this.regression.sign_level[o].type) {
                    bGift = true;
                    break;
                }
            }
            //活跃bActivity

            var score = this.regression.activity_score;
            var rwd_got = this.regression.activity_rwd_got;
            if (rwd_got && score) {
                var numbers = [40, 80, 120];
                for (var t of this.data.activity_rwd) {
                    for (var i = 0; i < 3; i++) {
                        if (score[t.id] && score[t.id] >= numbers[i]) {
                            bActivity = true;

                            // 是否已领取
                            if (rwd_got[t.id]) {
                                for (var save of rwd_got[t.id]) {
                                    if (save === numbers[i]) {
                                        bActivity = false;
                                        break;
                                    }
                                }
                            }
                        }
                        if (bActivity) {
                            break;
                        }
                    }

                    if (bActivity) {
                        break;
                    }
                }
            }


            //折扣礼包 bRecharge
            for (var e = 0; this.data.regression_shop && e < this.data.regression_shop.length; e++) {
                var o = this.data.regression_shop[e];
                if (0 == o.type && o.limit > 0) {
                    bRecharge = true;
                    break;
                }
            }

            n.default.change("oldUsers", bReturnRwd);
            n.default.change("oldUsers_recharge_rwd", bRwd);
            n.default.change("oldUsers_seven_activity", bActivity);
            n.default.change("oldUsers_seven_gift", bGift);
            n.default.change("oldUsers_recharge_gift", bRecharge);
        };

        t.prototype.bOldUser = function () {
            if (this.data && this.regression && this.regression.is_regression === 1) {
                return true;
            }
            return false;
        }


        return t;
    })();
o.OldUsersProxy = a;