import api from './api'
import urlConstants from "../constants/urlConstants";


const URL_PARAMS = {
    symbol: '{symbol}',
    region: '{region}',
}
// API calls starts
export const getAllHistoricalQuotes = async (symbol = 'AMRN', region = 'US') => {
    let url = urlConstants.GET_HISTORICAL_QUOTES
    url = url.replace(URL_PARAMS.symbol, symbol)
    url = url.replace(URL_PARAMS.region, region)
    const resp = await api.get(url)
    return resp.data
}

// Get All symbols
export const getAllSybols = async () => {
    let url = urlConstants.GET_SYMBOLS
    const resp = await api.get(url)
    return resp.data
}

