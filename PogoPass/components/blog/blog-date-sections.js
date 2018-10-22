import React from 'react';
import {View, Text} from 'react-native';
import Blurb from './blurb';

export default class BlogDateSections extends React.Component {

  constructor(props){
    super(props);
		this.state = {
			posts: [],
			dates: [],
			dateSections: []
		}
		this.groupDates.bind(this);
		this.parsePostsAccordingToDates.bind(this);
  }

  componentDidMount(){
    EliteAPI.CMS.Post.search({}, success => {
			//console.log(success.data.posts[0].name);
			this.setState({posts: success.data.posts}, function () {
				this.groupDates();
			});
		}, failure => {})
  }

	// *****************************************
	//
	//Grouping all of the posts according to their dates
	//
	// *****************************************
	groupDates(){
		console.log("Length of state.posts: ", this.state.posts.length);
		let myDateArray = [];
		for (let post of this.state.posts) {
			if(!this.state.dates.includes(post.created_at)){
				myDateArray.push(post.created_at);
			}
		}
		this.setState({dates: myDateArray}, function(){
			this.parsePostsAccordingToDates();
		});
	}


	parsePostsAccordingToDates(){
		let myArrayOfArrays = [];
		for(let date of this.state.dates){
			let myArray = [];
			for(let post of this.state.posts){
				if(post.created_at === date){
					myArray.push(post);
				}
			}
			myArrayOfArrays.push(myArray);
		}
		this.setState({dateSections: myArrayOfArrays});

	}

  render() {
		//let posts = this.state.posts.map(post => <Blurb key={post.post_id} post={post} />);
		let dateSections = this.state.dates.map(date => <Blurb key={date.date_id} posts={this.state.posts} date={date}/>);
    return (
        <View style={STYLES.blogContainer}>
					{dateSections}
        </View>
    );
  }
}



const STYLES = {
  blogContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 80,
    borderRadius: 20,
    marginTop: 10,
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
