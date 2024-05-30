import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { Octokit } from 'octokit';
import { exec } from 'child_process';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());

const repoOwner = process.env.GITHUB_USER;
const repoName = process.env.GITHUB_REPO;
const filePath = 'config.json'; // Ensure this is the correct path relative to the root of the repository
const githubToken = process.env.GITHUB_TOKEN;
const sudoPassword = process.env.SUDO_PW;
const weatherAPIKey = process.env.WEATHER_API_KEY;

const octokit = new Octokit({
	auth: githubToken,
});

const constructPayload = (config) => {
	return {
		...config,
		weather: {
			...config.weather,
			apikey: weatherAPIKey,
		},
	};
};

app.post('/api/update-config', async (req, res) => {
	const newConfig = constructPayload(req.body);

	const localFilePath = path.join(__dirname, filePath);

	try {
		// Write the new config to the local file
		fs.writeFileSync(localFilePath, JSON.stringify(newConfig, null, 2));

		// Read the local file content
		const content = fs.readFileSync(localFilePath, 'utf8');
		const encodedContent = Buffer.from(content).toString('base64');

		// Get the current file's SHA from GitHub
		const { data: fileData } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
			owner: repoOwner,
			repo: repoName,
			path: filePath,
		});

		const sha = fileData.sha;

		// Update the file on GitHub
		await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
			owner: repoOwner,
			repo: repoName,
			path: filePath,
			message: 'Update config.json',
			content: encodedContent,
			sha: sha,
		});

		// SSH into the remote server and perform the necessary commands
		// 		const sshCommand = `sshpass -p ${sudoPassword} ssh -o StrictHostKeyChecking=no andrew@mlbpi.local "cd mlb-led-scoreboard && git pull && echo ${sudoPassword} | sudo -S reboot"`;
		//
		// 		exec(sshCommand, (error, stdout, stderr) => {
		// 			if (error) {
		// 				console.error(`SSH command error: ${error.message}`);
		// 				if (error.message.includes('sshpass: command not found')) {
		// 					res
		// 						.status(500)
		// 						.send(
		// 							'sshpass is not installed on the server. Please install it using: sudo apt-get install sshpass'
		// 						);
		// 				} else {
		// 					res.status(500).send('Failed to execute remote commands');
		// 				}
		// 				return;
		// 			}
		// 			if (stderr) {
		// 				console.error(`SSH command stderr: ${stderr}`);
		// 			}
		// 			console.log(`SSH command stdout: ${stdout}`);
		// 			res.status(200).send('Config updated and remote commands executed successfully');
		// 		});
		res.json({ message: 'Config updated successfully', config: newConfig });
	} catch (error) {
		console.error('Error updating config:', error);
		res.status(500).send('Failed to update config');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
