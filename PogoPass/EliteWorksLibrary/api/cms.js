
import WebClient from './web-client';
import {Model} from './gen';

export default class CmsApi {
    constructor() {
        this.Blog = new Blog();
        this.BlogPost = new BlogPost();
        this.Post = new Post();
    }
}




class Blog extends Model {

	constructor() {
		super ('blog');
	}

	// purpose
	//   add a blog to the database
	// args
	//   url (optional)
	//   name (required)
	//   short_description (optional)
	//   description (optional)
	//   long_description (optional)
	//   visible (optional) (default is 1)
	//   template_id (optional)
	//   data (optional)
	// returns
	//   blog - blog model from the database
	add (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/blog/add';
		return WebClient.basicPost(form_data, url,  (success) => {
			success.data.blog = new EliteAPI.Models.CMS.Blog(success.data.blog);
			if (success_callback) success_callback(success);
		}, failure_callback);
	}

	// purpose
	//   set blog in the database
	// args
	//   blog_id (required)
	//   url (optional)
	//   name (optional)
	//   short_description (optional)
	//   description (optional)
	//   long_description (optional)
	//   visible (optional) (default is 1)
	//   template_id (optional)
	//   data (optional)
	// returns
	//   (none)
	set (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/blog/set';
		return WebClient.basicPost(form_data, url, success_callback, failure_callback);
	}

	// purpose
	//   get all blogs that match query
	// args
	//   query_name (optional) - filter pages by name
	//   active (optional) (default is 1) - filter pages by active
	//   take (optional) (default is 10) (max = 1000) - the number of pages to take
	//   page (optional) (default is 0) - starts at page 0, so display to the end user page + 1
	// returns
	//   pages - pages that matched search filter
	search (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/blog/search';
		return WebClient.basicGet(form_data, url,  (success) => {
			success.data.blogs = success.data.blogs.map((blog) => new EliteAPI.Models.CMS.Blog(blog));
			if (success_callback) success_callback(success);
		}, failure_callback);
	}

}
class BlogPost {

	// purpose
	//   add a post to a blog
	// args
	//   blog_id (required)
	//   post_id (required)
	// returns
	//   blog_post
	add (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/blog/post/add';
		return WebClient.basicPost(form_data, url, success_callback, failure_callback);
	}

	// purpose
	//   remove a post from a blog
	// args
	//   blog_id (required)
	//   post_id (required)
	// returns
	//   (none)
	delete (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/blog/post/delete';
		return WebClient.basicPost(form_data, url, success_callback, failure_callback);
	}
}
class Post extends Model {

	constructor() {
		super('post');
	}

	// purpose
	//   add post to database
	// args
	//   url (optional)
	//   name (required)
	//   short_description (optional)
	//   description (optional)
	//   content (optional)
	//   data (optional)
	//   visible (optional) (default is 1)
	//   publish_at (optional) (default is now)
	//   featured_site_file_id (optional)
	// returns
	//   post
	add (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/post/add';
		return WebClient.basicPost(form_data, url,  (success) => {
			success.data.post = new EliteAPI.Models.CMS.Post(success.data.post);
			if (success_callback) success_callback(success);
		}, failure_callback);
	}

	// purpose
	//   set post in database
	// args
	//   post_id (required)
	//   url (optional)
	//   name (required)
	//   short_description (optional)
	//   description (optional)
	//   content (optional)
	//   data (optional)
	//   visible (optional) (default is 1)
	//   publish_at (optional) (default is now)
	//   featured_site_file_id (optional)
	// returns
	//   (none)
	set (form_data, success_callback, failure_callback)
	{
		var url = '/global/cms/post/set';
		return WebClient.basicPost(form_data, url, success_callback, failure_callback);
	}

}