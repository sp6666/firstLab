var list=require("../../component/List");
var roleSpine=require("../../component/RoleSpine");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var apiUtils = require("../../utils/ApiUtils");
var cfg = require("../../Config");

cc.Class({
    extends: cc.Component,

    properties: {

        editIP:{
            //好感度
            default:null,
            type:cc.EditBox
        },
        lblLog:{
            //好感度
            default:null,
            type:cc.Label
        }
    },


    onLoad () {
    },

    // start () {

    init () {
    },
    // },

    // update (dt) {},
    updateData() {
        this.lblIntimacy.string = init.confidanteProxy.hero.heros.curr;
    },

    //判断ip地址的合法性
    checkIP(value){
        var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        var reg = value.match(exp);

        return reg != null;
    },

    onClickRelogin() {
        var strIp = this.editIP.string;
        /*
        if(!this.checkIP(strIp))
        {
            utils.alertUtil.alert("ip 不合法");
            return;
        }
        */
        cfg.Config.apiPath = "http://" + strIp + "/gw/";
        cfg.Config.serverList = "http://" + strIp + "/serverlist.php";
        cfg.Config.USER_LOGIN_URL = "http://" + strIp + "/fastLogin.php";
        //cfg.Config.pf = "paytest";
        cfg.Config.version = "1.1.6.131.2";

        this.lblLog.string += strIp + " ";
        this.lblLog.string += " login_by_sdk:" + cfg.Config.login_by_sdk;

        this.lblLog.string += " pf:" + cfg.Config.pf;
        //如果在手机上，发upcontral
        if(cfg.Config.pf)
        {
            var self = this;
            var e = "upcontrol.php",
            o = cfg.Config.version_code;
            "" != cfg.Config.pfn && (e = "upcontrol_" + icfg.Config.pfn + ".php");

            var getStr = cfg.Config.apiPath + e + "?pf=" + cfg.Config.pf + "&version=" + cfg.Config.version + "&pfv=" + cfg.Config.pfv;

            this.lblLog.string += " str:" + getStr;
            apiUtils.apiUtils.get(
                getStr,
                function(a) {
                    self.lblLog.string += " a:" + a;
                    utils.alertUtil.alert("upcontrol 返回" + a);
                    init.loginProxy.sendServerList();
                }
            );
        }
        else
        {
            //如果在电脑上发serverList
            init.loginProxy.sendServerList();
        }
    },

    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
