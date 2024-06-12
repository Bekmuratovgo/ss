module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.ios.js', 'd.ts', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@src': './src',
                    '@components': './src/shared/components',
                    '@assets': './assets',
                    '@screens': './src/screens',
                    '@styles': './src/shared/style',
                    '@utils': './src/shared/utils',
                    '@store': './src/store',
                },
            },
        ],
        'react-native-reanimated/plugin', [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env',
            },
        ],
    ],
};