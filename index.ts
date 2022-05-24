import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config()


/**
 * @param {string} data - Column rows to be shown 
 * @param {string} table - Table name
 * @returns {array} Returns an array 
 */
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
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `command=%7B%22CmdText%22%3A%22SELECT%20%5Cn%20%20%20${encodeURI(data)}%5CnFROM%5Cn%20%20%20${encodeURI(table)}%22%2C%22CmdType%22%3A1%7D`,
        "method": "POST"
    })
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
        const data = await getData("usr1, usr2", "Stfami");
        // const artigos = await getData("faminome, ref, design", "st"); // Obter dados sobre os artigos & servicos
        console.log(tasks)
    } catch (error: any) {
        console.error(error.message);
    }
};
start();
