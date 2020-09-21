var renderListItem = require("../../component/RenderListItem");
var initializer = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
cc.Class({
    extends: renderListItem.default,

    properties: {
        spHead: {
            default: null,
            type: cc.Sprite
        },
        spAvatar: {
            default: null,
            type: cc.Sprite
        },
        spRank: {
            default: null,
            type: cc.Sprite
        },
        //在线状态
        spStatus: {
            default: null,
            type: cc.Sprite
        },
        lblVip: {
            default: null,
            type: cc.Label
        },
        lblPlayerName: {
            default: null,
            type: cc.Label
        },
        lblShili: {
            default: null,
            type: cc.Label
        },
        lblTime: {
            default: null,
            type: cc.Label
        }

    },
    showData: function () {
        var data = this._data;
        this.spRank.active = !util.stringUtil.isBlank(data.rank);
        this.lblVip.active = !util.stringUtil.isBlank(data.vip);

        this.spHead.url = data.head;
        this.spAvatar.url = data.avatar;
        this.spRank.url = uiutil.uiHelps.getChatImg("img_rank_" + data.rank);
        this.spStatus.url = util.stringUtil.isBlank(data.off) ? uiutil.uiHelps.getChatImg("img_zhuangtai") : uiutil.uiHelps.getChatImg("img_xianshang");
        this.lblVip.string = "勋贵" + data.vip;
        this.lblPlayerName.string = data.name;
        this.lblShili.string = "势力:  " + data.shili;

        var hour = data.off / 60 / 60;
        var minute = data.off / 60;
        if (hour != 0) {
            if (hour <= 23)
                this.lblTime.string = hour + "小时前";
            if (hour > 23)
                this.lblTime.string = hour / 24 + "天前";
        }
        else {
            this.lblTime.string = minute + "分钟前";
        }

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    // start () {

    // },

    // update (dt) {},
});

