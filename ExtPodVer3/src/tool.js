const extToolObj = function () {
    const self = this;
    self.IS_TEST = false;
    self.token = null;
    self.hubs = [];
    self.baseUrl = self.IS_TEST ? "http://localhost:3201" : "https://account.podorders.store";
    self.loginUrl = self.IS_TEST ? "http://localhost:3201e/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth"
    self.grapqlUrl = self.IS_TEST ? "http://localhost:3201/graphql" : "https://api-account.podorders.store/graphql"
    self.configRule = {
        // .js-product-name: Printerval
        // .product_title, .post-header h1, .product h1: Woocommerce
        // #listing-page-cart h1[data-buy-box-listing-title=true]: Etsy
        name: [
            ".js-product-name",
            ".product_title",
            ".post-header h1",
            ".product h1",
            "#listing-page-cart h1[data-buy-box-listing-title=true]",
            ".product-single__title",
            "h4.product_name",
            "h1.x-item-title__mainTitle span"
        ].join(", "),
        images: [
            // Printerval
            {
                block: ".product-gallery-box, .product-gallery-wrapper",
                loop: ".product-gallery-item picture source",
                main_attr: "srcset",
                extra_attr: ""
            },
            // Woocommerce
            {
                block: ".woocommerce-product-gallery__wrapper, .woocommerce-product-gallery__image, .owl-carousel",
                loop: "img",
                main_attr: "data-large_image",
                extra_attr: "src"
            },
            // Etsy
            {
                block: ".listing-page-image-carousel-component .image-carousel-container .carousel-pane-list",
                loop: "img",
                main_attr: "data-src-zoom-image",
                extra_attr: "src"
            },
            // shopify
            {
              block: ".product__photos, .product_gallery",
              loop: "img",
              main_attr: "data-src",
              extra_attr: "src"
              
            },
            {
              block: ".product-single__photos",
              loop: "img.zoomImg",
              main_attr: "data-src",
              extra_attr: "src"
              
            },
            // Ebay
            {
              block: ".ux-image-carousel-container .ux-image-carousel",
              loop: "img",
              main_attr: "data-src",
              extra_attr: "src"
            }
        ]
    }

    $(document).on("click", '#ext-show-login-popup', (e) => self.renderLoginPopup());
    $(document).on("click", '#ext-login-popup-close-btn', (e) => self.removeFormPopup());
    $(document).on("click", '#ext-login-popup', (e) => e.target.id !== "ext-login-popup" ? null : self.removeFormPopup());
    $(document).on("click", '#ext-login-popup', (e) => e.target.id !== "ext-login-popup" ? null : self.removeFormPopup());
    $(document).on("submit", '#ext-login-form', (e) => self.handleLogin(e));
    $(document).on("click", "#ext-tool-menu-button", (e) => self.showOrHideToolMenuTalbe());
    $(document).on("click", "#ext-tool-menu-close-btn", (e) => self.showOrHideToolMenuTalbe());
    $(document).on("click", "#btn-logout", (e) => self.handleLogout());
    $(document).on("change", "#ext-hub-picker", (e) => self.handleChangeHub())
    $(document).on("change", "#ext-template-item-id", (e) => self.handleChangeTemplateItem())
    $(document).on("click", ".ext-image-picker", (e) => self.handleChangeImage(e))
    $(document).on("click", "#ext-save-item-button", (e) => self.handleSaveItem(e))
    $(document).on("click", "#report-error-website", (e) => self.handleReportError(e))

    self.injectScript = () => {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', chrome.runtime.getURL('injection/retrieve-window-variables.js'));
        document.getElementsByTagName("body")[0].appendChild(script);
        return self
    }

    self.getItemName = () => {
        try {
            // Shopbase
            return JSON.parse(document.getElementById('__INITIAL_STATE__').textContent).product.product.title
        } catch (error) {}
        try {
            return JSON.parse($("body").attr("tmp___NEXT_DATA__")).props.pageProps.product.title
        } catch (error) {}
        return _.trim($(_.get(self, ["configRule", "name"], "")).first().text())
    }
    self.getImages = () => {
        const getImageFromSite = (configRules, index) => {
            const configRule = _.get(configRules, index, null)
            if (!configRule) {
                return []
            }
            const images = []
            $.each($(_.get(configRule, "block", "")).first().find(_.get(configRule, "loop", "")), (index, element) => {
                const imgAttrTmp = $(element).attr(_.get(configRule, "main_attr", "")) ? $(element).attr(_.get(configRule, "main_attr", "")) : $(element).attr(_.get(configRule, "extra_attr", ""))
                const imgUrl = _.head(_.split(imgAttrTmp, " "))
                images.push(imgUrl)
            });
            if (!images.length) {
                return getImageFromSite(configRules, index + 1)
            }
            return images
        }
        try {
            return _.map(JSON.parse(document.getElementById('__INITIAL_STATE__').textContent).product.product.images, image => {
                return image.src
            })
        } catch (error) {}
        try {
            return _.map(JSON.parse($("body").attr("tmp___NEXT_DATA__")).props.pageProps.product.images, image => {
                return image.src
            })
        } catch (error) {}
        return _.filter(_.union(getImageFromSite(_.get(self, ["configRule", "images"], []), 0)), img => img)
    }

    self.getToken = async () => {
        return chrome.storage.local.get([TOKEN_KEY, HUB_KEY]).then(data => {
            self.token = _.get(data, TOKEN_KEY, null)
            return self
        })
    };

    self.getRule = async () => {
        return new Promise((resolver, reject) => {
            var settings = {
                "url": self.grapqlUrl,
                "method": "POST",
                "headers": {
                    "authorization": "Bearer " + self.token,
                    "content-type": "application/json;charset=UTF-8",
                },
                "data": "{\"query\":\"query { info {extension_rule { name, images {block, loop, main_attr, extra_attr}}}}\"}",
            };

            $.ajax(settings).done(function (response) {
                self.configRule = _.get(response, ["data", "info", "extension_rule"])
                resolver(self)
            });
        })
    }

    self.getHubs = async () => {
        return new Promise((resolver, reject) => {
            var settings = {
                "url": self.grapqlUrl,
                "method": "POST",
                "headers": {
                    "authorization": "Bearer " + self.token,
                    "content-type": "application/json;charset=UTF-8",
                },
                "data": "{\"query\":\"query { cUser   { _id,identity_label,email,token,name,status,sku_label,onos_email,auth_docker   { auth_id,docker_id,groups,author, docker   { domain,server,status,label,plan,annually } } }}\"}",
            };

            $.ajax(settings).done(function (response) {
                const auth_docker = _.get(response, ["data", "cUser", "auth_docker"])
                const hubs = _.map(_.filter(auth_docker, auth_docker => {
                    return _.get(auth_docker, ["docker", "status"]) === "Running"
                }), auth_docker => {
                    return {
                        domain: _.get(auth_docker, ["docker", "domain"], ""),
                        server: _.get(auth_docker, ["docker", "server"], ""),
                        label: _.get(auth_docker, ["docker", "label"], "")
                    }
                })
                return chrome.storage.local.set({ [HUB_KEY]: hubs }).then(() => {
                    self.hubs = hubs
                    resolver(self)
                })
            });
        })
    };

    self.handleLogin = (e) => {
        e.preventDefault();
        $("#ext-login-form-button").prop('disabled', true);
        var form = $("#ext-login-form");
        $.ajax({
            type: "POST",
            url: self.loginUrl,
            data: form.serialize(),
            success: data => {
                self.handleSuccessLogin(data)
            },
            error: data => {
                console.log(data)
                let errorMsg = _.get(data, "responseText", "")
                self.handleErrorLogin(errorMsg)
            }
        });
    }

    self.handleSuccessLogin = async data => {
        const token = _.get(data, "token", null)
        const auth_docker = _.get(data, "auth_docker", [])
        const hubs = _.map(_.filter(auth_docker, auth_docker => {
            return _.get(auth_docker, ["docker", "status"]) === "Running"
        }), auth_docker => {
            return {
                domain: _.get(auth_docker, ["docker", "domain"], ""),
                server: _.get(auth_docker, ["docker", "server"], ""),
                label: _.get(auth_docker, ["docker", "label"], "")
            }
        })
        return chrome.storage.local.set({ [TOKEN_KEY]: token, [HUB_KEY]: hubs }).then(() => {
            self.token = token
            self.hubs = hubs
            self.removeLoginBanner()
            self.removeFormPopup()
            extensionInit()
            return token
        })
    }
    self.handleErrorLogin = msg => {
        $("#ext-login-form-button").prop('disabled', false);
        $("#ext-login-popup-msg").text(msg);
    }

    self.handleSaveItem = (e) => {
        $("#ext-save-item-button").prop('disabled', true);
        $("#ext-save-item-button").addClass("loading")
        $("#ext-msg").text("Saving item, pls wait...")
        const hubUrl = $("#ext-hub-picker").val()
        const itemID = $("#ext-template-item-id").val()
        if (!itemID) {
            $("#ext-save-item-button").prop('disabled', false);
            $("#ext-save-item-button").removeClass("loading")
            $("#ext-msg").text("Template ID cannot be empty")
            $("#ext-msg").attr('style', 'text-align: center;color:#c52c29 !important');
            return
        }
        const itemName = self.getItemName()
        const images = []
        const imagesUrl = []
        $.each($(".ext-image-picker.checked"), (index, element) => {
            images.push(`images[]=${$(element).attr("src")}`)
            imagesUrl.push($(element).attr("src"))
        });
        if (!images.length) {
            $("#ext-save-item-button").prop('disabled', false);
            $("#ext-save-item-button").removeClass("loading")
            $("#ext-msg").text("Image cannot be empty")
            $("#ext-msg").attr('style', 'text-align: center;color:#c52c29 !important');
            return
        }
        const imgsStr = images.join("&")
        const targetURL = self.IS_TEST ? "http://localhost:3001/api/v1/item-clone" : `https://api-${hubUrl}/api/v1/item-clone`
        var settings = {
            "url": `${targetURL}`,
            "data": {
                id: itemID,
                name: itemName,
                images: imagesUrl
            },
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${self.token}`
            },
        };

        $.ajax(settings).done(function (response) {
            console.log(response)
            if (_.get(response, "data", "").includes("OK, New Identity is")) {
                $("#ext-save-item-button").prop('disabled', false);
                $("#ext-save-item-button").removeClass("loading")
                $("#ext-msg").text("Item saved successfully!")
                $("#ext-msg").attr('style', 'text-align: center;color:#28c76f !important');
            } else if (_.get(response, "data", "") === "Item not found!") {
                $("#ext-save-item-button").prop('disabled', false);
                $("#ext-save-item-button").removeClass("loading")
                $("#ext-msg").text("Template item ID not found!")
                $("#ext-msg").attr('style', 'text-align: center;color:#c52c29 !important');
            }
        });
    }

    self.handleReportError = (e) => {
        console.log('handleReportError');
        chrome.tabs.query({active: true}, tabs => {
            let currentUrl = _.get(_.head(tabs), "url", "")
            currentUrl = currentUrl.replaceAll("/", '\\/').replaceAll(".", '\\.').replaceAll("-", '\\-').replaceAll("_", '\\_').replaceAll("=", '\\=').replaceAll("?", '\\?').replaceAll(":", '\\:')
            var settings = {
                "url": encodeURI(`https://api.telegram.org/bot5612515408:AAGjjQLGNA3Uh6CAwtCe4WrzzCEeYY2nabs/sendMessage?chat_id=@pyautobot&text=Report error Get Item Extension: ${currentUrl}&parse_mode=MarkdownV2`),
                "data": {

                },
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                }
            };
            console.log(settings);
            $("#report-error-website").prop('disabled', true);
            $.ajax(settings).done(function (response) {
                if (!_.get(response, "ok")) {
                    $("#report-error-website").prop('disabled', false);
                } else {
                    $("#report-msg").text("Report successfully")
                    $("#report-msg").attr('style', 'text-align: center;color:#28c76f !important');

                }
            });
        });
        // const currentUrl = window.location.href.replaceAll("/", '\\/').replaceAll(".", '\\.').replaceAll("-", '\\-').replaceAll("=", '\\=')
        // var settings = {
        //     "url": encodeURI(`https://api.telegram.org/bot5612515408:AAGjjQLGNA3Uh6CAwtCe4WrzzCEeYY2nabs/sendMessage?chat_id=@pyautobot&text=Report error Get Item Extension: ${currentUrl}&parse_mode=MarkdownV2`),
        //     "method": "GET",
        //     "timeout": 0,
        //     "headers": {
        //         "Content-Type": "application/json"
        //     }
        // };
        // $.ajax(settings).done(function (response) {
        //     console.log('response: ', response);

        // });
    }

    self.showOrHideToolMenuTalbe = () => {
        if ($("#ext-tool-menu-table").is(":visible")) {
            $("#ext-tool-menu-table").hide()
            $(".helper-step-alert.active").attr('style', null);
        } else {
            $("#ext-tool-menu-table").show()
            $(".helper-step-alert.active").attr('style', 'display:none !important');
        }
    }

    self.handleLogout = async () => {
        self.removeToolMenu();
        chrome.storage.local.set({ [TOKEN_KEY]: null })
        extensionInit()
    }

    self.handleChangeHub = () => {
        chrome.storage.local.set({ [HUB_DEFAULT]: $("#ext-hub-picker").val() })
    }
    self.handleChangeTemplateItem = () => {
        chrome.storage.local.set({ [TEMPLATE_ITEM]: $("#ext-template-item-id").val() })
    }
    self.isImageChecked = (element) => {
        return element.hasClass("checked")
    }
    self.handleChangeImage = (e) => {
        const image = $(e.target)
        if (self.isImageChecked(image)) {
            image.removeClass("checked")
        } else {
            image.addClass("checked")
        }
    }

    self.removeLoginBanner = () => $("#ext-login-banner").remove()
    self.removeFormPopup = () => $("#ext-login-popup").remove()
    self.removeToolMenu = () => $("#ext-tool-menu").remove()

    self.renderLogin = () => {
        if (!self.getItemName()) {
            return
        }
        setTimeout(() => {
            $.get(chrome.runtime.getURL("template/loginBanner.html"), html => {
                self.removeLoginBanner();
                self.removeFormPopup();
                self.removeToolMenu();
                html = html.replaceAll("{{background_logo}}", chrome.runtime.getURL("images/logo.png"));
                html = html.replaceAll("{{website_link}}", self.baseUrl);
                $("body").prepend(html);
            });
        }, 500)
    }

    self.renderLoginPopup = () => {
        $.get(chrome.runtime.getURL("template/loginPopup.html"), html => {
            self.removeFormPopup()
            self.removeToolMenu()
            html = html.replaceAll("{{background_logo}}", chrome.runtime.getURL("images/logo.png"));
            html = html.replaceAll("{{background_close}}", chrome.runtime.getURL("themify/x-solid.svg"));
            html = html.replaceAll("{{background_username}}", chrome.runtime.getURL("themify/user-solid.svg"));
            html = html.replaceAll("{{background_password}}", chrome.runtime.getURL("themify/lock-solid.svg"));
            $("body").append(html);
        });
    }

    self.render = () => {
        if (!self.getItemName()) {
            return
        }
        $.get(chrome.runtime.getURL("template/toolMenu.html"), html => {
            chrome.storage.local.get([HUB_DEFAULT, TEMPLATE_ITEM]).then(data => {
                const old_hub_piced = _.get(data, HUB_DEFAULT, "")
                const template_item_id = _.get(data, TEMPLATE_ITEM, "")
                self.removeLoginBanner()
                self.removeFormPopup()
                html = html.replaceAll("{{background_logo}}", chrome.runtime.getURL("images/logo.png"));
                html = html.replaceAll("{{background_close}}", chrome.runtime.getURL("themify/x-solid.svg"));
                html = html.replaceAll("{{background_logout}}", chrome.runtime.getURL("themify/right-from-bracket-solid.svg"));
                html = html.replaceAll("{{background_download}}", chrome.runtime.getURL("themify/download-solid.svg"));
                html = html.replaceAll("{{background_setting}}", chrome.runtime.getURL("themify/gear-solid.svg"));
                html = html.replaceAll("{{background_item}}", chrome.runtime.getURL("themify/box-solid.svg"));
                html = html.replaceAll("{{background_save}}", chrome.runtime.getURL("themify/floppy-disk-solid.svg"));
                html = html.replaceAll("{{item_name}}", self.getItemName());
                const images = _.map(self.getImages(), img => {
                    return `<img class="ext-image-picker" src="${img}" style="width: 25%; cursor: pointer; padding: 3px; border-radius: 10px;" />`
                })
                const dockers = _.map(self.hubs, hub => {
                    const label = _.get(hub, "label", _.get(hub, "domain", "")) + " (" + _.get(hub, "domain", "") + "." + _.get(hub, "server", "") + ")"
                    const value = _.get(hub, "domain", "") + "." + _.get(hub, "server", "")
                    if (old_hub_piced === value) {
                        return `<option value="${value}" selected="select">${label}</option>`
                    }
                    return `<option value="${value}">${label}</option>`

                })
                html = html.replaceAll("{{template_item_id}}", template_item_id);
                html = html.replaceAll("{{item_images}}", images.join(""));
                html = html.replaceAll("{{docker_pickers}}", dockers.join(""));

                // var html = $.parseHTML(data);
                $("body").prepend(html);
                $('.js-slect2').select2();
                $(".select2").attr('style', 'width: auto; height: 30px;');
                $(".select2-selection").attr('style', 'height: 30px;');

            })
        });
    }
};

const extTool = new extToolObj();