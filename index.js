const p = require('phin');

const target = process.argv[process.argv.length - 1];
const key = process.env.API_KEY;

if (!key) {
  return console.log('Please set an API key first.');
}

function getErrorMessage(message) {
  if (message === 'reCAPTCHA is not valid. Try again.') {
    return 'API key is invalid.'
  }
  return message;
};

(async function() {
  try {
    const { body = {} } = await p({
      url: 'https://kutt.it/api/url/submit',
      method: 'POST',
      data: { target },
      core: {
        headers: { 
          'X-API-KEY': key,
          'Content-Type': 'application/json'
        },
      },
      parse: 'json'
    });
    const message = body.shortUrl || getErrorMessage(body.error)
    console.log(message)
  } catch (error) {
    console.log(error.message);
  }
})();
