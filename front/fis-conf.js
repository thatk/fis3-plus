/*
 * 用到的插件,需要全局安装
 * fis-parser-ejs
 *
 */

var CONFIG = {
    deploy: {
        receiver : 'http://www.fis-smarty.com/receiver.php',
        root : '/Users/kenny/fis3/fis3-plus/www/'
    },

    domain : {
        online : 'http://www.your-domain.com',
        cdn : 'http://www.your-cdn.com'
    }
}

fis.match('*', {
    useHash: false, // md5 都关掉
    release: '/static/$0'
});

// tpl文件搬家
fis.match('*.tpl', {
    useHash: false,
    release: '/view/template/$0'
});
fis.match('/(**/widget/*.tpl)', {
    useMap: true,
    url: '$1'
});
fis.match('/(**/widget/**/*.tpl)', {
    useMap: true,
    url: '$1'
});

// less文件编译成css
fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
})

fis.match('*.ejs', {
    parser: fis.plugin('ejs'),
    rExt: '.js'
});

// 资源映射表复制入smarty config
fis.match('map.json', {
    useHash: false,
    release: '/libs/smarty/config/$0'
});

// 开启同名依赖
fis.match('/**/widget/**', {
    useSameNameRequire: true
});

fis.match('/widget/{*,**/*}.js', {
    isMod: true,
    postprocessor: fis.plugin('mod.js-define-wrapper') // 未发布 NPM
    // fis3 是可以加载项目里面的 node_modules 下的插件的，但是这个对理解 fis3 有帮助
    // 不建议在生产环境中这么干，不然维护起来会比较麻烦，fis 依然推荐全局做安装
});

// fis3 release debug
fis.media('debug').match('*.{js,css,png,jpg}', {
    useHash: false,
    useSprite: false,
    optimizer: null
})

// fis3 release qa
fis.media('qa').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: CONFIG.deploy.receiver,
        to: CONFIG.deploy.root
    })
})




