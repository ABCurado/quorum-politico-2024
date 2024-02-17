export type Party = {
	name: string;
};

export type Proximity = {
	party: Party;
	value: number;
};

export type Proposal = {
    id: string;
    official_id: string;
    vote_link: string;
    proposalLink: string;
    title: string;
    description: string;
    counter_arguments: string;
    category: string;
    type: string;
    author: string;
    parties: Array<string>;
    party_votes: Array<number>;
    aproving_parties: Party[];
    rejecting_parties: Party[];
    abstaining_parties: Party[];
    final_result: boolean;
};

export type UserVote = {
    proposal: Proposal;
    vote: string;
}

export type Glossary = {
    category: string;
    description: string;
}

