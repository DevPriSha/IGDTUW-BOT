const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies if you are a student of IGDTUW!')
		.addStringOption(option =>
			option.setName('rollnumber')
				.setDescription('Your 11 digit IGDTUW roll no')
				.setRequired(true)),
	async execute(interaction) {
		//const rollnumber = interaction.getOption('rollnumber');
		await interaction.reply({content: 'Ask Pri to tell me how does this whole verifying thing works, then I\'ll verify you ', ephemeral: true});
	},
};