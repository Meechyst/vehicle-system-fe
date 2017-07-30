let mix = require('laravel-mix');

mix.setPublicPath('./public');

mix.styles(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/angular-toastr/dist/angular-toastr.css','src/assets/css/app.css'], 'public/css/app.css') .options({
    processCssUrls: false

})

mix.scripts([
    // Dependencies
    './node_modules/underscore/underscore.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-aria/angular-aria.js',
    './node_modules/angular-messages/angular-messages.js',
    './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
    './node_modules/restangular/dist/restangular.js',
    './node_modules/ngstorage/ngStorage.js',
    './node_modules/angular-toastr/dist/angular-toastr.tpls.js'
], 'public/js/vendor.js').options({
    processCssUrls: false
});



mix.scripts([
    // Application
    'src/config/app.js',
    'src/config/app.config.js',
    'src/config/app.module.js',
    'src/js/**/**/*.js'
], 'public/js/app.js').options({
    processCssUrls: false
});


mix.copy(['src/js/**/*.html','src/js/**/**/*.html'], 'public/templates/').copy('src/*.html', 'public/').options({
    processCssUrls: false
});

mix.browserSync({
    proxy: ''
});