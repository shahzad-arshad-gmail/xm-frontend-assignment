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
export const getAllSymbols = async () => {
    let url = urlConstants.GET_SYMBOLS
    const resp = await api.get(url)
    return resp.data
}

// Get All symbols
export const saveCompanyObj = async (data) => {
    let url = urlConstants.SAVE_COMPANY
    const resp = await api.post(url, data)
    return resp.data
}


