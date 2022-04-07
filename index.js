const p = require('phin');

const target = process.argv[process.argv.length - 1];
const domain = process.env.domain;

const key = process.env.API_KEY;
const baseDomain = process.env.BASE_DOMAIN || "https://kutt.it";

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
      url: `${baseDomain}/api/v2/links`,
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
    const message = body.link || getErrorMessage(body.error)
    console.log(message)
  } catch (error) {
    console.log(error.message);
  }
})();
