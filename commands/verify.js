const { SlashCommandBuilder } = require('@discordjs/builders');
const { branch_list, years } = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies if you are a student of IGDTUW!')
		.addStringOption(option =>
			option.setName('rollnumber')
				.setDescription('Your 11 digit IGDTUW roll no')
				.setRequired(true)),
	async execute(interaction) {
		const rollnumber = interaction.options.getString('rollnumber');
		//match rollnumber with regex pattern
		while (rollnumber.match(/^[0-9]{3}[0-9]{4}20[0-9]{2}$/)) {
			const roll = rollnumber.substring(0, 3);
			const branch = rollnumber.substring(3, 7);
			const year = rollnumber.substring(7, 11);
			
			//check if branch is in branch_list
			if (!branch_list[branch]) {
				console.log(`${rollnumber} is not a valid roll number.`);
				break;
			}
			//give the user the correct role
			if(branch === '0101' || branch === '0102' || branch === '0103' || branch === '0104' || branch === '1016' || branch === '0117' || branch === '0118')
				await interaction.member.roles.add('921492490157162587');
			
			if(!years[year]) 
				break;
			await interaction.member.roles.add(years[year]);
			await interaction.member.roles.add(branch_list[branch]);
			await interaction.reply({content: `Successfully verified! Welcome to IGDTUW! \n  Your roll number: ${roll} \n Your Branch: <@&${branch_list[branch]}> \n Your Year of joining: ${year}`, ephemeral: true});
			await interaction.followUp({content: `${interaction.user.tag} has been verified.`});

			return;
		}
		await interaction.reply({content: 'Invalid roll number. Are you sure you are a student of IGDTUW? If yes, then contact <@&921485871750987848>s', ephemeral: true});
		await interaction.followUp({content: `${interaction.user.tag} could not be verified.`});
	},
};