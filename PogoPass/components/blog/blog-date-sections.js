import React from 'react';
import {View, Text} from 'react-native';
import Blurb from './blurb';

export default class BlogDateSections extends React.Component {

  constructor(props){
    super(props);
		this.state = {
			datedPosts: []
		}
  }

  componentDidMount(){
    EliteAPI.CMS.Post.search({sort_columns: "publish_at DESC"}, success => {
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
			this.setState({datedPosts: datedPosts});

		}, failure => {})
  }


	groupDates(){

	}

  render() {
		let dateSections = Object.keys(this.state.datedPosts).map(key => {
			let postElements = this.state.datedPosts[key].map(post => <Blurb key={post.post_id} post={post}/>)

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
        <View>
					{dateSections}
        </View>
    );
  }
}



const STYLES = {
  dateSectionText: {
    fontSize: 16,
		color: 'white'
  },
	totalDateSection: {
		marginTop: 25
	}
}


// this.setState({posts: success.data.posts}, function () {
// 	console.log(this.state.posts[0].name);
// });

//<Text>{this.state.dates[0]}</Text>

// for(let i = 0; i < this.state.posts.length; i++){
// 	if(!this.state.dates.includes(this.state.posts[i].created_at)){
// 		console.log("This is a date of a post: ", this.state.posts[i].created_at);
// 		this.setState({dates: this.state.dates.concat(this.state.posts[i].created_at)});
// 		};
// 	}
// 	this.parsePosts();
