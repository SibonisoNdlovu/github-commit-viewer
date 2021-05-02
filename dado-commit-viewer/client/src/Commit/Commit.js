import React from 'react';
import './Commit.css'

const Commit = ({name, message, date, avatar}) => {
	return (
		<div id="container">
			<div id="name"> 
				<h3>
					<img src={avatar} style={{width:"20%", height:"20%", borderRadius:"50%", float:"right"}}/>
					{name}
				</h3>
			</div>
			<div id="message"><h3>{message}</h3></div>
			<div id="date"><h3>{date}</h3></div>
		</div>
	);
}

export default Commit;