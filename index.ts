import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config()

const getData = async (data: string, table: string) => {
    const errors: string[] = []
    const response = await fetch(`https://sis09.phcgo.net/${process.env.ID}/PHCWS/REST/UtilitariosWS/SqlStudioRunCommand?suppressWarnings=true&suppressErrors=true`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "engine-auth": "YUn5R62Po86x8bh1YnCmx96rPh06EaIG0l1ssScil87P+0Ni6r67KGQjLXIlnZc+LQilUXUb7e294XP7vOCWgYd1+hN0FiuXazbxb6KbSzCZNi6MqRd75bdCOm8ArzjyA2Ot2zpwF5Qq9rPNDlyJ5PhqeRQZW5TGhpMuN5RAnUQ=",
            "lang": "pt_PT",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "timezone": "60",
            // "cookie": "_gid=GA1.2.1216222817.1653298610; _fbp=fb.1.1653298610228.361992954; _hjSessionUser_2175372=eyJpZCI6ImEzZTIwMGQ0LTdjNWYtNTEwMC1hODcxLTNiZWZmNDgxMjUwYSIsImNyZWF0ZWQiOjE2NTMyOTg2MTAxMTUsImV4aXN0aW5nIjp0cnVlfQ==; _hjSessionUser_2429617=eyJpZCI6IjA1NjY3Y2MwLWIzMWQtNWZhOC1iMTAzLWI5ZDU5YmZiZTQ1NyIsImNyZWF0ZWQiOjE2NTMzMTM3MjY4MzQsImV4aXN0aW5nIjp0cnVlfQ==; _gac_UA-89772627-7=1.1653314398.EAIaIQobChMIhfDnh-L19wIVB7p3Ch2n_g3HEAAYASABEgKewPD_BwE; _hjSession_2429617=eyJpZCI6IjdlY2VhZWE1LWM2OWQtNGJkYy1iNzhmLTE1YzE3NjUxY2JkMiIsImNyZWF0ZWQiOjE2NTMzNzgwODMzODYsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; _hjSession_2175372=eyJpZCI6ImU0NGVjYTQ3LTQ4MGEtNDNmZC1hZmMxLTQwNTI0YzYzOTY0MCIsImNyZWF0ZWQiOjE2NTMzNzgxNDk1NjksImluU2FtcGxlIjp0cnVlfQ==; _ga_2DH44XRBHQ=GS1.1.1653378148.5.0.1653378151.0; _ga=GA1.2.971026685.1653298610",
            // "Referer": "https://sis09.phcgo.net/process.env.ID/html/settings/sql-studio",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `command=%7B%22CmdText%22%3A%22SELECT%20%5Cn%20%20%20${encodeURI(data)}%5CnFROM%5Cn%20%20%20${encodeURI(table)}%22%2C%22CmdType%22%3A1%7D`,
        "method": "POST"
    });
    const body = JSON.parse(await response.text());
    if (body.messages.length > 0) {
        body.messages.forEach((element: { messageCodeLocale: string; }) => errors.push(element.messageCodeLocale));
        throw new Error(JSON.stringify(errors));
    }
    return body.result;

};


const start = async () => {
    try {
        const tasks = await getData("summary, description, startdate, enddate, closingdate, closinghour, username", "tasks"); // Obter dados sobre as tarefas
        // const artigos = await getData("faminome, ref, design", "st"); // Obter dados sobre os artigos & servicos
        console.log(tasks)
    
    } catch (error: any) {
        console.error(error.message);
    }
};
start();
