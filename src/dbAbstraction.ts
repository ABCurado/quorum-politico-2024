import data from './routes/+page.svelte';
import type { Party } from './types.ts';

export function aprovingParties(proposal: any): Party[]{
    
    const votes = proposal.votes;
    const aprovingParties: Party[] = [];

    for(const partyVote in votes){
        if(votes[partyVote] == 1){
            aprovingParties.push({name: partyVote});
        }
    }
    return aprovingParties;
}

export function rejectingParties(proposal: any): Party[]{

    const votes = proposal.votes;
    const rejectingParties: Party[] = [];

    for(const partyVote in votes){
        if(votes[partyVote] == 0){
            rejectingParties.push({name: partyVote});
        }
    }
    return rejectingParties;
    
}

export function abstainingParties(proposal: any): Party[]{
    
    const votes = proposal.votes;
    const abstainingParties: Party[] = [];

    for(const partyVote in votes){
        if(votes[partyVote] == 2){
            abstainingParties.push({name: partyVote});
        }
    }
    return abstainingParties;

}

export function finalResultMapping(result: string): boolean{
    
    if(result === "1"){
        return true;
    } else {
        return false;
    }

}