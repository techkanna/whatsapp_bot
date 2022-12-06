const fs = require('fs');
const qrcode = require('qrcode-terminal')
const { Client, MessageMedia } = require('whatsapp-web.js');


// Use the saved values
const client = new Client({
    puppeteer: {
		args: ['--no-sandbox'],
	}
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');
	client.getChats().then(chats=>{
		const chat = chats.find(ch=>ch.name === 'Web development')
		client.sendMessage(chat.id._serialized, "chat bot is now on")
	})
});

// Mention everyone
client.on('message', async (msg) => {

 if (msg.body === '!ping') {
        // Send a new message as a reply to the current one
        msg.reply('pong replay');

    }else if(msg.body == '!everyone') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `Hello :) @${participant.id.user} ,`;
        }

        await chat.sendMessage(text, { mentions });
    }
});

client.on('message_create', async (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        // do stuff here
	if (msg.body === '!rn') {
        	msg.react('👍');
    	}

	if(msg.body === '!me'){
		const chat = await msg.getChat();
		const url = 'https://techkanna.netlify.app/img/me.jpg'
		const media = await MessageMedia.fromUrl(url, { caption: 'Here\'s your requested media.' });
		chat.sendMessage(media);
	}
	
	if(msg.body == '!everyone') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `Hello :) @${participant.id.user} ,`;
        }

        await chat.sendMessage(text, { mentions });
    }

    }

	if(msg.body === '!vis'){
		const chat = await msg.getChat();
		
		const url =  'https://techvenkatvis.github.io/myportfolio/venkat3.jpg'

		const media = await MessageMedia.fromUrl(url);
		chat.sendMessage(media);
	}

	if(msg.body === '!vis1'){
		const chat = await msg.getChat();
		
		const url = 'https://techvenkatvis.github.io/myportfolio/venkat1.jpg'
		const media = await MessageMedia.fromUrl(url);
		chat.sendMessage(media);
	}

	if(msg.body === '!vis2'){
		const chat = await msg.getChat();
		
		const url =  'https://techvenkatvis.github.io/myportfolio/venkat222.jpg'

		const media = await MessageMedia.fromUrl(url);
		chat.sendMessage(media);
	}
});


client.on('change_state', state => {
    console.log('CHANGE STATE', state );
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});


client.initialize();

