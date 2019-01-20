/**
 * Cryptonote Node.JS Pool
 * https://github.com/dvandal/cryptonote-nodejs-pool
 *
 * Notifications system
 * Supports: email, telegram
 *
 * Author: Daniel Vandal
 **/

// Load required modules
var fs = require('fs');

var emailSystem = require('./email.js');
var utils = require('./utils.js');

// Initialize log system
var logSystem = 'notifications';
require('./exceptionWriter.js')(logSystem);

// Load notification settings
var notificationSettings = {
    emailTemplate: "email/template.txt",
    emailSubject: {
        emailAdded: "Your email was registered",
        workerConnected: "Worker %WORKER_NAME% connected",
        workerTimeout: "Worker %WORKER_NAME% stopped hashing",
        workerBanned: "Worker %WORKER_NAME% banned",
        blockFound: "Block %HEIGHT% found !",
        blockUnlocked: "Block %HEIGHT% unlocked !",
        blockOrphaned: "Block %HEIGHT% orphaned !",
        payment: "We sent you a payment !"
    },
    emailMessage: {
        emailAdded: "Your email has been registered to receive pool notifications.",
        workerConnected: "Your worker %WORKER_NAME% is now connected.",
        workerTimeout: "Your worker %WORKER_NAME% has stopped submitting hashes on %LAST_HASH%.",
        workerBanned: "Your worker %WORKER_NAME% has been banned.",
        blockFound: "Block found at height %HEIGHT% by miner %MINER% on %TIME%. Waiting maturity.",
        blockUnlocked: "Block mined at %HEIGHT% with %REWARD% and %EFFORT% effort on %TIME%.",
        blockOrphaned: "Block orphaned at height %HEIGHT% :(",
        payment: "A payment of %AMOUNT% has been sent to %ADDRESS% wallet."
    },
};

if (config.notifications) {
    Object.assign(notificationSettings, config.notifications);
}

// Test notification message
notificationSettings.emailSubject['test'] = "Test notification";
notificationSettings.emailMessage['test'] = "This is a test notification from the pool.";

/**
 * Send global notification
 **/
exports.sendToAll = function(id, variables) {
    // Send to all pool email addresses
    sendToAllEmails(id, variables);
}

/**
 * Send miner notification
 **/
exports.sendToMiner = function(miner, id, variables) {
    // Send email
    sendToMinerEmail(miner, id, variables);
}

/**
 * Send email notification to all pool email addresses
 **/
function sendToAllEmails(id, variables) {
    // Set custom variables
    variables = setCustomVariables(variables);
    
    // Send email
    if (config.email && config.email.enabled) {
        var subject = getEmailSubject(id, variables);
        var content = getEmailContent(id, variables);
        if (!content || content === '') {
            log('info', logSystem, 'Notification disabled for %s: empty email content.', [id]);
            return;
        }

        redisClient.hgetall(config.coin + ':notifications', function(error, data) {
            if (error || !data) return ;
            for (var address in data) {
                var email = data[address];
                emailSystem.sendEmail(email, subject, content);
            }
        });
    }
}
exports.sendToAllEmails = sendToAllEmails;

/**
 * Send email notification to miner email address
 **/
function sendToMinerEmail(miner, id, variables) {
    // Set custom variables
    variables = setCustomVariables(variables);
    
    // Send email
    if (config.email && config.email.enabled) {
        var subject = getEmailSubject(id, variables);
        var content = getEmailContent(id, variables);
        if (!content || content === '') {
            log('info', logSystem, 'Notification disabled for %s: empty email content.', [id]);
            return;
        }

        redisClient.hget(config.coin + ':notifications', miner, function(error, email) {
            if (error || !email) return ;
            emailSystem.sendEmail(email, subject, content);
        });
    }
}
exports.sendToMinerEmail = sendToMinerEmail;

/**
 * Send email notification to a specific email address
 **/
function sendToEmail(email, id, variables) {
    // Set custom variables
    variables = setCustomVariables(variables);
    
    // Send notification
    if (config.email && config.email.enabled) {
        var subject = getEmailSubject(id, variables);
        var content = getEmailContent(id, variables);
        if (!content || content === '') {
            log('info', logSystem, 'Notification disabled for %s: empty email content.', [id]);
            return;
        }

        emailSystem.sendEmail(email, subject, content);
    }
}
exports.sendToEmail = sendToEmail;

/**
 * Email functions
 **/

// Get email subject
function getEmailSubject(id, variables) {
    var subject = replaceVariables(notificationSettings.emailSubject[id], variables) || '';
    return subject;
}

// Get email content
function getEmailContent(id, variables) {
    var message = notificationSettings.emailMessage[id] || '';
    if (!message || message === '') return '';
    
    var content = message;
    if (notificationSettings.emailTemplate) {
        if (!fs.existsSync(notificationSettings.emailTemplate)) {
            log('warn', logSystem, 'Email template file not found: %s', [notificationSettings.emailTemplate]);
        }
        content = fs.readFileSync(notificationSettings.emailTemplate, 'utf8');
        content = content.replace(/%MESSAGE%/g, message);
    }
    content = replaceVariables(content, variables);
    return content;
}

/**
 * Handle variables in texts
 **/
 
// Set custom variables
function setCustomVariables(variables) {
    if (!variables) variables = {};
    variables['TIME'] = utils.dateFormat(Date.now(), 'yyyy-mm-dd HH:MM:ss Z');
    variables['POOL_HOST'] = config.poolHost || '';
    return variables;
}

// Replace variables in a string
function replaceVariables(string, variables) {
    if (!string) return '';
    if (variables) {
        for (var varName in variables) {
            string = string.replace(new RegExp('%'+varName+'%', 'g'), variables[varName]);
        }
        string = string.replace(/  /g, ' ');
    }
    return string;
}
