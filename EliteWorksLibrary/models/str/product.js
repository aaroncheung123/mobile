import EliteModel from "../elite-model";

export default class EliteProduct extends EliteModel {
  primaryKey = "product_id";
  dataModel = "product";
  dataModelPlural = "products";
  static searchFilters = [
    {
      title: "Visible",
      argument: "visible",
      type: "EQUAL",
      filterType: "equalBool"
    },
    {
      title: "Name",
      argument: "query_name",
      type: "SEARCH",
      filterType: "search",
      width: "150px"
    },
    {
      title: "Description",
      argument: "query_description",
      type: "SEARCH",
      filterType: "search",
      width: "150px"
    },
    {
      title: "Product Type",
      argument: "type",
      options: ["PHYSICAL", "AFFILIATE", "GIFT VOUCHER", "SERVICE"],
      type: "EQUAL",
      filterType: "equalDropdown",
      width: "125px"
    },
    {
      title: "Featured",
      argument: "featured",
      type: "EQUAL",
      filterType: "equalBool"
    },
    {
      title: "Created After",
      argument: "created_at_start",
      type: "GREATER",
      filterType: "datetime",
      width: "150px"
    },
    {
      title: "Created Before",
      argument: "created_at_end",
      type: "LESS",
      filterType: "datetime",
      width: "150px"
    },
    {
      title: "Product Group",
      argument: "product_group_ids",
      classString: "productgroup",
      type: "IN",
      filterType: "multiselect",
      width: "175px"
    }
  ];

  constructor(model) {
    super(model);
    if (this.name === undefined) this.name = "";
    if (this.url === undefined) this.url = "";
    if (this.short_description === undefined) this.short_description = "";
    if (this.description === undefined) this.description = "";
    if (this.long_description === undefined) this.long_description = "";
    if (this.type === undefined) this.type = "PHYSICAL";
    if (this.tax_code === undefined) this.tax_code = "00000";
    if (this.price === undefined) this.price = 0;
    if (this.sku_prefix === undefined) this.sku_prefix = "";

    if (this.product_prices === undefined) this.product_prices = [];
    if (this.product_images === undefined) this.product_images = [];
    if (this.product_specifications === undefined) this.product_specifications = [];
    if (this.categories === undefined) this.categories = [];
    if (this.shipping_companies === undefined) this.shipping_companies = [];
    if (this.shipping_services === undefined) this.shipping_services = [];
    if (this.rating_average === undefined) this.rating_average = 5;
    if (this.rating_count === undefined) this.rating_count = 0;
    if (this.use_global_shipping_rules === undefined) this.use_global_shipping_rules = true;

    if (this.data === undefined) this.data = {};
    else if (typeof this.data === "string") {
      if (this.data.trim() == "") this.data = {};
      else this.data = JSON.parse(this.data);
    }
    if (this.data.checkout === undefined) this.data.checkout = {};
    if (this.data.checkout.instructions === undefined) this.data.checkout.instructions = "";
    if (this.data.affiliate === undefined) this.data.affiliate = {};
    if (this.data.affiliate.link === undefined) this.data.affiliate.link = "";
    if (this.data.affiliate.type === undefined) this.data.affiliate.type = "";
    if (this.data.seo === undefined) this.data.seo = {};
    if (this.data.seo.meta_title === undefined) this.data.seo.meta_title = "";
    if (this.data.seo.meta_keywords === undefined) this.data.seo.meta_keywords = [];
    if (this.data.seo.meta_description === undefined) this.data.seo.meta_description = "";

    if (!this.data.dynamic) this.data.dynamic = {};

    if (this.product_id !== undefined && this.product_id !== null) this.product_id = Number(this.product_id);
    if (this.create_new_account !== undefined && this.create_new_account !== null) this.create_new_account = Number(this.create_new_account);
    if (this.featured !== undefined && this.featured !== null) this.featured = Number(this.featured);
    if (this.force_subscription !== undefined && this.force_subscription !== null) this.force_subscription = Number(this.force_subscription);
    if (this.manage_inventory !== undefined && this.manage_inventory !== null && this.manage_inventory !== "NULL")
      this.manage_inventory = Number(this.manage_inventory);
    if (this.manufacturer_id !== undefined && this.manufacturer_id !== null && this.manufacturer_id !== "NULL")
      this.manufacturer_id = Number(this.manufacturer_id);
    if (this.supplier_id !== undefined && this.supplier_id !== null && this.supplier_id !== "NULL") this.supplier_id = Number(this.supplier_id);
    if (this.service_id !== undefined && this.service_id !== null && this.service_id !== "NULL") this.service_id = Number(this.service_id);
    if (this.requires_account !== undefined && this.requires_account !== null) this.requires_account = Number(this.requires_account);
    if (this.requires_shipping !== undefined && this.requires_shipping !== null) this.requires_shipping = Number(this.requires_shipping);
    if (this.requires_tax !== undefined && this.requires_tax !== null) this.requires_tax = Number(this.requires_tax);
    if (this.search_price_tier !== undefined && this.search_price_tier !== null) this.search_price_tier = Number(this.search_price_tier);
    if (this.search_price_tier !== undefined && this.search_price_tier !== null) this.search_price_tier = Number(this.search_price_tier);
    if (this.visible !== undefined && this.visible !== null) this.visible = Number(this.visible);
    if (this.shipping_flat_rate !== undefined && this.shipping_flat_rate !== null) this.shipping_flat_rate = Number(this.shipping_flat_rate);
    if (this.shipping_height_inches !== undefined && this.shipping_height_inches !== null)
      this.shipping_height_inches = Number(this.shipping_height_inches);
    if (this.shipping_length_inches !== undefined && this.shipping_length_inches !== null)
      this.shipping_length_inches = Number(this.shipping_length_inches);
    if (this.shipping_width_inches !== undefined && this.shipping_width_inches !== null)
      this.shipping_width_inches = Number(this.shipping_width_inches);
    if (this.weight_ounces !== undefined && this.weight_ounces !== null) this.weight_ounces = Number(this.weight_ounces);
    if (this.search_price !== undefined && this.search_price !== null) this.search_price = Number(this.search_price);
    if (this.handling_fee !== undefined && this.handling_fee !== null) this.handling_fee = Number(this.handling_fee);

    if (this.tax_code == "") this.tax_code = "00000";
  }

