module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [ 
      [
        'module-resolver',
        {
          root: ['./src'], // Define o diretório raiz para os aliases
          alias: {
            '@': './src', // Mapeia o alias '@' para a pasta 'src'
          },
        },
      ],
    ],
  };
};