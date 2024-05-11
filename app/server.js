'use server'
import googleCurrencyScraper from 'google-currency-scraper';
import { sendEmail, sendEmailToAdmin } from '@/utils/mailer';

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

export async function SendEmailToAdmin({ context, message }) {
    try{
        await sendEmailToAdmin({ context, message });
        return "Email Sent";
    }
    catch(err){
        console.error(err);
        return err;
    }
}