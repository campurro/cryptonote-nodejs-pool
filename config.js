{
    "poolHost": "infinium8.minercountry.com",

    "coin": "infinium8",
    "symbol": "INF8",
    "coinUnits": 1000000000000,
    "coinDecimalPlaces": 4,
    "coinDifficultyTarget": 90,

    "childCoin": "monetaverde",

    "daemonType": "default",
    "cnAlgorithm": "cryptonight",
    "cnVariant": 0,
    "cnBlobType": 0,

    "logging": {
        "files": {
            "level": "info",
            "directory": "logs",
            "flushInterval": 5
        },
        "console": {
            "level": "info",
            "colors": true
        }
    },

    "poolServer": {
        "enabled": true,
        "mergedMining": true,
        "clusterForks": 1,
        "poolAddress": "****  YOUR INF8 WALLET ADDRESS *******",
        "poolChildAddress": "**** YOUR MCN WALLET ADDRESS ********",
        "intAddressPrefix": "",
        "blockRefreshInterval": 1000,
        "minerTimeout": 900,
        "sslCert": "./cert.pem",
        "sslKey": "./privkey.pem",
        "sslCA": "./chain.pem",
        "ports": [
	    {
                "port": 3333,
                "difficulty": 5000,
                "desc": "Low end hardware"
            },
            {
                "port": 4444,
                "difficulty": 15000,
                "desc": "Mid range hardware"
            },
            {
                "port": 5555,
                "difficulty": 25000,
                "desc": "High end hardware"
            },
            {
                "port": 7777,
                "difficulty": 500000,
                "desc": "Cloud-mining / NiceHash"
            },
            {
                "port": 8888,
                "difficulty": 25000,
                "desc": "Hidden port",
                "hidden": true
            }
        ],
        "varDiff": {
            "minDiff": 500,
            "maxDiff": 100000000,
            "targetTime": 45,
            "retargetTime": 40,
            "variancePercent": 30,
            "maxJump": 60
        },
        "paymentId": {
            "addressSeparator": "+"
        },
        "fixedDiff": {
            "enabled": true,
            "addressSeparator": "."
        },
        "shareTrust": {
            "enabled": true,
            "min": 10,
            "stepDown": 3,
            "threshold": 10,
            "penalty": 30
        },
        "banning": {
            "enabled": true,
            "time": 600,
            "invalidPercent": 25,
            "checkThreshold": 30
        },
        "slushMining": {
            "enabled": false,
            "weight": 300,
            "blockTime": 60,
            "lastBlockCheckRate": 1
         }
    },

    "payments": {
        "enabled": true,
        "interval": 30,
        "maxAddresses": 5,
        "mixin": 3,
        "priority": 0,
        "transferFee": 10000000000,
        "dynamicTransferFee": true,
        "minerPayFee" : true,
        "minPayment": 10000000000000,
        "maxPayment": null,
        "maxTransactionAmount": 1000000000000000,
        "denomination": 10000000000
    },

    "blockUnlocker": {
        "enabled": true,
        "interval": 30,
        "depth": 60,
        "poolFee": 0.5,
        "devDonation": 0,
        "networkFee": 0.0
    },

    "api": {
        "enabled": true,
        "hashrateWindow": 600,
        "updateInterval": 5,
        "bindIp": "0.0.0.0",
        "port": 8999,
        "blocks": 30,
        "payments": 30,
        "password": "your_password",
        "ssl": false,
        "sslPort": 8119,
        "sslCert": "./cert.pem",
        "sslKey": "./privkey.pem",
        "sslCA": "./chain.pem",
        "trustProxyIP": true
    },

    "daemon": {
        "host": "127.0.0.1",
        "port": 27855
    },

    "childDaemon": {
        "host": "192.168.1.39",
        "port": 26081
    },

    "wallet": {
        "host": "127.0.0.1",
        "port": 27856
    },

    "redis": {
        "host": "127.0.0.1",
        "port": 6379,
        "auth": null,
        "db": 0,
        "cleanupInterval": 15
    },

    "notifications": {
        "emailTemplate": "email_templates/default.txt",
        "emailSubject": {
            "emailAdded": "Your email was registered",
            "workerConnected": "Worker %WORKER_NAME% connected",
            "workerTimeout": "Worker %WORKER_NAME% stopped hashing",
            "workerBanned": "Worker %WORKER_NAME% banned",
            "blockFound": "Block %HEIGHT% found !",
            "blockUnlocked": "Block %HEIGHT% unlocked !",
            "blockOrphaned": "Block %HEIGHT% orphaned !",
            "payment": "We sent you a payment !"
        },
        "emailMessage": {
            "emailAdded": "Your email has been registered to receive pool notifications.",
            "workerConnected": "Your worker %WORKER_NAME% for address %MINER% is now connected from ip %IP%.",
            "workerTimeout": "Your worker %WORKER_NAME% for address %MINER% has stopped submitting hashes on %LAST_HASH%.",
            "workerBanned": "Your worker %WORKER_NAME% for address %MINER% has been banned.",
            "blockFound": "Block found at height %HEIGHT% by miner %MINER% on %TIME%. Waiting maturity.",
            "blockUnlocked": "Block mined at height %HEIGHT% with %REWARD% and %EFFORT% effort on %TIME%.",
            "blockOrphaned": "Block orphaned at height %HEIGHT% :(",
            "payment": "A payment of %AMOUNT% has been sent to %ADDRESS% wallet."
        },
        "telegramMessage": {
            "workerConnected": "Your worker _%WORKER_NAME%_ for address _%MINER%_ is now connected from ip _%IP%_.",
            "workerTimeout": "Your worker _%WORKER_NAME%_ for address _%MINER%_ has stopped submitting hashes on _%LAST_HASH%_.",
            "workerBanned": "Your worker _%WORKER_NAME%_ for address _%MINER%_ has been banned.",
            "blockFound": "*Block found at height* _%HEIGHT%_ *by miner* _%MINER%_*! Waiting maturity.*",
            "blockUnlocked": "*Block mined at height* _%HEIGHT%_ *with* _%REWARD%_ *and* _%EFFORT%_ *effort on* _%TIME%_*.*",
            "blockOrphaned": "*Block orphaned at height* _%HEIGHT%_ *:(*",
            "payment": "A payment of _%AMOUNT%_ has been sent."
        }
    },

    "email": {
        "enabled": false,
        "fromAddress": "your@email.com",
        "transport": "sendmail",
        "sendmail": {
            "path": "/usr/sbin/sendmail"
        },
        "smtp": {
            "host": "smtp.example.com",
            "port": 587,
            "secure": false,
            "auth": {
                "user": "username",
                "pass": "password"
            },
            "tls": {
                "rejectUnauthorized": false
            }
        },
        "mailgun": {
            "key": "your-private-key",
            "domain": "mg.yourdomain"
        }
    },

    "telegram": {
        "enabled": false,
        "botName": "",
        "token": "",
        "channel": "",
        "channelStats": {
            "enabled": false,
            "interval": 30
        },
        "botCommands": {
            "stats": "/stats",
            "report": "/report",
            "notify": "/notify",
            "blocks": "/blocks"
        }
    },
    
    "monitoring": {
        "daemon": {
            "checkInterval": 60,
            "rpcMethod": "getblockcount"
        },
        "wallet": {
            "checkInterval": 60,
            "rpcMethod": "getbalance"
        }
    },

    "prices": {
        "source": "tradeogre",
        "currency": "USD"
    },
    
    "charts": {
        "pool": {
            "hashrate": {
                "enabled": true,
                "updateInterval": 60,
                "stepInterval": 1800,
                "maximumPeriod": 86400
            },
            "miners": {
                "enabled": true,
                "updateInterval": 60,
                "stepInterval": 1800,
                "maximumPeriod": 86400
            },
            "workers": {
                "enabled": true,
                "updateInterval": 60,
                "stepInterval": 1800,
                "maximumPeriod": 86400
            },
            "difficulty": {
                "enabled": true,
                "updateInterval": 1800,
                "stepInterval": 10800,
                "maximumPeriod": 604800
            },
            "price": {
                "enabled": true,
                "updateInterval": 1800,
                "stepInterval": 10800,
                "maximumPeriod": 604800
            },
            "profit": {
                "enabled": true,
                "updateInterval": 1800,
                "stepInterval": 10800,
                "maximumPeriod": 604800
            }
        },
        "user": {
            "hashrate": {
                "enabled": true,
                "updateInterval": 180,
                "stepInterval": 1800,
                "maximumPeriod": 86400
            },
            "payments": {
                "enabled": true
            }
        },
        "blocks": {
            "enabled": true,
            "days": 30
        }
    }
}
