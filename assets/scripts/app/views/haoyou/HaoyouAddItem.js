var renderListItem = require("../../component/RenderListItem");
var head = require("../user/UserHeadItem");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default, 

    properties: {
        //头像
        nodeHead:       { default: null, type: head.default },
        //名字
        lblPlayerName:  { default: null, type: cc.Label },
        //勋贵
        lblVip:         { default: null, type: cc.Label },
        //势力值
        lblShili:       { default: null, type: cc.Label },
        //申请按钮
        btnShenqing:    { default: null, type: cc.Button },
        //忽略按钮
        btnHulue:       { default: null, type: cc.Button },
        //同意按钮
        btnTongyi:      { default: null, type: cc.Button },
        //移出黑名单按钮
        btnYichu:      { default: null, type: cc.Button },
        //同殿
        nodeSameClub:   { default: null, type: cc.Node }
    },
    showData() {
        if(!this._data)
            return;

        var t = this._data;
        var isSelf = init.playerProxy.userData.uid == t.uid;

        this.btnShenqing.node.active = t.type == 1 && !isSelf;  //申请按钮
        this.btnHulue.node.active = t.type == 2 && !isSelf;     //忽略按钮
        this.btnTongyi.node.active = t.type == 2 && !isSelf;    //同意按钮
        this.btnYichu.node.active = t.type == 5 && !isSelf;    //移出黑名单按钮
        
        //头像
        this.nodeHead.setUserHead(t.job, t.headavatar);
        //名字
        this.lblPlayerName.string = t.name;
        //vip
        this.lblVip.node.active = !utils.stringUtil.isBlank(t.vip);
        this.lblVip.string = i18n.t("COMMON_VIP_NAME", { v: 0 != t.vip ? t.vip : "" });
        //势力
        this.lblShili.string = i18n.t("MAIN_SHILI",{ d: t.shili});

        //是否同一个宫殿
        this.nodeSameClub.active = t.is_same_club > 0;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { 
    },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickShenqing() {
        //申请好友
        init.haoyouProxy.sendFApplay(this._data.id);
    },
    onClickHulue() {
        //忽略好友申请
        init.haoyouProxy.sendfriendNo(this._data.id);
    },
    onClickTongyi() {
        //同意好友申请
        init.haoyouProxy.sendfriendOK(this._data.id);
    },
    onClickYichu() {
        //移出黑名单
        var curId = this._data.uid;
        utils.utils.showConfirm(i18n.t("HAOYOU_YICHU_CONFIRM", {name: this._data.name}), function () {
            init.chatProxy.sendDelBlack(curId);
        }) 
    },
    onClickAvatar() {
        var t = this._data;

        if(t.id)
        {
            t.id == init.playerProxy.userData.uid ? time.funUtils.openView(time.funUtils.userView.id) : init.playerProxy.sendGetOther(t.id);
        }
        else if(t.uid)
        {
            t.uid == init.playerProxy.userData.uid ? time.funUtils.openView(time.funUtils.userView.id) : init.playerProxy.sendGetOther(t.uid);
        }
    },
});

