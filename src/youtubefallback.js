(() => {
    /** When youtube is unavaiable, fallback to alternative video website */
    const $$ = (className) => document.querySelectorAll(className);
    function use_youtube() {
        $$(".youtubefallback_message").forEach(element => { element.style.display = 'none'; });
        $$(".youtubefallback_youtube").forEach(element => { element.style.display = 'unset'; });
    }
    function use_fallback() {
        $$(".youtubefallback_message").forEach(element => { element.style.display = 'none'; });
        $$(".youtubefallback_fallback").forEach(element => { element.style.display = 'unset'; });
    }
    function check_youtube() {
        const runcheck = (domain) => {
            /** https://github.com/SukkaW/DisqusJS/blob/master/src/disqus.js */
            return new Promise((resolve, reject) => {
                const img = new Image;
                // handle timeout
                const timeout = setTimeout(() => {
                    img.onerror = img.onload = null;
                    reject();
                }, 3000);

                img.onerror = () => {
                    clearTimeout(timeout);
                    reject();
                }

                img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                }

                img.src = `https://${domain}/favicon.ico?${+(new Date)}=${+(new Date)}`;
            })
        }

        return Promise.all([
            runcheck('www.youtube.com'),
        ]).then(use_youtube, use_fallback);
    }
    check_youtube();
})();