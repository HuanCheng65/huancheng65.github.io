var app = new Vue({
    el: '#app',
    data: {
        website: [{
                link: "http://www.ifeng.com/",
                icon: "ifeng_news.png",
                name: "凤凰网"
            },
            {
                link: "http://www.sohu.com/",
                icon: "sohu_news.png",
                name: "搜狐"
            },
            {
                link: "http://www.sina.com.cn/",
                icon: "sina_news.png",
                name: "新浪"
            },
            {
                link: "http://www.qq.com/",
                icon: "tencent_news.png",
                name: "腾讯"
            },
            {
                link: "http://www.163.com/",
                icon: "netease_news.png",
                name: "网易"
            },
            {
                link: "http://www.people.com.cn/",
                icon: "peopledailychina.png",
                name: "人民网"
            },
            {
                link: "http://weibo.com/",
                icon: "weibo.png",
                name: "微博"
            },
            {
                link: "http://www.zhihu.com",
                icon: "zhihu.png",
                name: "知乎"
            },
            {
                link: "http://tieba.baidu.com/",
                icon: "baidu_tieba.png",
                name: "贴吧"
            },
            {
                link: "http://www.jd.com/",
                icon: "jd.png",
                name: "京东"
            },
            {
                link: "http://weiyun.com/",
                icon: "weiyun.png",
                name: "微云"
            }
        ],
        custom: [],
        weather: {},
        city: "",
        websiteName: "",
        websiteUrl: "",
        editCustom: false,
        weatherLoaded: false,
        showSuggest: false,
        keyword: "",
        searchUrl: "https://www.baidu.com/s",
        searchName: "wd",
        searchIcon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0MXtmaWxsOiMxQjc4RDc7fQo8L3N0eWxlPgo8ZyBpZD0iU2hhcGVfMV8xXyIgY2xhc3M9InN0MCI+Cgk8ZyBpZD0iU2hhcGVfMSI+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNTAuMiwxMTUuMWM0LjYsMTguMSwxMi4zLDMyLjYsMjUuMSw0Mi40YzUuOSw0LjUsMTUuNCwxMC44LDI3LjEsOC44YzI3LjItNC42LDQwLjEtMjUsNDYuNS01MC4yCgkJCQljMTAuMS0zOS44LTguNi04MS42LTM1LjEtOTIuNmMtNC43LTItMTAuMS0yLjYtMTYuOS0yLjZjLTEuOCwwLjMtMy43LDAuNS01LjUsMC44Yy00LjMsMS4zLTguNCwyLjgtMTIsNC45CgkJCQljLTE3LjUsMTAuNi0yNiwyOS44LTMwLjYsNTMuNGMtMSw1LjItMS41LDEyLjctMC42LDE4LjNDMTQ5LjMsMTA0LjQsMTQ4LjksMTA5LjYsMTUwLjIsMTE1LjF6IE0zMjEsMTcwLjYKCQkJCWMxNi42LDMuNCwyOS45LTUuNSwzOC41LTEyLjRjMTQuNS0xMS42LDI0LjMtMzEuMiwyOC41LTUzYzUuNS0yOC44LTE0LjktNTYuMy0zMC40LTY2LjNjLTUuOC0zLjgtMTIuMS03LjYtMjEuOC03LjUKCQkJCWMtMS43LDAuMi0zLjQsMC40LTUuMSwwLjZjLTMuMiwxLjItNi40LDIuNS05LjYsMy43Yy0xNy44LDEwLjMtMzIuNywyOC42LTM5LjQsNDkuOGMtMS41LDQuOS0yLDEwLTIuOSwxNS43CgkJCQljLTEuMiw3LjMtMC40LDE3LjcsMC44LDIzLjlDMjg0LjUsMTUxLjUsMjk1LDE2NS4yLDMyMSwxNzAuNnogTTk3LjMsMjY5LjVjMjYuMS00LjQsNDAuOC0xNi4zLDQ4LjEtMzkuMgoJCQkJYzMuNy0xMS43LDYuMS0zNy41LDIuNC01MS42Yy02LjQtMjMuOC0yNy45LTUwLjUtNTguMy01MGMtMi4yLDAuMy00LjMsMC41LTYuNSwwLjhjLTMuOCwwLjgtOCwyLjMtMTEsNC4xCgkJCQljLTE3LjcsMTAuNC0yNi4zLDMwLjEtMzEuMiw1My4yYy03LDMzLDguMiw2My4xLDI3LjUsNzUuN0M3NC42LDI2Ni42LDg1LjIsMjcxLjUsOTcuMywyNjkuNXogTTQ2OS45LDIxMAoJCQkJYy04LjItMjcuMy0yNC4zLTQ2LjYtNjAuNC00Ni4xYy0yLjIsMC4zLTQuNCwwLjUtNi43LDAuOGMtMywwLjgtNiwxLjctOSwyLjZjLTEzLjYsNS41LTIyLjEsMTcuMi0yNi43LDMxLjYKCQkJCWMtMi40LDcuNS0yLjcsMTUuOC00LjEsMjQuNXYyMS40YzEuMyw4LjMsMC44LDE1LjQsMi45LDIyLjRjNi43LDIxLjMsMTguNywyOS4xLDQyLjYsMzMuNGM3LjUsMS40LDE3LjksMS4yLDI0LjktMC42CgkJCQljMjEuOC01LjcsMzEuNi0yMC4yLDM2LjctNDIuNmMxLjQtNi4zLDAuNC0xMi43LDEuNi0xOS44QzQ3My4xLDIyOC44LDQ3MiwyMTYuOSw0NjkuOSwyMTB6IE0zOTguNSwzMzcuOAoJCQkJYy0xMS04LjctMjAuNS0xOS4zLTMwLjgtMjguN2MtNy02LjQtMTQuNS0xMy40LTIwLjQtMjAuOGMtNy45LTkuOS0xNy0xOS0yNC4xLTI5LjZjLTcuNi0xMS40LTE1LjUtMjMuMS0yNi41LTMxCgkJCQljLTEyLjgtOS4yLTI1LjctMTYuMS00OC4zLTE1LjdjLTQuNSwxLjgtMTAsMS4yLTE0LjMsMi42Yy0xMi42LDMuOC0yMi4zLDEwLjItMzEuNCwxNy41Yy05LjUsNy41LTE0LjksMTguOS0yMiwyOQoJCQkJYy01LjksOC41LTEzLjUsMTUuNS0xOS44LDIzLjRjLTIuOSwzLjEtNS45LDYuMS04LjgsOS4yYy05LjIsNy40LTE3LjIsMTYuNi0yNi41LDIzLjljLTIwLjgsMTYuNS0zNS40LDI3LjctNDkuMSw1MS44CgkJCQljLTE5LDMzLjUtMS44LDgzLjYsMjAuMiwxMDEuM2M3LjUsNi4xLDE2LjcsMTEuMiwyNy41LDEzLjljNS4zLDEuMywxMS4zLDAuOCwxNy4zLDEuOGg5LjRjNC41LDAuNywxMSwwLjUsMTUuMy0wLjIKCQkJCWMzLjEtMC4xLDYuMy0wLjMsOS40LTAuNGM5LjMtMS41LDE4LjUtMS40LDI3LjMtMy4xYzEwLjEtMiwxOS45LTMuNywzMC40LTUuN2M0LjMtMC4zLDguNS0wLjUsMTIuOC0wLjhsMTIuNC0wLjIKCQkJCWM5LjQsMS42LDE4LjUsMS4zLDI3LjEsMy4xYzguNywyLjQsMTcuNCw0LjcsMjYuMSw3LjFjNi40LDEuMiwxMi44LDIuNCwxOS4yLDMuNWMyNS44LDUsNTYuNywwLjIsNzMtOS42CgkJCQljOC00LjgsMTQuOC0xMS4xLDIwLTE4LjZjMTMtMTguNywyMS4xLTU3LjYsOS42LTg0QzQyNS43LDM1OS41LDQxMi43LDM0OS4xLDM5OC41LDMzNy44eiBNMjM4LjMsNDQ4LjdjMCwwLTI1LjgsMC0zOS4yLDAKCQkJCWMtOS4xLDAtMjQuNywxLjUtMzIuNC0wLjZjLTIzLjEtNi4yLTM1LjgtMjEuNC00MC44LTQ1LjljLTEuMi02LTEuOS0xNC43LTAuOC0yMS42YzAuOC00LjgsMS40LTguNywyLjktMTIuNgoJCQkJYzcuNy0xOC42LDIyLjMtMzIuNSw0NC43LTM2LjNjMTEuOC0wLjEsMjMuNy0wLjEsMzUuNS0wLjJjMC4yLTAuMSwwLjQtMC4xLDAuNi0wLjJjMC4xLTE0LjIsMC4zLTI4LjQsMC40LTQyLjYKCQkJCWMwLjMtMC4yLDAuNy0wLjQsMS0wLjZjOS4yLDAuMSwyOC4xLDAuNCwyOC4xLDAuNEwyMzguMyw0NDguN3ogTTM2MC4yLDQ0OC43YzAsMC0yNS43LDAtMzkuNCwwYy0yMi42LDAtNDMuMiwyLjMtNTQuNy05CgkJCQljLTEwLjgtMTAuNi0xMC0yNC0xMC00NS4zYzAuMS0xOS45LDAtNjAsMC02MGgzMC40djYzYzAsMC0wLjgsMTUuNiwyLjIsMTkuOGM0LjIsNi4xLDE0LjYsNC45LDI0LjksNC45CgkJCQljNS40LTAuMSwxNi43LTAuMiwxNi43LTAuMnYtODcuNWgzMEwzNjAuMiw0NDguN0wzNjAuMiw0NDguN3ogTTE1Ny4xLDM3N2MtNi4zLDIwLjIsMi4xLDM5LjIsMTguMSw0NC4yCgkJCQljNC4xLDEuMywxMC4xLDAuOCwxNS4zLDAuOGMxMS42LTAuMSwxNy4zLDAsMTcuMywwdi02My40YzAsMC0xOS40LTAuMS0yOC44LTAuMkMxNzIuOSwzNTkuNCwxNjAuOCwzNjUuMiwxNTcuMSwzNzd6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=",
        suggestList: []
    },
    methods: {
        setSearchEngine: function (name) {
            if (name == "Baidu") {
                app.searchUrl = "https://www.baidu.com/s";
                app.searchName = "wd";
                app.searchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0MXtmaWxsOiMxQjc4RDc7fQo8L3N0eWxlPgo8ZyBpZD0iU2hhcGVfMV8xXyIgY2xhc3M9InN0MCI+Cgk8ZyBpZD0iU2hhcGVfMSI+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNTAuMiwxMTUuMWM0LjYsMTguMSwxMi4zLDMyLjYsMjUuMSw0Mi40YzUuOSw0LjUsMTUuNCwxMC44LDI3LjEsOC44YzI3LjItNC42LDQwLjEtMjUsNDYuNS01MC4yCgkJCQljMTAuMS0zOS44LTguNi04MS42LTM1LjEtOTIuNmMtNC43LTItMTAuMS0yLjYtMTYuOS0yLjZjLTEuOCwwLjMtMy43LDAuNS01LjUsMC44Yy00LjMsMS4zLTguNCwyLjgtMTIsNC45CgkJCQljLTE3LjUsMTAuNi0yNiwyOS44LTMwLjYsNTMuNGMtMSw1LjItMS41LDEyLjctMC42LDE4LjNDMTQ5LjMsMTA0LjQsMTQ4LjksMTA5LjYsMTUwLjIsMTE1LjF6IE0zMjEsMTcwLjYKCQkJCWMxNi42LDMuNCwyOS45LTUuNSwzOC41LTEyLjRjMTQuNS0xMS42LDI0LjMtMzEuMiwyOC41LTUzYzUuNS0yOC44LTE0LjktNTYuMy0zMC40LTY2LjNjLTUuOC0zLjgtMTIuMS03LjYtMjEuOC03LjUKCQkJCWMtMS43LDAuMi0zLjQsMC40LTUuMSwwLjZjLTMuMiwxLjItNi40LDIuNS05LjYsMy43Yy0xNy44LDEwLjMtMzIuNywyOC42LTM5LjQsNDkuOGMtMS41LDQuOS0yLDEwLTIuOSwxNS43CgkJCQljLTEuMiw3LjMtMC40LDE3LjcsMC44LDIzLjlDMjg0LjUsMTUxLjUsMjk1LDE2NS4yLDMyMSwxNzAuNnogTTk3LjMsMjY5LjVjMjYuMS00LjQsNDAuOC0xNi4zLDQ4LjEtMzkuMgoJCQkJYzMuNy0xMS43LDYuMS0zNy41LDIuNC01MS42Yy02LjQtMjMuOC0yNy45LTUwLjUtNTguMy01MGMtMi4yLDAuMy00LjMsMC41LTYuNSwwLjhjLTMuOCwwLjgtOCwyLjMtMTEsNC4xCgkJCQljLTE3LjcsMTAuNC0yNi4zLDMwLjEtMzEuMiw1My4yYy03LDMzLDguMiw2My4xLDI3LjUsNzUuN0M3NC42LDI2Ni42LDg1LjIsMjcxLjUsOTcuMywyNjkuNXogTTQ2OS45LDIxMAoJCQkJYy04LjItMjcuMy0yNC4zLTQ2LjYtNjAuNC00Ni4xYy0yLjIsMC4zLTQuNCwwLjUtNi43LDAuOGMtMywwLjgtNiwxLjctOSwyLjZjLTEzLjYsNS41LTIyLjEsMTcuMi0yNi43LDMxLjYKCQkJCWMtMi40LDcuNS0yLjcsMTUuOC00LjEsMjQuNXYyMS40YzEuMyw4LjMsMC44LDE1LjQsMi45LDIyLjRjNi43LDIxLjMsMTguNywyOS4xLDQyLjYsMzMuNGM3LjUsMS40LDE3LjksMS4yLDI0LjktMC42CgkJCQljMjEuOC01LjcsMzEuNi0yMC4yLDM2LjctNDIuNmMxLjQtNi4zLDAuNC0xMi43LDEuNi0xOS44QzQ3My4xLDIyOC44LDQ3MiwyMTYuOSw0NjkuOSwyMTB6IE0zOTguNSwzMzcuOAoJCQkJYy0xMS04LjctMjAuNS0xOS4zLTMwLjgtMjguN2MtNy02LjQtMTQuNS0xMy40LTIwLjQtMjAuOGMtNy45LTkuOS0xNy0xOS0yNC4xLTI5LjZjLTcuNi0xMS40LTE1LjUtMjMuMS0yNi41LTMxCgkJCQljLTEyLjgtOS4yLTI1LjctMTYuMS00OC4zLTE1LjdjLTQuNSwxLjgtMTAsMS4yLTE0LjMsMi42Yy0xMi42LDMuOC0yMi4zLDEwLjItMzEuNCwxNy41Yy05LjUsNy41LTE0LjksMTguOS0yMiwyOQoJCQkJYy01LjksOC41LTEzLjUsMTUuNS0xOS44LDIzLjRjLTIuOSwzLjEtNS45LDYuMS04LjgsOS4yYy05LjIsNy40LTE3LjIsMTYuNi0yNi41LDIzLjljLTIwLjgsMTYuNS0zNS40LDI3LjctNDkuMSw1MS44CgkJCQljLTE5LDMzLjUtMS44LDgzLjYsMjAuMiwxMDEuM2M3LjUsNi4xLDE2LjcsMTEuMiwyNy41LDEzLjljNS4zLDEuMywxMS4zLDAuOCwxNy4zLDEuOGg5LjRjNC41LDAuNywxMSwwLjUsMTUuMy0wLjIKCQkJCWMzLjEtMC4xLDYuMy0wLjMsOS40LTAuNGM5LjMtMS41LDE4LjUtMS40LDI3LjMtMy4xYzEwLjEtMiwxOS45LTMuNywzMC40LTUuN2M0LjMtMC4zLDguNS0wLjUsMTIuOC0wLjhsMTIuNC0wLjIKCQkJCWM5LjQsMS42LDE4LjUsMS4zLDI3LjEsMy4xYzguNywyLjQsMTcuNCw0LjcsMjYuMSw3LjFjNi40LDEuMiwxMi44LDIuNCwxOS4yLDMuNWMyNS44LDUsNTYuNywwLjIsNzMtOS42CgkJCQljOC00LjgsMTQuOC0xMS4xLDIwLTE4LjZjMTMtMTguNywyMS4xLTU3LjYsOS42LTg0QzQyNS43LDM1OS41LDQxMi43LDM0OS4xLDM5OC41LDMzNy44eiBNMjM4LjMsNDQ4LjdjMCwwLTI1LjgsMC0zOS4yLDAKCQkJCWMtOS4xLDAtMjQuNywxLjUtMzIuNC0wLjZjLTIzLjEtNi4yLTM1LjgtMjEuNC00MC44LTQ1LjljLTEuMi02LTEuOS0xNC43LTAuOC0yMS42YzAuOC00LjgsMS40LTguNywyLjktMTIuNgoJCQkJYzcuNy0xOC42LDIyLjMtMzIuNSw0NC43LTM2LjNjMTEuOC0wLjEsMjMuNy0wLjEsMzUuNS0wLjJjMC4yLTAuMSwwLjQtMC4xLDAuNi0wLjJjMC4xLTE0LjIsMC4zLTI4LjQsMC40LTQyLjYKCQkJCWMwLjMtMC4yLDAuNy0wLjQsMS0wLjZjOS4yLDAuMSwyOC4xLDAuNCwyOC4xLDAuNEwyMzguMyw0NDguN3ogTTM2MC4yLDQ0OC43YzAsMC0yNS43LDAtMzkuNCwwYy0yMi42LDAtNDMuMiwyLjMtNTQuNy05CgkJCQljLTEwLjgtMTAuNi0xMC0yNC0xMC00NS4zYzAuMS0xOS45LDAtNjAsMC02MGgzMC40djYzYzAsMC0wLjgsMTUuNiwyLjIsMTkuOGM0LjIsNi4xLDE0LjYsNC45LDI0LjksNC45CgkJCQljNS40LTAuMSwxNi43LTAuMiwxNi43LTAuMnYtODcuNWgzMEwzNjAuMiw0NDguN0wzNjAuMiw0NDguN3ogTTE1Ny4xLDM3N2MtNi4zLDIwLjIsMi4xLDM5LjIsMTguMSw0NC4yCgkJCQljNC4xLDEuMywxMC4xLDAuOCwxNS4zLDAuOGMxMS42LTAuMSwxNy4zLDAsMTcuMywwdi02My40YzAsMC0xOS40LTAuMS0yOC44LTAuMkMxNzIuOSwzNTkuNCwxNjAuOCwzNjUuMiwxNTcuMSwzNzd6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=";
            } else if (name == "Google") {
                app.searchUrl = "https://www.google.com.hk/search";
                app.searchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzQyODVGNDt9Cgkuc3Qxe2ZpbGw6IzM0QTg1Mzt9Cgkuc3Qye2ZpbGw6I0ZCQkMwNTt9Cgkuc3Qze2ZpbGw6I0VBNDMzNTt9Cgkuc3Q0e2ZpbGw6bm9uZTt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ4Mi4yLDI2MS42YzAtMTYuNy0xLjUtMzIuOC00LjMtNDguM0gyNTUuN3Y5MS4zaDEyN2MtNS41LDI5LjUtMjIuMSw1NC41LTQ3LjEsNzEuMnY1OS4yaDc2LjMKCQlDNDU2LjUsMzk0LDQ4Mi4yLDMzMy41LDQ4Mi4yLDI2MS42eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI1NS43LDQ5Mi4zYzYzLjcsMCwxMTcuMS0yMS4xLDE1Ni4yLTU3LjJsLTc2LjMtNTkuMmMtMjEuMSwxNC4yLTQ4LjIsMjIuNS03OS45LDIyLjUKCQljLTYxLjUsMC0xMTMuNS00MS41LTEzMi4xLTk3LjNINDQuOHY2MS4xQzgzLjYsNDM5LjQsMTYzLjQsNDkyLjMsMjU1LjcsNDkyLjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIzLjYsMzAxLjFjLTQuNy0xNC4yLTcuNC0yOS4zLTcuNC00NC44czIuNy0zMC43LDcuNC00NC44di02MS4ySDQ0LjhjLTE2LDMxLjktMjUuMSw2Ny45LTI1LjEsMTA2CgkJczkuMSw3NC4xLDI1LjEsMTA2TDEyMy42LDMwMS4xeiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTI1NS43LDExNC4xYzM0LjcsMCw2NS44LDExLjksOTAuMiwzNS4zbDY3LjctNjcuN2MtNDAuOS0zOC4xLTk0LjMtNjEuNS0xNTcuOS02MS41CgkJYy05Mi4yLDAtMTcyLjEsNTIuOS0yMTAuOSwxMzBsNzguOCw2MS4yQzE0Mi4yLDE1NS43LDE5NC4yLDExNC4xLDI1NS43LDExNC4xeiIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTE5LjcsMjAuM2g0NzJ2NDcyaC00NzJWMjAuM3oiLz4KPC9nPgo8L3N2Zz4K";
                app.searchName = "oq";
            } else if (name == "Bing") {
                app.searchUrl = "https://cn.bing.com/search";
                app.searchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzBEODQ4NDt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3Mi40LDM2Mi44YzUyLjctMjcuOCwxMDQuOS01NS4yLDE1Ny44LTgzLjFjLTE0LjItNi41LTI3LjUtMTIuNS00MC44LTE4LjVjLTEwLjItNC42LTIwLjMtOS4xLTMwLjUtMTMuNwoJCWMtMi40LTEtNC0yLjUtNS4yLTVjLTE1LjctMzQuMi0zMS41LTY4LjMtNDcuMi0xMDIuNGMtMC41LTEtMC44LTIuMS0xLjUtNGMxMS41LDMuNSwyMi4zLDYuOCwzMywxMC4xYzQ1LDEzLjgsOTAsMjcuNiwxMzUsNDEuNAoJCWMyNS45LDcuOSw1MS44LDE2LDc3LjgsMjMuN2MzLjYsMS4xLDQuNCwyLjgsNC40LDYuM2MtMC4xLDM3LjctMC4xLDc1LjMsMCwxMTNjMCwzLjItMC45LDQuOS0zLjcsNi42CgkJQzM2Mi42LDM5MCwyNzMuNyw0NDMsMTg0LjgsNDk2Yy00LDIuNC04LjEsNC42LTEyLDcuMmMtMiwxLjQtMy40LDEtNS4yLTAuM2MtMzYuMS0yNS4zLTcyLjItNTAuNi0xMDguMy03NS45CgkJYy0xLjgtMS4zLTIuNi0yLjctMi41LTVjMC4xLTYuNywwLTEzLjMsMC0yMGMwLTEwMS42LDAuMS0yMDMuMywwLjEtMzA0LjljMC0yOC4zLDAtNTYuNy0wLjItODVjMC00LjQsMS00LjksNS0zLjYKCQljMzUuMiwxMi4xLDcwLjUsMjQuMSwxMDUuOCwzNmMzLDEsMy42LDIuNywzLjYsNS41YzAsMjAuNSwwLDQxLDAuMSw2MS41YzAuNCw4Mi4xLDAuOCwxNjQuMywxLjIsMjQ2LjQKCQlDMTcyLjQsMzU5LjQsMTcyLjQsMzYwLjcsMTcyLjQsMzYyLjh6Ii8+CjwvZz4KPC9zdmc+Cg==";
                app.searchName = "q";
            }
        },
        search: function (text) {
            app.keyword = text;
            $("#search").submit();
        },
        closeSuggest: function () {
            app.showSuggest = false;
        },
        getSkycon: function (skycon) {
            if (skycon == "CLEAR_DAY") {
                return "晴天"
            } else if (skycon == "CLEAR_NIGHT") {
                return "晴夜"
            } else if (skycon == "PARTLY_CLOUDY_DAY") {
                return "多云"
            } else if (skycon == "PARTLY_CLOUDY_NIGHT") {
                return "多云"
            } else if (skycon == "CLOUDY") {
                return "阴"
            } else if (skycon == "RAIN") {
                return "雨"
            } else if (skycon == "SNOW") {
                return "雪"
            } else if (skycon == "WIND") {
                return "风"
            } else if (skycon == "HAZE") {
                return "雾霾沙尘"
            }
        },
        reGetLocation: function () {
            app.weatherLoaded = false;
            setTimeout(function () {
                mdui.updateSpinners()
            }, 1);
            getLocation(function (data) {
                if (data.success) {
                    $.ajax({
                        url: "https://api.caiyunapp.com/v2/qaqyzITp0YxKbAXh/" + data.lng + "," + data.lat + "/forecast.jsonp",
                        dataType: "jsonp",
                        jsonpCallback: "weather"
                    });
                }
            }, true);
        },
        editCustomWebsite: function () {
            app.editCustom = !app.editCustom;
        },
        removeCustom: function (index) {
            var custom = JSON.parse(window.localStorage.custom);
            custom.splice(index)
            window.localStorage.custom = JSON.stringify(custom);
            app.custom = JSON.parse(window.localStorage.custom);
        }
    },
    watch: {
        keyword: function (text) {
            if (text != "") {
                $.ajax({
                    url: "https://sug.so.360.cn/suggest",
                    dataType: "jsonp",
                    data: {
                        encodein: "utf-8",
                        encodeout: "utf-8",
                        format: "json",
                        word: text
                    },
                    jsonpCallback: "suggest"
                });
            } else {
                app.showSuggest = false;
            }
        }
    }
});

