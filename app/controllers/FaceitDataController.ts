import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fetch from 'node-fetch';


export default class FaceitDataController {
	public async getUpcomingMatches({ response }: HttpContextContract) {
		const MATCHES_ENDPOINT = 'https://www.faceit.com/api/championships/v1/matches?participantId=ee2358dc-3699-4a4d-b701-615d049d2a38&participantType=TEAM&championshipId=d2034ad6-1895-4679-9a17-77032e67ead1&limit=20&offset=0';
        const TEAM_ENDPOINT = 'https://www.faceit.com/api/teams/v3/teams/';
		const responseFromFaceit = await fetch(MATCHES_ENDPOINT);
		const matchesData = await responseFromFaceit.json();

		const data = matchesData.payload;

		const upcomingMatchesData = data.items.filter((match: any) => {
			return match.status === 'created';
		}).map(async (match: any) => {

            let teamsPromises = match.factions.map((team: any) => {
                return fetch(TEAM_ENDPOINT + team.id)
                    .then(response => response.json())
                    .then(teamData => {
                        if (teamData.payload.id === 'ee2358dc-3699-4a4d-b701-615d049d2a38') return null;
                        const matchDate = new Date(match.origin.schedule);
                        const pdtTime = matchDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
                        return {
                            status: match.status,
                            enemyTeam: teamData.payload.name,
                            matchTime: pdtTime + ' PDT',
                        };
                    });
            });
            
            let teams = await Promise.all(teamsPromises);
            teams = teams.filter(team => team !== null);
            return teams;
		});
        let upcomingMatches = await Promise.all(upcomingMatchesData);
        upcomingMatches = upcomingMatches.flat();
        return upcomingMatches;

	}
}