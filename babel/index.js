module.exports = (useModules = true) => {
  var es = ['es2015'];
  !useModules && es.push({ modules: false });

  return {
    presets: [
      'react',
      es,
      'stage-0',
    ],
    plugins: [
      'transform-runtime',
      'transform-class-properties',
    ],
    env: {
      development: {
        presets: ['react-hmre'],
        plugins: [],
      },
    },
  };
};
