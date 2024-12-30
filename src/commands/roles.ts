import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Updates everyones roles based on their picks!'),
	async execute(interaction: ChatInputCommandInteraction) {
		interaction.guild?.roles.fetch()
			.then(async (roles: any) => {
				let channel_id = "1321002096916566059"
				let targets: any = [
					{
						message_id: "1321139404152111174",
						choices: ["He/Him", "She/Her", "They/Them", "Any/All"]
					},
					{
						message_id: "1321139407763538044",
						choices: ["Europe", "Australia", "North America", "South America", "Asia"]
					},
					{
						message_id: "1321139412268093523",
						choices: ["Gaming<3", "Femboys<3", "Anime<3", "Pets<3", "Music<3", "-Streamer-", "-Artist-", "-Influencer-"]
					},
					{
						message_id: "1321139416466722909",
						choices: ["Ping Stream", "Ping Art", "Ping Everyone", "Rated"]
					},
					{
						message_id: "1321139436456513616",
						choices: ["Confirmed"]
					}
				]

				for (let i=0; i<targets.length; i++) {
					console.log("fetching channel ...")
					await interaction.client.channels.fetch(channel_id)

					.then(async (channel: any) => {
						if(!channel) return interaction.reply("failed interaction")
						console.log("channel: "+ channel.name)
						console.log("fetching messages ...")
						console.log(targets[i].message_id)
						await channel.messages.fetch(targets[i].message_id)
						.then(async (message: any) => {
							if(!message || message === "") return interaction.reply("failed interaction")
							console.log(message.content)
							console.log("Getting cached reactions ...")
							let index=0;
							let messageToSend = "checking reactions for message '..."+ targets[i].message_id.slice(-6)  + "' in channel '" + channel.name +"'.\n" 
							message.reactions.cache.forEach(async(reaction: any) => {
								const emojiCount = reaction.count
								const reactionUsers = await reaction.users.fetch();
								console.log(targets[i].choices[index])
								reactionUsers.forEach(async(user: any) => {
									const role = await message.guild.roles.cache.find((r: any) => r.name === targets[i].choices[index]);  
									const roleUser = await reaction.message.guild.members.fetch(user.id)

									roleUser.roles.add(role)
								})
								messageToSend += "reaction: " + " ("+ (emojiCount - 1)+" times)"+ " = " + targets[i].choices[index] + "\n" 
								index++
							})
							
						})
					})
					
				}

				interaction.reply("oki")

				//await interaction.reply(`There are ${roles.size} roles.`)
			})
			.catch(console.error);
	},
};