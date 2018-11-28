
import WebClient from './web-client';
import {Model} from './gen';

export default class CmsApi {
    constructor() {
    	this.SiteFile = new SiteFile();
        this.Blog = new Blog();
        this.BlogPost = new BlogPost();
        this.Post = new Post();
    }
}




class SiteFile extends Model {


  constructor() {
    super('sitefile');
  }

  // purpose
  //   add a site file / directory
  // args
  //   file_upload (required if file) - file that you want to upload
  //   site_file_parent_id (optional) (default is 0) (has to be a directory) - the directory you want the site file to be attached to
  //   name (required if directory) - name of directory you want to add
  //   private (optional) (default is false)
  // returns
  //   site_file - site file that you uploaded that you uploaded
  add (form_data, success_callback, failure_callback) {
    var url = '/global/cms/site/file/add';
    if (form_data.has === undefined) return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    return WebClient.basicPostFile(form_data, url, success_callback, failure_callback);
  }


  // purpose
  //   get site files
  // args
  //   site_file_parent_id (optional) (default is 0) - the directory of the file
  //   types (optional) (image, text, pdf, video, directory) (comma delimited list) - the type of file
  //   order_by (optional) (created_at_asc, created_at_desc, name_asc, name_desc)
  //   private (optional) (default is false)
  // returns
  //   site_files - site files in the directory
  where (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/files';
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   set a site file
  // args
  //   site_file_id (required)
  //   site_file_parent_id (optional) (-2 if it is an affiliate file)
  //   name (optional)
  // returns
  //   (none)
  set (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/file/set';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }


  // purpose
  //   get a site file search
  // args
  //   site_file_parent_id (optional) (default is 0)
  //   query_name (optional)
  //   trash (optional) (default is false)
  //   types (optional) (image, text, pdf, video, directory) (comma delimited list)
  //   take (optional) (max is 1000) (default is 25)
  //   page (optional) (default is 0) - starts at page 0, so display to the end user page + 1
  //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
  //   private (optional) (default is false)
  // returns
  //   site_files
  search (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/file/search';
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   delete a site file (sends to trash)
  // args
  //   site_file_id (required)
  //   deep_delete (optional) (deep delete removes file from s3 and deletes it complelety from our system. Any links will break) (warning: this will also delete any sub files)
  // return
  //   (none)
  delete (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/file/delete';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   restore a site file
  // args
  //   site_file_id (required)
  // returns
  //   (none)
  restore (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/file/restore';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }


  // purpose
  //   add a static map
  // args
  //   coordinate_array_json (required)
  //     - array ({
  //        longitude
  //        latitude
  //        color (hex color ex.FFFFFF) (default is green)
  //      })
  //   width (optional) (default 640) (max 640) (min 100)
  //   height (optinoal) (default 640) (max 640) (min 100)
  //   maptype (optional) (default roadmap) (roadmap, satellite, hybrid, terrain)
  //   zoom_level (optional) (default 14) (range 0 - 25)
  // returns
  //   site_file
  addStaticMap (form_data, success_callback, failure_callback)
  {
    var url = '/global/cms/site/file/add/static/map';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
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
