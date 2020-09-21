
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const s = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,

    properties: {
        yb0: cc.Node,
        yb1: cc.Node,
        yb2: cc.Node,
        yb3: cc.Node,
        yb4: cc.Node,
        lblyb0: cc.Label,
        lblyb1: cc.Label,
        lblyb2: cc.Label,
        lblyb3: cc.Label,
        lblyb4: cc.Label,
        lbljf0: cc.Label,
        lbljf1: cc.Label,
        lbljf2: cc.Label,
        lbljf3: cc.Label,
        lbljf4: cc.Label,
        pbr: cc.ProgressBar,
        lblHasSave: cc.Label,
        lblHasOpen: cc.Label,
        btnDown: cc.Button,
        btnOpen: cc.Button,
        btnRecharge: cc.Button,
        lblTime: cc.Label,
        lblRechargeTip: cc.Label,
        lblJinDu: cc.Label,
        allNode:cc.Node
    },


    onLoad() {
        this.allNode.active =false;
        facade.subscribe(Initializer.jinZhuProxy.JINZHU_UPDATE_INFO, this.onInfo, this);
        Initializer.jinZhuProxy.sendOpenActivity();
    },

    onInfo() {
        this.allNode.active =true;
        var proxy = Initializer.jinZhuProxy;
        var cfg = proxy.cfg;
        //cfg 复制
        var arr = cfg.activity_rwd;
        var maxLength = 390;
        var maxScore = arr[arr.length - 1].need;
        var allYb = arr[arr.length - 1].rwd;
        this.lblRechargeTip.string = i18n.t("JINZHU_RECHARGE_TIPS", { count: cfg.need });
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            this[`lblyb${index}`].string = element.rwd;
            this[`lbljf${index}`].string = element.need;
            this[`yb${index}`].x = element.need * maxLength / maxScore;
        }
        this.pbr.progress = proxy.cons / maxScore;
        this.lblJinDu.string = proxy.cons + "/" + maxScore;
        this.lblHasOpen.string = proxy.get + "/" + allYb;
        this.lblHasSave.string = proxy.rwd + "/" + allYb;
        this.lblTime.string =i18n.t("JINZHU_ACTIVITY_TIME",{d:Utils.timeUtil.format(cfg.info.sTime, "MM-dd") + "至" + Utils.timeUtil.format(cfg.info.eTime, "MM-dd")})         
        //按钮 状态
        this.btnRecharge.node.active = !proxy.qualification;//充值按钮显示 只要没有资格 就显示
        this.btnOpen.node.active = proxy.qualification && proxy.get < allYb; //当 已领取元宝数量 大于等于 总数量 则显示
    },

    btnGetRwd() {
        var proxy = Initializer.jinZhuProxy;
        proxy.sendRwd();
    },
    btnGoRecharge() {
        s.funUtils.openView(s.funUtils.recharge.id);
    },

    btnjinzhu() {
        var proxy = Initializer.jinZhuProxy;
        var cfg = proxy.cfg;
        //cfg 复制
        var arr = cfg.activity_rwd;
        var allYb = arr[arr.length - 1].rwd;
        if (!proxy.qualification) {
            // Utils.alertUtil.alert18n("JINZHU_PLEASE_RECHARGE");
            Utils.utils.showConfirm(i18n.t("JINZHU_PLEASE_RECHARGE"), function () {
                s.funUtils.openView(s.funUtils.recharge.id);
            })
        }
        if (proxy.qualification && proxy.get < allYb) {
            this.btnGetRwd();
        }
        if (proxy.qualification && proxy.get >= allYb) {
            Utils.alertUtil.alert18n("JINZHU_DOWN");
        }
    },

    onClose() {
        Utils.utils.closeView(this);
    }
});
