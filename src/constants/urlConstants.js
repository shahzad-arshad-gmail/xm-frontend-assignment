
const MX_BASE_URL = 'https://yh-finance.p.rapidapi.com'
const MX_PHP_BASE_URL = 'http://127.0.0.1:8000'


const urlConstants = {
  GET_HISTORICAL_QUOTES: `${MX_BASE_URL}/stock/v3/get-historical-data?symbol={symbol}&region={region}`, //NOT USED.
  GET_SYMBOLS: `${MX_PHP_BASE_URL}/api/symbols`, //NOT USED.
  SAVE_COMPANY: `${MX_PHP_BASE_URL}/api/company`, //NOT USED.

}
export default urlConstants
