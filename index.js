const css = hexo.extend.helper.get('css').bind(hexo);
const js = hexo.extend.helper.get('css').bind(hexo);
const { name, version } = require('./package.json');
const Injector = require("hexo-tag-injector");
const injector = new Injector(hexo);
const cdn_url = function(path){
	return `https://cdn.jsdelivr.net/npm/${name}@${version}/${path}`;
}

hexo.extend.tag.register('youtubefallback', function (args) {
    if (args[1] === 'end') {
        return '</div>';
    } else if (args[1] == 'begin') {
        return `<div class="youtubefallback_${args[0]}">` + injector.mark('');
    }
});

injector.register('head_end', css({
    href: cdn_url('src/youtubefallback.min.css'),
    class: 'pjax',
}));

injector.register('body_end', js({
    href: cdn_url('src/youtubefallback.min.js'),
    class: 'pjax',
}));
