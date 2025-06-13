module.exports = {
  devServer: {
    proxy: {
      // port: 8000, // B端端口
      '/api': 'http://localhost:3001'
    }
  }
}