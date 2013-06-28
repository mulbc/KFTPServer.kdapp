/* Compiled by kdc on Fri Jun 28 2013 08:21:21 GMT+0000 (UTC) */
(function() {
/* KDAPP STARTS */
/* BLOCK STARTS: /home/blum/Applications/FTPServer.kdapp/index.coffee */
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function() {
  var MainView;
  MainView = (function(_super) {
    __extends(MainView, _super);

    function MainView() {
      var proftpd,
        _this = this;
      MainView.__super__.constructor.apply(this, arguments);
      this.prerequirements = new KDHeaderView({
        title: "<strong>First step</strong> - stop other FTP servers",
        type: "big"
      });
      this.installation = new KDHeaderView({
        title: "<strong>Second step</strong> - install the FTP server",
        type: "big"
      });
      this.configuration = new KDHeaderView({
        title: "<strong>Third step</strong> - configure first user accounts",
        type: "big"
      });
      this.stopOthers = new KDButtonView({
        title: "Stop other FTP servers",
        callback: function() {
          var modal;
          return modal = new ModalViewWithTerminal({
            width: 700,
            title: "Stop other FTP servers",
            content: "<div class='modalformline'>\n    This will stop other services running on port 21\n</div>",
            terminal: {
              command: "sudo bash -c 'for i in `lsof -n -t -i tcp:21`; do kill $i; done'",
              hidden: true
            },
            buttons: {
              "Proceed": {
                cssClass: "modal-clean-gray",
                callback: function() {
                  return modal.showTerminal();
                }
              }
            }
          });
        }
      });
      this.ftpPackageManager = new KDToggleButton({
        defaultState: "Install",
        states: [
          {
            title: "Install",
            callback: function() {
              var modal;
              return modal = new ModalViewWithTerminal({
                width: 700,
                title: "Installation",
                content: "<div class='modalformline'>\n    This will install the FTP server for your VM\n</div>",
                terminal: {
                  command: "sudo bash -c \" DEBIAN_FRONTEND=noninteractive /usr/bin/apt-get install proftpd -y \" && sudo /bin/sed -i 's!# RequireValidShell!RequireValidShell!' /etc/proftpd/proftpd.conf && echo 'AuthUserFile /etc/proftpd/user.passwd' | sudo tee -a /etc/proftpd/proftpd.conf && sudo service proftpd restart && exit",
                  hidden: true
                },
                buttons: {
                  "Install": {
                    cssClass: "modal-clean-gray",
                    callback: function() {
                      return modal.showTerminal();
                    }
                  }
                }
              });
            }
          }, {
            title: "Uninstall",
            callback: function() {
              var modal;
              return modal = new ModalViewWithTerminal({
                width: 700,
                title: "Removal",
                content: "<div class='modalformline'>\n    This will uninstall the FTP server and all it's configuration files!\n</div>",
                terminal: {
                  command: "sudo bash -c \" DEBIAN_FRONTEND=noninteractive /usr/bin/apt-get remove --purge proftpd-basic -y \" && exit",
                  hidden: true
                },
                buttons: {
                  "Uninstall": {
                    cssClass: "modal-clean-gray",
                    callback: function() {
                      return modal.showTerminal();
                    }
                  }
                }
              });
            }
          }
        ]
      });
      this.addUser = new KDButtonView({
        title: "Configure first ftp account",
        callback: function() {
          var modal;
          return modal = new ModalViewWithTerminal({
            width: 700,
            title: "Configure first ftp account",
            content: "<div class='modalformline'>\n    This will configure one user account and <strong>remove all other</strong> ftp accounts! \n    The username of the new user will be <strong>ftpuser<\strong>\n</div>",
            terminal: {
              command: "sudo ftpasswd --passwd -F --not-system-password --file /etc/proftpd/user.passwd --shell /bin/false --home /home --gid 1000 --uid 1000 --name ftpuser",
              hidden: true
            },
            buttons: {
              "Proceed": {
                cssClass: "modal-clean-gray",
                callback: function() {
                  return modal.showTerminal();
                }
              }
            }
          });
        }
      });
      proftpd = FSHelper.createFileFromPath("/usr/sbin/proftpd");
      proftpd.exists(function(err, exists) {
        if (exists) {
          return _this.ftpPackageManager.setState("Uninstall");
        }
      });
    }

    MainView.prototype.pistachio = function() {
      return "{{> this.prerequirements}}\n<div style=\"padding-top: 8px; padding-left: 10px;\">{{> this.stopOthers}}</div>\n{{> this.installation}}\n<div style=\"padding-top: 8px; padding-left: 10px;\">{{> this.ftpPackageManager}}</div>\n{{> this.configuration}}\n<div style=\"padding-top: 8px; padding-left: 10px;\">{{> this.addUser}}</div>";
    };

    return MainView;

  })(JView);
  return appView.addSubView(new MainView({
    cssClass: "ftpserver"
  }));
})();

/* KDAPP ENDS */
}).call();