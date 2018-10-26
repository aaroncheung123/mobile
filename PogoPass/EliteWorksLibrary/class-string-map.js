

const CLASS_STRING_MAP = () => {
    return {
        user: EliteAPI.Models.CRM.User,
        timeclock: EliteAPI.Models.CRM.TimeClock,
        workorder: EliteAPI.Models.STR.WorkOrder,
        workorderproduct: EliteAPI.Models.STR.WorkOrderProduct,
        blog: EliteAPI.Models.CMS.Blog,
        post: EliteAPI.Models.CMS.Post,
        shippingaddress: EliteAPI.Models.STR.ShippingAddress,
        address: EliteAPI.Models.CRM.Address
    }
}
export default CLASS_STRING_MAP;