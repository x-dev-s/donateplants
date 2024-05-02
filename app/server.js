'use server'

import fs from 'fs'
import axios from 'axios'
import googleCurrencyScraper from 'google-currency-scraper';
import { sendEmail } from '@/utils/mailer';

export async function GetCurencyExchangeRate(from, to) {
    let currency_exchange = await googleCurrencyScraper({
        from: from,
        to: to
    });
    return currency_exchange.rate;
}

export async function SendEmail({ email, emailType, userId }) {
    try{
        await sendEmail({ email, emailType, userId });
        return "Email Sent";
    }
    catch(err){
        console.error(err);
        return err;
    }
}