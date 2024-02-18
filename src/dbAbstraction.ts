import type { Party, Proposal, Proximity, UserVote } from './types.ts';

export function aprovingParties(proposal: any): Party[] {
	const votes = proposal.votes;
	const aprovingParties: Party[] = [];

	for (const partyVote in votes) {
		if (votes[partyVote] == 1) {
			aprovingParties.push({ name: partyVote });
		}
	}
	return aprovingParties;
}

export function rejectingParties(proposal: any): Party[] {
	const votes = proposal.votes;
	const rejectingParties: Party[] = [];

	for (const partyVote in votes) {
		if (votes[partyVote] == 0) {
			rejectingParties.push({ name: partyVote });
		}
	}
	return rejectingParties;
}

export function abstainingParties(proposal: any): Party[] {
	const votes = proposal.votes;
	const abstainingParties: Party[] = [];

	for (const partyVote in votes) {
		if (votes[partyVote] == 2) {
			abstainingParties.push({ name: partyVote });
		}
	}
	return abstainingParties;
}

export function finalResultMapping(result: string): boolean {
	if (result === '1') {
		return true;
	} else {
		return false;
	}
}

export function calculateProximity(proposals: Proposal[], userVote: UserVote[], userProximity: Proximity[]) {
	for (let proposal of proposals) {
		for (let uservote of userVote) {
			if (uservote.proposal.official_id === proposal.official_id) {
				if (uservote.vote === '1') {
					updateProximity(proposal.aproving_parties, userProximity, 1);
					updateProximity(proposal.rejecting_parties, userProximity, -1);
					updateProximity(proposal.abstaining_parties, userProximity, 0.5);
				} else if (uservote.vote === '0') {
					updateProximity(proposal.aproving_parties, userProximity, -1);
					updateProximity(proposal.rejecting_parties, userProximity, 1);
				} else if (uservote.vote === '2') {
					updateProximity(proposal.aproving_parties, userProximity, 0.5);
					updateProximity(proposal.abstaining_parties, userProximity, 1);
				}
			}
		}
	}
}

export function updateProximity(parties: Party[], userProximity: Proximity[], value: number) {
	for (let p of parties) {
		for (let prox of userProximity) {
			if (p.name === prox.party.name) {
				prox.value += value;
			}
		}
	}
}
