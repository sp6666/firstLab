var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTips = null;
            e.list = null;
            e.scroll = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.lblTips.string = i18n.t("union_zhuanrang_tip");
            var t = n.unionProxy.memberInfo;
            if (t) {
                var e =
                    n.unionProxy.applyList && n.unionProxy.applyList.length > 0;
                if (1 == t.post) {

                    var dismissName = "UNION_JIE_SAN";
                    var dismissIndex = 4;
                    if (1 == t.post && n.unionProxy.dismiss && n.unionProxy.dismiss.time) {


                        dismissName = "UNION_CANCEL_JIE_SAN_TIP";
                        dismissIndex = 6;
                    }

                    (this.list.data = [{
                            name: "UNION_MSG_TITLE",
                            index: 1
                        },
                        {
                            name: "UNION_APPLY_WORD",
                            index: 2,
                            red: e
                        },
                        {
                            name: "UNION_APPLY_FRIEND_WORD",
                            index: 5
                        },
                        {
                            name: "UNION_ZHUANG_RANG",
                            index: 3
                        },
                        {
                            name: dismissName,
                            index: dismissIndex
                        }
                    ])
                } else if (2 == t.post) {
                    (this.list.data = [{
                            name: "UNION_MSG_TITLE",
                            index: 1
                        },
                        {
                            name: "UNION_APPLY_WORD",
                            index: 2,
                            red: e
                        },
                        {
                            name: "UNION_APPLY_FRIEND_WORD",
                            index: 5
                        }
                    ]);
                } else {
                    this.list.data = [{
                        name: "UNION_APPLY_FRIEND_WORD",
                        index: 5
                    }]
                }


            }
            this.scroll.y = 1 == t.post ? 197 : 111;
        };
        e.prototype.eventClose = function () {
            l.utils.closeView(this);
        };
        e.prototype.onClickBtn = function (t, e) {
            var o = e.data;
            if (o) {
                switch (o.index) {
                    case 1:
                        l.utils.openPrefabView("union/UnionModify");
                        break;

                    case 2:
                        l.utils.openPrefabView("union/UnionApply");
                        break;

                    case 3:
                        l.utils.openPrefabView("union/TransferView");
                        break;

                    case 4:
                        n.unionProxy.dialogParam = {
                            type: "dismiss"
                        };
                        l.utils.openPrefabView("union/UnionDismiss");
                        break;
                    case 5:
                        l.utils.openPrefabView("union/UnionAddFriendView", null, {
                            type: 1
                        });
                        break;
                    case 6:
                        n.unionProxy.dialogParam = {
                            type: "cancelDismiss"
                        };
                        l.utils.openPrefabView("union/UnionDismiss");
                        break;
                }
                this.eventClose();
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTips", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "scroll", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;