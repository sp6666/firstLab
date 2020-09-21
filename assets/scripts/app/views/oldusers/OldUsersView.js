var r = require("../../utils/Utils"),
    n = require("../../Initializer"),
    UtilsUI = require("../../utils/UIUtils"),
    List = require("../../component/List"),
    s = require("../../utils/ShaderUtils"),
    l = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {

        btnRwd: cc.Button,
        lblRwd: cc.Label,

        btnInvite: cc.Button,
        btnInviteGift: cc.Button,

        lblCd: cc.Label,
        ebId: cc.EditBox,
        tipLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        facade.subscribe(n.oldUsersProxy.OLD_USERS_BACK, this.onDataUpdate, this);

        this.ebId.placeholder = i18n.t('OLD_USERS_EDIT_NAME');
        this.tipLabel.string = '';
        n.oldUsersProxy.sendInfoCmd();
    },

    onDataUpdate() {



        if (!n.oldUsersProxy.data || !n.oldUsersProxy.regression) {
            return;
        }

        var bOld = n.oldUsersProxy.bOldUser();

        this.btnInvite.interactable = bOld && n.oldUsersProxy.regression.invite_rwd_send === 0;

        if (n.oldUsersProxy.regression.invite_rwd_send === 2) {
            this.tipLabel.string = i18n.t('OLD_USERS_INVITED_RWD_PASS');
            this.ebId.node.active = false;
        }
        if (n.oldUsersProxy.regression.invite_user && n.oldUsersProxy.regression.invite_user !== 0) {
            this.tipLabel.string = n.oldUsersProxy.regression.invite_user + '';
            this.ebId.node.active = false;
        }
        if (!bOld) {
            this.tipLabel.string = i18n.t('OLD_USERS_EDITE_LIMIT');
            this.ebId.node.active = false;
        }

        this.btnInviteGift.interactable = bOld && n.oldUsersProxy.regression.invite_user && n.oldUsersProxy.regression.invited_rwd === 1;

        this.btnRwd.interactable = bOld && n.oldUsersProxy.regression.regression_rwd_got === 0;
        this.lblRwd.string = !bOld || this.btnRwd.interactable ? i18n.t('ACHIEVE_GET') : i18n.t('ACHIEVE_GETED');



        if (bOld) {
            var t = this;
            l.uiUtils.countDown(
                n.oldUsersProxy.data.info.eTime,
                this.lblCd,
                function () {
                    t.lblCd.string = i18n.t("ACTHD_OVERDUE");
                }, true,
                i18n.t("ACTIVITY_COUNT_DOWN_TXT") + ": "
            );
        } else {
            this.lblCd.string = i18n.t("OLD_USERS_NO_LIMIT_TIP");
        }
    },

    getInvitedRwd() {
        n.oldUsersProxy.sendInvitedRwd();
    },

    getReturnGift() {
        n.oldUsersProxy.sendRegressionRwd();
    },

    sendFriendId() {
        var id = parseInt(this.ebId.string);
        if (id) {
            n.oldUsersProxy.sendInviteRwd(id);
        }
    },

    closeSelf() {
        r.utils.closeView(this);
    },

    go() {
        r.utils.closeView(this);
    },

    showReturnGiftView() {
        r.utils.openPrefabView(
            "oldusers/OldUsersRwdNode",
            false,
            n.oldUsersProxy.data.regression_rwd
        );
    },

    showInviteGiftView() {
        r.utils.openPrefabView(
            "oldusers/OldUsersRwdNode",
            false,
            n.oldUsersProxy.data.invited_rwd
        );
    },

    openOtherView(t, e) {
        r.utils.openPrefabView(e);
    },
});