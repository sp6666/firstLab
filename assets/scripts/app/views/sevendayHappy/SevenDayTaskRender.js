var RenderListItem = require("../../component/RenderListItem");
var list = require("../../component/List");
var TimeProxy = require("../../models/TimeProxy");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        //任务描述
        lab_des: cc.Label,
        //奖励
        list: list.default,
        //领取按钮
        btn_receive: cc.Button,
        //前往按钮
        btn_go: cc.Button,
        //积分
        lab_score: cc.Label,
        //已完成
        lab_complete: cc.Label,
    },

    // onLoad () {},

    showData() {
        var t = this._data;
        this.list.data = t.data.rwd;
        this.lab_score.string = i18n.t("SEVEN_DAY_SCORE", {
            num: t.data.point
        });
        this.lab_complete.node.active = t.status == 0;
        this.btn_receive.node.active = t.status == 1;
        this.btn_go.node.active = t.status == 2;
        this.lab_score.node.active = t.status != 0;
        let str = t.data.msg;
        if (t.status != 0)
            str += "(" + t.count + "/" + t.data.set[0] + ")";
        this.lab_des.string = str;
    },

    onReceiveClick() {
        var msg = new proto_cs.huodong.hd6508TaskConfrim();
        msg.id = this._data.data.id;
        JsonHttp.send(msg);
    },

    onGoClick() {
        var t = this._data;
        t && TimeProxy.funUtils.openView(t.data.jumpTo);
    },
});
