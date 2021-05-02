import React from 'react';
import "../Repo/repo.css"

const Repo = ({item,getCommits}) => {
	return (
		<div className='dib br3 bw2'>
			<button className='button' onClick={function(e) {
							getCommits(e,item);}
						} >
				{ item.full_name }
			</button>
		</div>
	);
}

export default Repo;