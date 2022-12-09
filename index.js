const fs = require('fs');
const qrcode = require('qrcode-terminal')
const { Client, MessageMedia } = require('whatsapp-web.js');

const imgURLMap = {
	senthil: [
		'https://techkanna.netlify.app/img/me.jpg'
	],
	venkat: [
		'https://techvenkatvis.github.io/myportfolio/venkat222.jpg',
		'https://techvenkatvis.github.io/myportfolio/venkat1.jpg',
		'https://techvenkatvis.github.io/myportfolio/venkat3.jpg'
	],
	mahe: [
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/mahe1.jpeg',
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/mahe2.jpeg',
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/mahe3.jpeg',
	],
	senthamil: [
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/mocha1.jpeg',
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/mocha2.jpeg',
	],
	dd: [
		'https://raw.githubusercontent.com/techkanna/whatsapp_bot/main/assets/dd.jpeg',
	],
}

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
	client.getChats().then(chats => {
		const chat = chats.find(ch => ch.name === 'Web development')
		client.sendMessage(chat.id._serialized, "chat bot is now on \n type -h for help")
	})
});

const CMD = {
	h: '-h',
	welcome: '!welcome',
	sk: '!sk',
	vis: '!vis',
	mahe: '!mahe',
	mocha: '!mocha',
	dd: '!dd',
	ping: '!ping',
	rn: '!rn',
	all_pics: '!all_pics',
}

// Mention everyone
client.on('message', async (msg) => {

	if (msg.body === CMD.ping) {
		// Send a new message as a reply to the current one
		msg.reply('pong replay');
	} 
});

client.on('message_create', async (msg) => {
	const chat = await msg.getChat();
	// Fired on all message creations, including your own
	if (msg.fromMe) {
		if (msg.body === '!me') {
			const url = imgURLMap.senthil[0]
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}		
	}
	
	if(chat.name !== 'Web development') return
	
	if (msg.body === CMD.sk) {
		const url = imgURLMap.senthil[0]
		const media = await MessageMedia.fromUrl(url);
		chat.sendMessage(media);
	}

	if (msg.body === msg.body.includes(CMD.rn)) {
		msg.react('👍');
	}

	if (msg.body == CMD.welcome) {
		let text = "";
		let mentions = [];

		for (let participant of chat.participants) {
			const contact = await client.getContactById(participant.id._serialized);

			mentions.push(contact);
			text += `Welcome to team @${participant.id.user} :) 🎉🥳 \n`;
		}

		await chat.sendMessage(text, { mentions });
	}
	
	if (msg.body === CMD.vis) {
		const urls = imgURLMap.venkat
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];			
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}
	}

	if (msg.body === CMD.mahe) {
		const urls = imgURLMap.mahe
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];			
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}
	}

	if (msg.body === CMD.mocha) {
		const urls = imgURLMap.mocha
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];			
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}
	}

	if (msg.body === CMD.dd) {
		const urls = imgURLMap.dd
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];			
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}
	}

	if (msg.body === CMD.h) {
		let msg = "Commands you can use"
		let cmds = ''

		for (let name in CMD) {
			cmds += `\n ${CMD[name]}`
		}

		await chat.sendMessage(msg + cmds);		
	}

	if (msg.body === CMD.all_pics) {
		const urls = [
			...imgURLMap.senthil, 
			...imgURLMap.venkat, 
			...imgURLMap.mahe, 
			...imgURLMap.senthamil, 
		]
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];
			const media = await MessageMedia.fromUrl(url);
			chat.sendMessage(media);
		}
	}


});


client.on('change_state', state => {
	console.log('CHANGE STATE', state);
});

client.on('disconnected', (reason) => {
	console.log('Client was logged out', reason);
});


client.initialize();

