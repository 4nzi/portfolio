const path = require('path');

module.exports = {
    mode: "production",
    entry: [path.resolve(__dirname, "./src/index.tsx")],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    // ローダーの設定 下から実行
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)?$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg)$/,
                // 画像をBase64として取り込む
                type: "asset/inline",
            }
        ]
    },

    // 名前解決するための設定
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    devServer: {
        static: {
            directory: './dist',
        },
        port: 8080,
        open: true,
        watchFiles: ['src/**/*', 'dist/**/*'],
        compress: true,
        historyApiFallback: true,
    }
}