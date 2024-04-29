'use server'

import fs from 'fs'
import axios from 'axios'
import googleCurrencyScraper from 'google-currency-scraper';

export async function GetCurencyExchangeRate(from, to) {
    let currency_exchange = await googleCurrencyScraper({
        from: from,
        to: to
    });
    return currency_exchange.rate;
}