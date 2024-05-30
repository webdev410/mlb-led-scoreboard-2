const initialConfig = {
	preferred: {
		teams: ['Orioles'],
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
	},
	news_ticker: {
		team_offday: false,
		always_display: false,
		preferred_teams: true,
		display_no_games_live: false,
		traderumors: true,
		mlb_news: true,
		countdowns: true,
		date: true,
		date_format: '%A, %B %-d',
	},
	standings: {
		team_offday: true,
		mlb_offday: true,
		always_display: false,
		display_no_games_live: true,
	},
	rotation: {
		enabled: true,
		scroll_until_finished: true,
		only_preferred: false,
		only_live: true,
		rates: {
			live: 15.0,
			final: 15.0,
			pregame: 15.0,
		},
		while_preferred_team_live: {
			enabled: false,
			during_inning_breaks: true,
		},
	},
	weather: {
		apikey: '12ca4e0d3b55ecf2b0a8e1d7cdf877b3',
		location: 'Nashville, TN, US',
		metric_units: false,
	},
	time_format: '12h',
	end_of_day: '00:00',
	full_team_names: true,
	short_team_names_for_runs_hits: true,
	preferred_game_update_delay_in_10s_of_seconds: 0,
	pregame_weather: false,
	scrolling_speed: 2,
	debug: false,
	demo_date: false,
};
export default initialConfig;
