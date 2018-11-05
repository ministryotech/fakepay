module.exports = [
    {
        url: '/',
        type: 'get',
        action: (request, response) => {
            response.send('FakePay is running')
        }
    }
]; 