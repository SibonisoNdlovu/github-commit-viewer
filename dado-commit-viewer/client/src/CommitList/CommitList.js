import React from 'react';
import Commit from '../Commit/Commit';

const CommitList = ({commits}) => {
	const commitsArray = commits.map((user, i) => {
		return (
			<Commit 
				name={commits[i].commit.committer.name} 
				message={commits[i].commit.message} 
				date={commits[i].commit.committer.date} 
				avatar={commits[i].author!==null? commits[i].author.avatar_url: "https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png"}
			/>
			)
	});

	return (
		<div>
			{commitsArray}
		</div>
		);
} 

export default CommitList;
