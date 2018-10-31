var pinus = window.pomelo;
var host = "127.0.0.1";
var connectorHost;
var connetorPort;
var username;
var users;
var userlist = [];
var rid;
var base = 1000;
var increase = 25;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        userNameLabel: {
            default: null,
            type: cc.Label
        },
        chatChannelLabel: {
            default: null,
            type: cc.Label
        },
        chatMsgLabel: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Log:'

    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    onLogin: function () {
        console.log("onLogin click...");
        username = this.userNameLabel.string;
        rid = this.chatChannelLabel.string;
        var that = this;

        // tell gate service username, get host and port return.
        pinus.init({
            host: host,
            port: 3014,
            log: true
        }, function () {
            var route = "gate.gateHandler.queryEntry";
            pinus.request(route, {
                uid: username
            }, function (data) {
                if (data.error) {
                    console.log(DUPLICATE_ERROR);
                    return;
                }
                // setName();
                // setRoom();
                // showChat();
                // initUserList(data);
                console.log("data = ");
                console.log(data);
                // get the right ip and port, do disconnect
                if(data.port){
                    console.log("port = " + data.port);
                    that.label.string += '\ngate return port:' + data.port + '\n ip:' + data.host;
                    connectorHost = data.host;
                    connetorPort = data.port;
                    pinus.disconnect();
                }
            });
        });

        pinus.on('disconnect', function(reason) {
            console.log("pinus onLogin disconnect");
            console.log(reason);
        });
        
        
        
    },
    onConnector: function () {
        console.log('onConnector click...');
        var that = this;

        // tell connector service username, get host and port return.
        pinus.init({
            host: connectorHost,
            port: connetorPort,
            log: true
        }, function () {
            var route = "connector.entryHandler.enter";
            pinus.request(route, {
                username: username,
                rid: rid
            }, function (data) {
                if (data.error) {
                    console.log(DUPLICATE_ERROR);
                    return;
                }
                console.log("data = ");
                console.log(data);
                that.label.string += "\nusers:" + data.users;
                users = data.users;
                
            });
        });

    },
    onChatSend: function () {
        console.log("onChatSend ... to All user");
        var that = this;
        console.log("chat Msg = " + that.chatMsgLabel.string);
        var chatRoute = "chat.chatHandler.send";

        pinus.request(chatRoute, {
            rid: rid,
            content: that.chatMsgLabel.string,
            from: username,
            target: "*"
        }, function (data) {
            console.log("onChatSend ...  chat.chatHandler.send get = ");
            console.log(data);
        });

        //wait message from the server.
        pinus.on('onChat', function (data) {
            var user = data.user;
            console.log('onChatSend onChat ... ');
            console.log(data);
            that.label.string += "\n" + data.from + " said: " + data.msg;
        });

        //update user list
        pinus.on('onAdd', function (data) {
            var user = data.user;
            console.log('onChatSend onAdd ... ');
            console.log(data);
            // that.label.string += "\n" + user;
            // users = data.user;
        });

        //update user list
        pinus.on('onLeave', function (data) {
            var user = data.user;
            console.log('onChatSend onLeave ... ');
            console.log(data);
            // that.label.string += "\n" + user;
            // users = data.user;
        });

    },
    
    showError: function (content) {
        this.label.string = content;
    },
});


