

const CLASS_STRING_MAP = () => {
    return {
        user: EliteAPI.Models.CRM.User,
        timeclock: EliteAPI.Models.CRM.TimeClock,
        deal: EliteAPI.Models.CRM.Deal,
        zone: EliteAPI.Models.CRM.Zone,
        workorder: EliteAPI.Models.STR.WorkOrder,
        workorderproduct: EliteAPI.Models.STR.WorkOrderProduct,
        blog: EliteAPI.Models.CMS.Blog,
        post: EliteAPI.Models.CMS.Post,
        shippingaddress: EliteAPI.Models.STR.ShippingAddress,
        address: EliteAPI.Models.CRM.Address,
        order: EliteAPI.Models.CRM.Order,
        notification: EliteAPI.Models.CRM.Notification,
        paymentmethod: EliteAPI.Models.STR.PaymentMethod,
        subscription: EliteAPI.Models.STR.Subscription,
        product: EliteAPI.Models.STR.Product,
        cart: EliteAPI.Models.STR.Cart,  
        cartproduct: EliteAPI.Models.STR.CartProduct,
        credit: EliteAPI.Models.STR.Credit,
        device: EliteAPI.Models.CRM.Device,
        event: EliteAPI.Models.EVN.Event,
        timeblock: EliteAPI.Models.EVN.TimeBlock,
        venue: EliteAPI.Models.EVN.Venue,
        venuelocation: EliteAPI.Models.EVN.VenueLocation,
        availability: EliteAPI.Models.EVN.Availability,
        account: EliteAPI.Models.CRM.Account,
        sitefile: EliteAPI.Models.CMS.SiteFile
    }
}
export default CLASS_STRING_MAP;