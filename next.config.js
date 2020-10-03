module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/prism',
        permanent: true
      }
    ];
  }
};
