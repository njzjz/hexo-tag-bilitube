const js = hexo.extend.helper.get('js').bind(hexo);
const { name, version } = require('bilitube/package.json');
const { htmlTag } = require('hexo-util');
const Injector = require("hexo-tag-injector");
const injector = new Injector(hexo);
const { npm_url } = require("jsdelivr_url");

hexo.extend.tag.register('bilitube', function (args) {
    /** {% bilitube youtube_id bvid [loading_icon] %} */
    return injector.mark(htmlTag(
        'div',
        { class: "bilitube video-container", "data-youtube": args[0], "data-bvid": args[1] },
        '',
    ));
});


injector.register('body_end', js({
    src: npm_url(name, version, 'dist/bilitube.min.js'),
    'defer': true,
    class: 'pjax',
}));