  save(successCallback, failureCallback, async = true) {
    var tempData = $.extend(true, {}, this.data);
    this.data = JSON.stringify(this.data);

    if (GlobalUtil.isEmpty(this.requires_account_type_id)) this.requires_account_type_id = 'NULL';

    var ajax = null;
    if (this.product_id === undefined) ajax = EliteAPI.STR.Product.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback, async);
    else ajax = EliteAPI.STR.Product.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback, async);

    if (this.requires_account_type_id === 'NULL') this.requires_account_type_id = undefined;

    this.data = tempData;
    return ajax;
  }

  filter() {
    var price_base = this.price_base && this.price_base.price ? this.price_base.price : 0;
    var price_current = this.price_current && this.price_current.price ? this.price_current.price : 0;
    return {
      product_specifications: this.product_specifications,
      product_images: this.product_images ? this.product_images : [],
      price_current: price_current ? price_current : 0,
      price_base: price_base ? price_base : 0,
      name: this.name ? this.name : "",
      description: this.description ? this.description : "",
      short_description: this.short_description ? this.short_description : "",
      long_description: this.long_description ? this.long_description : "",
      type: this.type ? this.type : "PRODUCT",
      data: this.data ? this.data : {},
      url: this.url ? this.url : "",
      rating_average: this.rating_average ? this.rating_average : 0,
      rating_count: this.rating_count ? this.rating_count : 0,
      product_price_id: this.price_current && this.price_current.product_price_id ? this.price_current.product_price_id : 0
    };
  }

  getProductImageByType(type) {
    let image = undefined;
    this.product_images.map(product_image => {
      if (product_image.type === type) image = product_image;
    });
    return image;
  }

  get productImagesMiscellaneous() {
    return this.product_images
      .filter(product_image => {
        return product_image.type === "MISCELLANEOUS";
      })
      .sort((a, b) => {
        return a.ordinal - b.ordinal;
      });
  }

  addProductImage(productImage) {
    if (productImage.type !== "MISCELLANEOUS") {
      this.product_images = this.product_images.filter(x => x.type !== productImage.type);
    }
    this.product_images.push(productImage);
  }

  removeProductImage(productImage) {
    this.product_images = this.product_images.filter(x => x.product_image_id != productImage.product_image_id);
  }

  setMiscellaneousOrder(index, newIndex) {
    let miscProductImages = this.productImagesMiscellaneous;

    let oldProductImageId = miscProductImages[index].product_image_id;
    let oldOrdinal = miscProductImages[index].ordinal;
    let newOrdinal = miscProductImages[newIndex].ordinal;

    if (oldOrdinal == newOrdinal) return;
    if (oldOrdinal < newOrdinal) newOrdinal++;

    this.product_images.forEach(productImage => {
      if (productImage.ordinal >= newOrdinal && oldProductImageId != productImage.product_image_id) productImage.ordinal++;
    });

    this.product_images.forEach(productImage => {
      if (oldProductImageId == productImage.product_image_id) {
        productImage.ordinal = newOrdinal;
        productImage.save();
      }
    });
  }

  get productImagesOrdered() {
    // first get
    let orderOfImportants = ["PRIMARY", "SECONDARY", "FRONT", "BACK", "LEFT", "RIGHT", "TOP", "BOTTOM", "MISCELLANEOUS"];

    let productImages = [];
    orderOfImportants.forEach(type => {
      productImages = productImages.concat(
        this.product_images.filter(product_image => product_image.type == type).sort((a, b) => {
          return a.ordinal - b.ordinal;
        })
      );
    });

    return productImages;
  }

  delete(successCallback, failureCallback) {
    if (this.product_id !== undefined) return EliteAPI.STR.Product.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}

/*
	Affiliate Data Structure
		affiliate: {
			link: '', (https://url.com?ref=123456789)
			type: '', (AMAZON, EBAY, etc...)
		}
*/