function suggest(data) {
    app.suggestList = data.result;
    app.showSuggest = true;
}

function getLocation(callback, force) {
    if (window.localStorage.location == null | force) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var arg = {
                    success: true,
                    lng: r.point.lng,
                    city: r.address.city,
                    lat: r.point.lat
                };
                window.localStorage.location = JSON.stringify(arg);
                callback(arg);
            } else {
                var arg = {
                    success: false,
                    lng: this.getStatus()
                };
                callback(arg);
            }
        }, {
            enableHighAccuracy: true
        });
    } else {
        callback(JSON.parse(window.localStorage.location));
    }
}

function weather(data) {
    app.weatherLoaded = true;
    app.weather = data;
}

getLocation(function (data) {
    if (data.success) {
        app.city = data.city;
        $.ajax({
            url: "https://api.caiyunapp.com/v2/qaqyzITp0YxKbAXh/" + data.lng + "," + data.lat + "/forecast.jsonp",
            dataType: "jsonp",
            jsonpCallback: "weather"
        });
    }
});

mdui.updateSpinners();
if (window.localStorage.custom == null) {
    window.localStorage.custom = "[]";
}
app.custom = JSON.parse(window.localStorage.custom);
var dialog = document.getElementById('addDialog');
dialog.addEventListener('confirm.mdui.dialog', function () {
    console.log("confirm");
    var custom = JSON.parse(window.localStorage.custom);
    custom.push({
        link: app.websiteUrl,
        name: app.websiteName
    });
    window.localStorage.custom = JSON.stringify(custom);
    app.websiteName = "";
    app.websiteUrl = "";
    app.custom = JSON.parse(window.localStorage.custom);
});