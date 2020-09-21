var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var initializer = require("../../Initializer");
var uiutils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //头像
        nodeHead: {
            default: null,
            type: head.default
        },
        //面板
        spStatus: {
            default: [],
            type: cc.Node
        },
        //勋贵等级
        lblVip: {
            default: null,
            type: cc.Label
        },
        //名字
        lblName: {
            default: null,
            type: cc.Label
        },
        //最后聊天内容
        lblLast: {
            default: null,
            type: cc.Label
        },
        //红点
        nodeRed: {
            default: null,
            type: cc.Node
        },
    },
    showData: function () {
        var t = this._data;

        var info = null;
        for (var idx = 0; idx < initializer.haoyouProxy.friends.length; idx++) {
            if (t.id == initializer.haoyouProxy.friends[idx].id) {
                info = initializer.haoyouProxy.friends[idx];
                break;
            }
        }

        if (!info) {
            //提示没有找到info
            utils.alertUtil.alert(i18n.t("HAOYOU_FRIEND_NOT_FOUND", {
                id: t.id
            }));
            return;
        }

        //头像
        this.nodeHead.setUserHead(info.job, info.headavatar);

        //名字
        this.lblName.string = info.name;

        //勋贵
        this.lblVip.node.active = !utils.stringUtil.isBlank(info.vip);
        this.lblVip.string = i18n.t("COMMON_VIP_NAME", {
            v: 0 != info.vip ? info.vip : ""
        });

        //最后聊天内容
        this.lblLast.string = initializer.chatProxy.getSpMsg(t.msg);

        //红点
        this.nodeRed.active = t.status > 0;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickItem() {
        initializer.haoyouProxy.sendHistoryChat(this._data.id);
    },
});