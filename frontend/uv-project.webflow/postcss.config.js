module.exports = {
    plugins: [
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.js', './public/**/*.html'], // 指定你的文件路径
            css: ['./css/webflow.css','./css/normalize.css','./css/uv-project.webflow.css'], // 原始 Webflow 样式路径
        }),
    ],
};
