const router = require('koa-router')()
const rp = require('request-promise');
let super_result;

router.prefix('/api');

router.get('/coins', async (ctx, next) => {
  let result;

  if (!super_result) {
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        start: 1,
        limit: 100,
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY
      },
      json: true,
      gzip: true
    };

    result = await rp(requestOptions).then(response => response.data).catch(err => {
      console.log('API call error:', err.message);
      return err.message;
    });

    super_result = result;
  }
  else {
    result = super_result;
  }
  console.log(result);
  ctx.body = result;
});

module.exports = router
