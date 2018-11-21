import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Post from './post';

export default class NewsDateSections extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			datedPosts: [],
			refreshing: false
		}
		this.handlePostSearch = this.handlePostSearch.bind(this);
	}

	componentDidMount(){
		this.handlePostSearch();
	}


	handlePostSearch() {
		this.setState({
			refreshing: true
		}, () => {

			this.postAjax = EliteAPI.CMS.Post.search({sort_columns: "publish_at DESC", take: '100'}, success => {
				let datedPosts = {};
				let currentDate = new Date();
				for (let post of success.data.posts) {
					let postDate = GlobalUtil.convertMysqlToDate(post.publish_at);
					if (postDate > currentDate) continue;
					let day = postDate.formatDate("n/d/Y");
					if (datedPosts[day] === undefined){
						datedPosts[day] = [];
					}
					datedPosts[day].push(post);
				}
				//console.log("Dated Posts: ", datedPosts);
				this.setState({datedPosts: datedPosts, refreshing: false});

			}, failure => {
				alert('Unable to connect');
				this.setState({refreshing: false})
			})
		})
	}


	componentWillMount() {
		if (this.postAjax) this.postAjax.abort();
	}


	render() {
		let dateSections = Object.keys(this.state.datedPosts).map(key => {
			let postElements = this.state.datedPosts[key].map(post => <Post key={post.post_id} post={post} onShowSpringPanel={this.props.onShowSpringPanel}/>)

			return (
				<View key={key} style={STYLES.totalDateSection}>
					<Text style={STYLES.dateSectionText}>
						{key}
					</Text>
					{postElements}
				</View>
			)
		})

		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this.handlePostSearch}
					/>
				}>
				<View style={STYLES.filler}>
					<View>
						{dateSections}
					</View>
				</View>
			</ScrollView>
		);
	}
}



const STYLES = {
	dateSectionText: {
		fontSize: 18,
		color: 'white'
	},
	totalDateSection: {
		paddingTop: 25,
		width: '100%'
	},
	filler: {
		marginBottom: 150
	}
}
