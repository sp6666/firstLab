var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var initializer = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //头像
        nodeHead: {
            default: null,
            type: head.default
        },
        //底板
        spSelected: {
            default: [],
            type: cc.Node
        },
        //排名
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
        lblPlayerName: {
            default: null,
            type: cc.Label
        },
        //势力值
        lblShili: {
            default: null,
            type: cc.Label
        },
        //时间
        lblTime: {
            default: null,
            type: cc.Label
        },
        //时间节点
        nodeTime: {
            default: null,
            type: cc.Node
        },
        //在线
        nodeOnLine: {
            default: null,
            type: cc.Node
        }
    },
    showData: function () {
        var t = this._data;

        //头像
        this.nodeHead.setUserHead(t.job, t.headavatar);

        //名字
        this.lblPlayerName.string = t.name;

        //勋贵
        this.lblVip.node.active = !util.stringUtil.isBlank(t.vip);
        this.lblVip.string = i18n.t("COMMON_VIP_NAME", { v: 0 != t.vip ? t.vip : "" });

        //势力
        this.lblShili.string = i18n.t("HAOYOU_SHILI_MAOHAO", { num: t.shili});

        //选中
        if(t.isSelect < this.spSelected.length)
        {
            for(var idx = 0; idx < this.spSelected.length; idx++)
            {
                this.spSelected[idx].active = idx == t.isSelect;
            }
        }
        
        //时间
        var off = util.timeUtil.second - t.last_operation;
        this.nodeTime.active = (off > 60);      //超过60秒显示时间
        this.nodeOnLine.active = (off <= 60);   //60秒以内显示在线

        var time = util.timeUtil.getDateDiff(t.last_operation);
        this.lblTime.string = time;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickItem() {
        facade.send(initializer.haoyouProxy.ON_FRIEND_LIST_SELECTED, this._data.id);
    },
    onClickAvatarItem() {
        var t = this.data;
        t && (t.id == initializer.playerProxy.userData.uid ? time.funUtils.openView(time.funUtils.userView.id) : initializer.playerProxy.sendGetOther(t.id));
    },
});

