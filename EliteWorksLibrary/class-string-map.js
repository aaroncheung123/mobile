

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
        order: EliteAPI.Models.CRM.Order
    }
}
export default CLASS_STRING_MAP;