import EliteModel from '../elite-model';

export default class EliteBlog extends EliteModel {

  primaryKey = 'blog_id';
  dataModel = 'blog';
  dataModelPlural = 'blogs';
  constructor(blog) {
    super(blog);
    this.posts = (this.posts) ? this.posts.map((post) => (new EliteAPI.Models.CMS.ElitePost(post))) : [];

    if (this.name == undefined) this.name = '';
    if (this.url == undefined) this.url = ''
    if (this.long_description == undefined) this.long_description = '';
    if (this.short_description == undefined) this.short_description = '';
    if (this.visible == undefined) this.visible = true;

    if (this.data === undefined) this.data = {}
    else if (typeof(this.data) === 'string') {
      if (this.data.trim() == '') this.data = {};
      else this.data = JSON.parse(this.data);
    }

    this.description = (GlobalUtil.isEmpty(this.description)) ? '' : this.description.trim();


    if (GlobalUtil.isEmpty(this.data.seo)) this.data.seo = {};
    if (GlobalUtil.isEmpty(this.data.seo.meta_description)) this.data.seo.meta_description = '';
    if (GlobalUtil.isEmpty(this.data.seo.meta_title)) this.data.seo.meta_title = (this.name) ? this.name : undefined;
    if (GlobalUtil.isEmpty(this.data.seo.meta_keywords)) this.data.seo.meta_keywords = [];
    if (GlobalUtil.isEmpty(this.data.general)) this.data.general = {};

    if (GlobalUtil.isEmpty(this.data.general.show_sidebar)) this.data.general.show_sidebar = true;
    if (GlobalUtil.isEmpty(this.data.general.lazy_load)) this.data.general.lazy_load = false;
    if (GlobalUtil.isEmpty(this.data.general.posts_per_page)) this.data.general.posts_per_page = 10;
    if (GlobalUtil.isEmpty(this.data.general.show_posts_featured_image)) this.data.general.show_posts_featured_image = true;

    if (GlobalUtil.isEmpty(this.data.general.show_description)) this.data.general.show_description = true;
    if (GlobalUtil.isEmpty(this.data.general.show_search)) this.data.general.show_search = true;
    if (GlobalUtil.isEmpty(this.data.general.show_about)) this.data.general.show_about = true;
    if (GlobalUtil.isEmpty(this.data.general.show_recent)) this.data.general.show_recent = true;
    if (GlobalUtil.isEmpty(this.data.general.show_blogs)) this.data.general.show_blogs = true;
    if (GlobalUtil.isEmpty(this.data.general.show_archives)) this.data.general.show_archives = true;
    if (GlobalUtil.isEmpty(this.data.general.show_meta)) this.data.general.show_meta = true;
  }

  save(successCallback, failureCallback){

    var tempData = $.extend(true, {}, this.data);
    this.data = JSON.stringify(this.data);

    var ajax = undefined;
    if (this.blog_id === undefined) {
      if(this.url.trim() === '') this.url = undefined
      ajax = EliteAPI.CMS.Blog.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    }
    else ajax = EliteAPI.CMS.Blog.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

    this.data = tempData;
    return ajax;
  }

  clone(overrides) {
    var clone = JSON.parse(JSON.stringify(this));
    if (overrides) {
      var keys = Object.keys(overrides);
      keys.map(key => clone[key] = overrides[key]);
    }
    return new EliteBlog(clone);
  }

  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CMS.Blog.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
