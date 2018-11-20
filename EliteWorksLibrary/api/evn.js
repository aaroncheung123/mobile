
import WebClient from './web-client';
import {Model} from './gen';

export default class EvnApi {
    constructor() {
        this.Availability = new Availability();
        this.Venue = new Venue();
        this.Event = new Event();
        this.VenueLocation = new VenueLocation();
        this.TimeBlock = new  TimeBlock();
    }
}

class Venue extends Model {

    constructor() {
        super('venue');
    }

    // purpose
    //   get all venues that match filters - if no filters then it will get all venues
    // args
    //   (none for now)
    // return
    //   venues
    where (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venues';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   add a venue
    // args
    //   name (required)
    //   url (optional) (default creates url from name)
    //   email (optional)
    //   phone (optional)
    //   short_description (optional)
    //   description (optional)
    //   inclusions (optional)
    //   address_id (optional)
    //   data (optional)
    //   template_id (optional)
    //   visible (optional)
    //   timezone (optional) (default is ((GMT) London))
    //   banner_site_file_id (optional)
    //   logo_site_file_id (optional)
    //   icon_site_file_id (optional)
    //   data (optional)
    // returns
    //   venue
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/add';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.venue = new EliteAPI.Models.EVN.Venue(success.data.venue)
            if (success_callback) success_callback(success);
        }, failure_callback);
    }

    // purpose
    //   set a venue
    // args
    //   venue_id (required)
    //   name (optional)
    //   url (optional)
    //   email (optional)
    //   phone (optional)
    //   short_description (optional)
    //   description (optional)
    //   inclusions (optional)
    //   address_id (optional)
    //   template_id (optional)
    //   timezone (optional)
    //   visible (optional)
    //   banner_site_file_id (optional)
    //   logo_site_file_id (optional)
    //   icon_site_file_id (optional)
    //   data (optional)
    // returns
    //   none
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   search all venue products
    // args
    //   start_created_at (optional)
    //   end_created_at (optional)
    //   query_search (optional)
    //   service_ids (optional)
    //   take (optional) (max = 1000)
    //   page (optional)
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   venues
    search (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/search';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.venues = success.data.venues.map(venue => new EliteAPI.Models.EVN.Venue(venue));
            if (success_callback) success_callback(success)
        }, failure_callback);
    }
}



class VenueLocation extends Model {

    constructor() {
        super('venuelocation');
    }

    // purpose
    //   add a venue location
    // args
    //   venue_id (required)
    //   name (required)
    //   url (optional) (default will create url based on name)
    //   short_description (optional)
    //   description (optional)
    //   email (optional)
    //   phone (optional)
    //   address_id (optional)
    //   timezone (optional) (deafult is venues timezone)
    //   template_id (optional)
    //   data (optional)
    // returns
    //   venue_location
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/location/add';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.venue_location = new EliteAPI.Models.EVN.VenueLocation(success.data.venue_location)
            if (success_callback) success_callback(success);
        }, failure_callback);
    }

    // purpose
    //   set a venue location
    // args
    //   venue_location_id (required)
    //   name (optional)
    //   url (optional)
    //   short_description (optional)
    //   description (optional)
    //   email (optional)
    //   phone (optional)
    //   address_id (optional)
    //   template_id (optional)
    //   timezone (optional)
    //   data (optional)
    //   active (optional)
    // returns
    //   (none)
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/location/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   search venue locations
    // args
    //   venue_id (optional)
    //   query_search (optional)
    //   active (optional)
    //   take (optional) (max is 1000) (default is 25) - the number inventory products (this helps so we do not ask for too much all at once)
    //   page (optional) (default is 0) - starts at page 0, so display to the end user page + 1
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   venue_locations
    search (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/venue/location/search';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.venue_locations = success.data.venue_locations.map(venue_location => new EliteAPI.Models.EVN.VenueLocation(venue_location));
            if (success_callback) success_callback(success)
        }, failure_callback);
    }
}



class Event extends Model {

    constructor() {
        super('event');
    }

