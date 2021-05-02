import React, { Component } from 'react';
import SearchBox from './SearchBox/SearchBox';
import CommitList from './CommitList/CommitList';
import Repo from "./Repo/repo";
import './App.css';
import axios from "axios";

class App extends Component {
	constructor() {
		super()
		this.state = {
			payload: [],
			commits: [],
			searchedText: '',
			isLoading: true,
			hasRepo: true,
			fromSearch: false
		}

		this.getCommits = this.getCommits.bind(this);
		this.findRepo = this.findRepo.bind(this);
	}

	getRepos = () => {
		axios.get("/getRepos")
			.then( res => 
				this.setState({
					payload: res.data.data.items.slice(10,15),
					isLoading: false
			})
		)
	};

	getCommits = (e,item) => {
		axios.post("/getCommits",{ data : JSON.stringify({
			name : item.name,
			owner : item.owner.login,
			branch: item.default_branch
		})})
			.then( res => this.setState({
				commits: res.data.data.slice(0,50),
				payload: [], 
				searchedText: item.name+"/"+item.owner.login ,
				isLoading: false,
				hasRepo: true
			})
		)
	};


	findRepo = (e,username, fromSearch) => {
		this.setState({commits: [], searchedText: username, isLoading: true, fromSearch:fromSearch})
		axios.post("/findRepo",{ data : JSON.stringify({username : username })})
			.then( res => res.data.data.length>=1? this.getCommits('',res.data.data[0]) : this.setState({
				hasRepo: false,
				searchedText: username,
				isLoading: false,
				hasNoCommits: res.data.data.length>=1 ? true: false
			 })
		)
	};

	render() {
		if(this.state.payload.length===0){ this.getRepos() }
		const retrievedRepos = ( this.state.payload.map((item, index) => (<Repo item={item}  getCommits={this.getCommits}  ></Repo>)));
		if(this.state.isLoading && this.state.searchedText!=='' && this.state.fromSearch===false){
			return(
				<div>
				<div id="container2">
					<div id="searchbarText"> <h3>Commit Viewer</h3></div>
					<div id="searchbar">
						<SearchBox findRepo={this.findRepo} />
					</div>
					<div id="clear"></div>
				</div>
				<div className="tc">
					<h1>{this.state.searchedText}</h1>
					<h1>Loading...</h1>
				</div>
			</div>
			)
		}
		else if(this.state.isLoading && this.state.fromSearch===false){
			return(
				<div id="mainDiv">
				<div id="container">
					<div id="first"> <h3>Commit Viewer</h3></div>
					<div id="second"><h3>Contact</h3></div>
					<div id="third"><h3>About</h3></div>
					<div id="clear"></div>
				</div>
				<div className='tc'>
					<h1>Discover the world of code</h1>
					<p1>
						Explore open source projects from Github, and
						read their commit history to see the story how
						they were build.
					</p1>
					<div id="emptyDiv"></div>
					<SearchBox findRepo={this.findRepo} />
					<h1> Loading ... </h1>
				</div>
				</div>
			);
		}
		else if(retrievedRepos.length>1 && this.state.commits.length===0 && this.state.fromSearch===false){
			return(
				<div id="mainDiv">
				<div id="container">
					<div id="first"> <h3>Commit Viewer</h3></div>
					<div id="second"><h3>Contact</h3></div>
					<div id="third"><h3>About</h3></div>
					<div id="clear"></div>
				</div>
				<div className='tc'>
					<h1>Discover the world of code</h1>
					<p1>
						Explore open source projects from Github, and
						read their commit history to see the story how
						they were build.
					</p1>
					<div id="emptyDiv"></div>
					<SearchBox findRepo={this.findRepo} />
					<h4> Or pick one of these suggested repos </h4>
					<div>{retrievedRepos}</div>
				</div>
				</div>
			);
		}
		else{
			return(
				<div>
					<div id="container2">
						<div id="searchbarText"> <h3>Commit Viewer</h3></div>
						<div id="searchbar">
							<SearchBox findRepo={this.findRepo} />
						</div>
						<div id="clear"></div>
						<h1 className="tc">{this.state.searchedText}</h1>
					</div>
					{
						this.state.isLoading? <div id="loadingpage"><h1 id="loading"> Loading... </h1> </div>:
						<div>
							{ 
								this.state.commits.length<0 || !this.state.hasRepo? <h1>Repo not found, Please try again</h1> : <CommitList commits ={this.state.commits}/>
							}
						</div>
					}
				</div>
			)
		}
	}
}

export default App;