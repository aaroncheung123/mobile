import EliteModel from "../elite-model";

export default class ElitePost extends EliteModel {

  primaryKey = 'post_id';
  dataModel = 'post';
  dataModelPlural = 'posts';

  constructor(post) {
    super(post);

    if (this.name == undefined) this.name = "";
    if (this.content == undefined) this.content = "";
    if (this.description == undefined) this.description = "";
    if (this.short_description == undefined) this.short_description = "";
    if (this.visible == undefined) this.visible = 1;

    if (GlobalUtil.isEmpty(this.data)) this.data = {};
    else if (typeof this.data === "string") this.data = JSON.parse(this.data);
    if (this.data.seo == undefined) this.data.seo = {};
    if (this.data.seo.meta_description == undefined) this.data.seo.meta_description = '';
    if (this.data.seo.meta_title == undefined) this.data.seo.meta_title = (this.name) ? this.name : undefined;
    if (this.data.seo.meta_keywords == undefined) this.data.seo.meta_keywords = [];
    if (this.data.general == undefined) this.data.general = {};
    if (this.data.general.show_featured_image == undefined) this.data.general.show_featured_image = true;

    if (this.published_at == undefined) this.published_at = ''
    // this.post_widgets = this.post_widgets.map((widget) => new Widget(widget));
  }

  save(successCallback, failureCallback) {
  	var tempData = $.extend(true, {}, this.data);
  	this.data = JSON.stringify(this.data);

    var ajax = null;

    if (this.post_id === undefined) ajax = EliteAPI.CMS.Post.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.CMS.Post.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

  	this.data = tempData;
    return ajax;

  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CMS.Post.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