    // purpose
    //   add an event
    // args
    //   name (required)
    //   start (required)
    //   end (required)
    //   url (optional) (default creates url from name)
    //   organizer_id (optional)
    //   venue_location_id (optional)
    //   short_description (optional)
    //   description (optional)
    //   long_description (optional)
    //   timezone (optional)
    //   template_id (optional)
    //   data (optional)
    // returns
    //   event
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/event/add';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.event = new EliteAPI.Models.EVN.Event(success.data.event)
            if (success_callback) success_callback(success);
        }, failure_callback);
    }
    
    // purpose
    //   set an event
    // args
    //   event_id (required)
    //   name (optional)
    //   url (optional)
    //   start (optional)
    //   end (optional)
    //   organizer_id (optional)
    //   venue_location_id (optional)
    //   description (optional)
    //   short_description (optional)
    //   long_description (optional)
    //   timezone (optional)
    //   template_id (optional)
    //   data (optional)
    //   active (optional)
    // returns
    //   none
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/event/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get an event that match filters
    // args
    //   end_after (optional) - gets any event that ends after this time
    //   start_before (optional) - gets any event that starts after this time
    // returns
    //   event
    where (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/events';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   search events
    // args
    //   query_search (optional) - searches events by query
    //   end_after (optional) 
    //   end_before (optional) 
    //   start_after (optional) 
    //   start_before (optional) 
    //   venue_ids (optional) (comma dilemeted list of venue_ids ex. (1,23,342))
    //   venue_location_ids (optional) (comma dilemeted list of venue_location_ids ex. (1,23,342))
    //   take (optional) (default is 20) - specifies how many to take
    //   page (optional) (default is 0) - specifies the page to take
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   events
    search (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/event/search';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.events = success.data.events.map(event => new EliteAPI.Models.EVN.Event(event));
            if (success_callback) success_callback(success)
        }, failure_callback);
    }

    // purpose
    //   get the venue calender meta data to desiplay a calander with basic information
    // args
    //   date_start (required)
    //   date_end (required)
    //   venue_ids (optional) (comma dilemeted list of venue_ids ex. (1,23,342))
    //   venue_location_ids (optional) (comma dilemeted list of venue_location_ids ex. (1,23,342))
    // returns
    //   meta (object of event calendar meta data) 
    calendarMeta (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/event/calendar/meta';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }
}


class TimeBlock extends Model {

    constructor() {
        super('timeblock');
    }

    // purpose
    //   add time block
    // args
    //   event_id (required)
    //   start (required)
    //   end (required)
    //   organizer_id (optional)
    // returns
    //   time_block
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/time/block/add';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   set time block
    // args
    //   time_block_id (required)
    //   start (optional)
    //   end (optional)
    //   organizer_id (optional)
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/time/block/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get all time blocks that match filter
    // args
    //   event_id (optional)
    // returns
    //   time_blocks
    where (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/time/blocks';
        return WebClient.basicGet(form_data, url, success => {
            success.data.time_blocks = success.data.time_blocks.map(timeBlock => new EliteAPI.Models.EVN.TimeBlock(timeBlock));
            if (success_callback) success_callback(success);
        }, failure_callback);
    }

    // purpose
    //   search time blocks
    // args
    //   event_id (optional)
    //   active (optional) (default is 1)
    //   take (optional) (max = 1000)
    //   page (optional)
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   time_blocks
    search(form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/time/block/search';
        return WebClient.basicGet(form_data, url, success => {
            success.data.time_blocks = success.data.time_blocks.map(timeBlock => new EliteAPI.Models.EVN.TimeBlock(timeBlock));
            if (success_callback) success_callback(success);
        }, failure_callback);
    }
}
class Availability extends Model {

    constructor() {
        super('availability');
    }

    // purpose
    //   add an event time block availability
    // args
    //   time_block_id (required)
    //   quantity (optional) (default is unlimited)
    //   name (required)
    //   description (optional)
    //   redeem_description (optional)
    //   product_id (optional)
    //   venue_service_id (optional)
    //   limit_per_account (optional) (default is 1)
    //   open_enrollment (optional) (default is 0)
    //   use_codes (optional) (default is 0) (quanitty must be set if use_codes is true)
    //   registration_start (optional) (default is the day you created the availability) (must be earlier than registration end)
    //   registration_end (optional) (default is the time the time block starts) (cannot be later than time block start)
    // returns
    //   availability
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/availability/add';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.availability = new EliteAPI.Models.EVN.Availability(success.data.availability);
            if (success_callback) success_callback(success);
        }, failure_callback);
    }
        
    // purpose
    //   set event time block availability
    // args
    //   availability_id (required)
    //   product_id (optional)
    //   name (optional)
    //   description (optional)
    //   redeem_description (optional)
    //   venue_service_id (optional)
    //   limit_per_account (optional)
    //   quanity (optional)
    //   use_codes (optional) 
    //   open_enrollment (optional)
    //   registration_start (optional) (default is the day you created the availability) (must be earlier than registration end)
    //   registration_end (optional) (default is the time the time block starts) (cannot be later than time block start)
    // returns
    //   none
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/availability/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get availability search
    // args
    //   time_block_ids (optional)
    //   product_ids (optional)
    //   service_ids (optional)
    //   take (optional) (default is 10) (max = 1000) 
    //   page (optional) (default is 0) 
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   availabilities
    search (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/availability/search';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.availabilities = success.data.availabilities.map(availability => new EliteAPI.Models.EVN.Availability(availability));
            if (success_callback) success_callback(success)
        }, failure_callback);
    }

    // purpose
    //   register for an availability
    // args
    //   availability_id (required)
    //   user_id (optional) (default is logged in user)
    //   account_id (optional) (required if open enrollment is false)
    //   quantity (optional) (default is 1)
    // returns
    //   availability_registrants
    register (form_data, success_callback, failure_callback)
    {
        var url = '/global/evn/availability/register';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }
}