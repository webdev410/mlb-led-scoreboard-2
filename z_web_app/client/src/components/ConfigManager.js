import React, { useState } from 'react';
import axios from 'axios';
import initialConfig from '../initialConfig';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { mlbLogoLinks } from '../constants/logos';

const options = {
	teams: [
		'Orioles',
		'Yankees',
		'Red Sox',
		'Blue Jays',
		'Rays',
		'White Sox',
		'Indians',
		'Tigers',
		'Royals',
		'Twins',
		'Astros',
		'Angels',
		'Athletics',
		'Mariners',
		'Rangers',
		'Braves',
		'Marlins',
		'Mets',
		'Phillies',
		'Nationals',
		'Cubs',
		'Reds',
		'Brewers',
		'Pirates',
		'Cardinals',
		'Diamondbacks',
		'Rockies',
		'Dodgers',
		'Padres',
		'Giants',
	],
	divisions: [
		'AL East',
		'AL West',
		'AL Central',
		'NL East',
		'NL West',
		'NL Central',
		'AL Wild Card',
		'NL Wild Card',
	],
};

const ConfigManager = () => {
	const [config, setConfig] = useState(initialConfig);
	const [selectedDivisions, setSelectedDivisions] = useState(config.preferred.divisions);
	const [selectedTeams, setSelectedTeams] = useState(config.preferred.teams);

	const handleChange = (section, key, value) => {
		setConfig({
			...config,
			[section]: {
				...config[section],
				[key]: value,
			},
		});
	};

	const handleTeamChange = (selected) => {
		setSelectedTeams(selected);
		handleChange('preferred', 'teams', selected);
	};

	const handleDivisionChange = (selected) => {
		setSelectedDivisions(selected);
		handleChange('preferred', 'divisions', selected);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:6969/api/update-config', config);
			console.log({ response });

			alert('Config updated successfully');
		} catch (error) {
			console.error('Error updating config:', error);
			alert('Failed to update config');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Preferred Settings</h2>
			<label>
				Teams:
				<Listbox
					as='div'
					value={config.preferred.teams}
					onChange={(value) => handleTeamChange(value)}
					multiple
					className='border border-black rounded'
				>
					<ListboxButton>{config.preferred.teams.join(', ') || 'Select teams'}</ListboxButton>
					<ListboxOptions className='space-y-4'>
						{options.teams.map((team) => (
							<ListboxOption
								key={team}
								value={team}
								className='hover:bg-gray-100'
							>
								{({ selected }) => (
									<div className='flex space-x-3'>
										<img
											src={mlbLogoLinks[team?.toLowerCase().replace(' ', '_')].logo}
											alt={team}
											className='h-5 w-5 flex-shrink-0 rounded-full'
										/>
										<span>{team}</span>
										{selected && <span> (Selected)</span>}
									</div>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</Listbox>
			</label>

			<label>
				Divisions:
				<Listbox
					as='div'
					value={config.preferred.divisions}
					onChange={(value) => handleDivisionChange(value)}
					multiple
				>
					<ListboxButton>
						{config.preferred.divisions.join(', ') || 'Select divisions'}
					</ListboxButton>
					<ListboxOptions>
						{options.divisions.map((division) => (
							<ListboxOption
								key={division}
								value={division}
							>
								{({ selected }) => (
									<>
										<span>{division}</span>
										{selected && <span> (Selected)</span>}
									</>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</Listbox>
			</label>

			<h2>News Ticker Settings</h2>
			<label>
				Team Offday:
				<input
					type='checkbox'
					checked={config.news_ticker.team_offday}
					onChange={(e) => handleChange('news_ticker', 'team_offday', e.target.checked)}
				/>
			</label>
			<label>
				Always Display:
				<input
					type='checkbox'
					checked={config.news_ticker.always_display}
					onChange={(e) => handleChange('news_ticker', 'always_display', e.target.checked)}
				/>
			</label>
			<label>
				Preferred Teams:
				<input
					type='checkbox'
					checked={config.news_ticker.preferred_teams}
					onChange={(e) => handleChange('news_ticker', 'preferred_teams', e.target.checked)}
				/>
			</label>
			<label>
				Display No Games Live:
				<input
					type='checkbox'
					checked={config.news_ticker.display_no_games_live}
					onChange={(e) => handleChange('news_ticker', 'display_no_games_live', e.target.checked)}
				/>
			</label>
			<label>
				Trade Rumors:
				<input
					type='checkbox'
					checked={config.news_ticker.traderumors}
					onChange={(e) => handleChange('news_ticker', 'traderumors', e.target.checked)}
				/>
			</label>
			<label>
				MLB News:
				<input
					type='checkbox'
					checked={config.news_ticker.mlb_news}
					onChange={(e) => handleChange('news_ticker', 'mlb_news', e.target.checked)}
				/>
			</label>
			<label>
				Countdowns:
				<input
					type='checkbox'
					checked={config.news_ticker.countdowns}
					onChange={(e) => handleChange('news_ticker', 'countdowns', e.target.checked)}
				/>
			</label>
			<label>
				Date:
				<input
					type='checkbox'
					checked={config.news_ticker.date}
					onChange={(e) => handleChange('news_ticker', 'date', e.target.checked)}
				/>
			</label>
			<label>
				Date Format:
				<input
					type='text'
					value={config.news_ticker.date_format}
					onChange={(e) => handleChange('news_ticker', 'date_format', e.target.value)}
				/>
			</label>

			<h2>Standings Settings</h2>
			<label>
				Team Offday:
				<input
					type='checkbox'
					checked={config.standings.team_offday}
					onChange={(e) => handleChange('standings', 'team_offday', e.target.checked)}
				/>
			</label>
			<label>
				MLB Offday:
				<input
					type='checkbox'
					checked={config.standings.mlb_offday}
					onChange={(e) => handleChange('standings', 'mlb_offday', e.target.checked)}
				/>
			</label>
			<label>
				Always Display:
				<input
					type='checkbox'
					checked={config.standings.always_display}
					onChange={(e) => handleChange('standings', 'always_display', e.target.checked)}
				/>
			</label>
			<label>
				Display No Games Live:
				<input
					type='checkbox'
					checked={config.standings.display_no_games_live}
					onChange={(e) => handleChange('standings', 'display_no_games_live', e.target.checked)}
				/>
			</label>

			<h2>Rotation Settings</h2>
			<label>
				Enabled:
				<input
					type='checkbox'
					checked={config.rotation.enabled}
					onChange={(e) => handleChange('rotation', 'enabled', e.target.checked)}
				/>
			</label>
			<label>
				Scroll Until Finished:
				<input
					type='checkbox'
					checked={config.rotation.scroll_until_finished}
					onChange={(e) => handleChange('rotation', 'scroll_until_finished', e.target.checked)}
				/>
			</label>
			<label>
				Only Preferred:
				<input
					type='checkbox'
					checked={config.rotation.only_preferred}
					onChange={(e) => handleChange('rotation', 'only_preferred', e.target.checked)}
				/>
			</label>
			<label>
				Only Live:
				<input
					type='checkbox'
					checked={config.rotation.only_live}
					onChange={(e) => handleChange('rotation', 'only_live', e.target.checked)}
				/>
			</label>

			<h3>Rotation Rates</h3>
			<label>
				Live:
				<input
					type='number'
					value={config.rotation.rates.live}
					onChange={(e) =>
						handleChange('rotation', 'rates', {
							...config.rotation.rates,
							live: parseFloat(e.target.value),
						})
					}
				/>
			</label>
			<label>
				Final:
				<input
					type='number'
					value={config.rotation.rates.final}
					onChange={(e) =>
						handleChange('rotation', 'rates', {
							...config.rotation.rates,
							final: parseFloat(e.target.value),
						})
					}
				/>
			</label>
			<label>
				Pregame:
				<input
					type='number'
					value={config.rotation.rates.pregame}
					onChange={(e) =>
						handleChange('rotation', 'rates', {
							...config.rotation.rates,
							pregame: parseFloat(e.target.value),
						})
					}
				/>
			</label>

			<h3>While Preferred Team Live</h3>
			<label>
				Enabled:
				<input
					type='checkbox'
					checked={config.rotation.while_preferred_team_live.enabled}
					onChange={(e) =>
						handleChange('rotation', 'while_preferred_team_live', {
							...config.rotation.while_preferred_team_live,
							enabled: e.target.checked,
						})
					}
				/>
			</label>
			<label>
				During Inning Breaks:
				<input
					type='checkbox'
					checked={config.rotation.while_preferred_team_live.during_inning_breaks}
					onChange={(e) =>
						handleChange('rotation', 'while_preferred_team_live', {
							...config.rotation.while_preferred_team_live,
							during_inning_breaks: e.target.checked,
						})
					}
				/>
			</label>

			<h2>Weather Settings</h2>
			<label>
				API Key:
				<input
					type='text'
					value={config.weather.apikey}
					onChange={(e) => handleChange('weather', 'apikey', e.target.value)}
				/>
			</label>
			<label>
				Location:
				<input
					type='text'
					value={config.weather.location}
					onChange={(e) => handleChange('weather', 'location', e.target.value)}
				/>
			</label>
			<label>
				Metric Units:
				<input
					type='checkbox'
					checked={config.weather.metric_units}
					onChange={(e) => handleChange('weather', 'metric_units', e.target.checked)}
				/>
			</label>

			<h2>General Settings</h2>
			<label>
				Time Format:
				<input
					type='text'
					value={config.time_format}
					onChange={(e) => handleChange('time_format', null, e.target.value)}
				/>
			</label>
			<label>
				End of Day:
				<input
					type='time'
					value={config.end_of_day}
					onChange={(e) => handleChange('end_of_day', null, e.target.value)}
				/>
			</label>
			<label>
				Full Team Names:
				<input
					type='checkbox'
					checked={config.full_team_names}
					onChange={(e) => handleChange('full_team_names', null, e.target.checked)}
				/>
			</label>
			<label>
				Short Team Names for Runs/Hits:
				<input
					type='checkbox'
					checked={config.short_team_names_for_runs_hits}
					onChange={(e) => handleChange('short_team_names_for_runs_hits', null, e.target.checked)}
				/>
			</label>
			<label>
				Preferred Game Update Delay (in 10s of seconds):
				<input
					type='number'
					value={config.preferred_game_update_delay_in_10s_of_seconds}
					onChange={(e) =>
						handleChange(
							'preferred_game_update_delay_in_10s_of_seconds',
							null,
							parseInt(e.target.value)
						)
					}
				/>
			</label>
			<label>
				Pregame Weather:
				<input
					type='checkbox'
					checked={config.pregame_weather}
					onChange={(e) => handleChange('pregame_weather', null, e.target.checked)}
				/>
			</label>
			<label>
				Scrolling Speed:
				<input
					type='number'
					value={config.scrolling_speed}
					onChange={(e) => handleChange('scrolling_speed', null, parseInt(e.target.value))}
				/>
			</label>
			<label>
				Debug:
				<input
					type='checkbox'
					checked={config.debug}
					onChange={(e) => handleChange('debug', null, e.target.checked)}
				/>
			</label>
			<label>
				Demo Date:
				<input
					type='checkbox'
					checked={config.demo_date}
					onChange={(e) => handleChange('demo_date', null, e.target.checked)}
				/>
			</label>

			<button type='submit'>Submit</button>
		</form>
	);
};

export default ConfigManager;
