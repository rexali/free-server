const nodemailer = require("nodemailer");

const { htmlEscape } = require('../utils/escapeHelper')

/**
 * send email to users
 * @param {string} username username of the mail server
 * @param {string} password password of the mail server
 * @param {string} from where the mail is coming from
 * @param {string} to to where the mail is coming from
 * @param {string} subject the subject of the email 
 * @param {string} senderName property name of sender of email
 * @param {string} format format of the message i.e html or text
 * @param {string} messageMtml the content of the message in html format
 * @param {string} messageText the content of the message in text format
 * 
 * @returns result, a json string
 */
function sendSingleMail(email, subject, format = 'html', messageHtml, messageText, senderName) {

    const emaile = htmlEscape(email);
    const subjecte = htmlEscape(subject);
    const htmle = htmlEscape(messageHtml);
    const texte = htmlEscape(messageText);
    const namee = htmlEscape(senderName);

    var transporter = nodemailer.createTransport({
        host: 'mail.mujaware.com',//gmail
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    var mailOptions = {
        from: `${namee ? namee : "Kulwek"} <${process.env.USER}>`,
        to: emaile,
        subject: subjecte,
        [format]: htmle ? htmle : texte // or html:<html>It is easy</html>
    };

    let promise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });
    })

    return promise;
}


/**
 * Send email to users
 * 
 * @param {string } username username of the mail server
 * @param {string} password password of the mail server
 * @param {string} from where the mail is coming from
 * @param {string} to to where the mail is coming from
 * @param {string} subject the subject of the email 
 * @param {string} senderName name of sender of email
 * @param {string} format format of the message i.e html or text
 * @param {string} messageHtml the content of the message in html format
 * @param {string} messageText the content of the message in text format
 * 
 * @returns result, a json string
 */

function sendMultipleMail(
    email,
    subject,
    format = 'html',
    messageHtml,
    messageText,
    senderName,
    ccList,
    bccList
) {

    const emaile = htmlEscape(email);
    const subjecte = htmlEscape(subject);
    const htmle = htmlEscape(messageHtml);
    const texte = htmlEscape(messageText);
    const namee = htmlEscape(senderName);

    var transporter = nodemailer.createTransport({
        host: 'mail.mujaware.com',//gmail
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    var mailOptions = {
        from: `${namee ? namee : "Kulwek"} <${process.env.USER}>`,
        cc: [ccList ? ccList : ''],
        bcc: [bccList ? bccList : ''],
        to: emaile,
        subject: subjecte,
        [format]: htmle ? htmle : texte // or html:<html>It is easy</html>
    };

    let promise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });
    })

    return promise;
}

module.exports = { sendSingleMail, sendMultipleMail };

ADDRESS_OBJECT_FORMAT =
    `
{
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
},

to: 'foobar@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
    
cc: [
    'foobar@example.com',
    '"Ноде Майлер" <bar@example.com>,
    "Name, User" <baz@example.com>'
],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        bcvxz

bcc: [
    'foobar@example.com',
    {
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
    }
]
`;