const js = hexo.extend.helper.get('js').bind(hexo);
const { name, version } = require('./package.json');
const { htmlTag } = require('hexo-util');
const Injector = require("hexo-tag-injector");
const injector = new Injector(hexo);
const cdn_url = function (path) {
    return `https://cdn.jsdelivr.net/npm/${name}@${version}/${path}`;
}

hexo.extend.tag.register('bilitube', function (args) {
    /** {% bilitube youtube_id bvid [loading_icon] %} */
    return injector.mark(htmlTag(
        'div',
        { class: "bilitube video-container", "data-youtube": args[0], "data-bvid": args[1] },
        args[2]? `<i class="${args[2]}"></i> Loading video...`: 'Loading video...',
        false 
    ));
});


injector.register('body_end', js({
    src: cdn_url('src/bilitube.min.js'),
    'defer': true,
    class: 'pjax',
}));
