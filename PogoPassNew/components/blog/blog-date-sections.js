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

  render() {
		let dateSections = Object.keys(this.state.datedPosts).map(key => {
			let postElements = this.state.datedPosts[key].map(post => <Blurb key={post.post_id} post={post} onShowSpringPanel={this.props.onShowSpringPanel}/>)

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
    fontSize: 18,
		color: 'white'
  },
	totalDateSection: {
		paddingTop: 25,
		width: '100%'
	}
}
