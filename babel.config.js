module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
          web: { unstable_transformImportMeta: true },
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@/config': './src/config',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/services': './src/services',
            '@/store': './src/store',
            '@/theme': './src/theme',
            '@/hooks': './src/hooks',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
