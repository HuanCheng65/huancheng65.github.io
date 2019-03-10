(function () {
    String.prototype.replaceAll=function(f,e){
        var reg = new RegExp(f,"g");   
        return this.replace(reg,e); 
    }    

    MuseUI.theme.add("custom", {
        primary: MuseUI.Colors.indigo,
    }, "light")
    MuseUI.theme.addCreateTheme(theme => {
        return `
        .main-box {
            background-color: ${theme.primary};
        }

        .main-title span {
            color: ${theme.secondary};
        }
        `;
    })
    Vue.use(MuseUI)
    var app = new Vue({
        el: "#app",
        data: {
            api: "https://huancheng65.github.io/TiebaLite/update.json",
            data: null,
            loaded: false,
            title: "",
            openDownload: false,
            downloadBeta: false,
            donates: [{
                avatar: "static/img/logo_white.png",
                title: "浣溪沙",
                content: "翻越长城，连接世界",
                link: "https://rainlou.icu/auth/register?code=huanchengfly",
            }],
        },
        created() {
            $.ajax(this.api, {
                cache: false,
                success: result => {
                    this.loaded = true
                    this.data = result
                }
            })
        },
        methods: {
            openDownloadDialog(isBeta = false) {
                this.downloadBeta = isBeta
                this.openDownload = true
            },
            closeDownloadDialog() {
                this.openDownload = false
            },
            startDownload(isBeta = false) {
                this.downloadBeta = isBeta
                this.closeDownloadDialog()
            },
            showBetaDownload() {
                return (this.data.config.enable_beta && this.data.beta.enable && this.data.beta.version_code > this.data.stable.version_code)
            },
        },
    })
    MuseUI.theme.use("custom")
})()