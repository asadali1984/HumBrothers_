using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class customers_
    {
        [Key]
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string GST { get; set; }
        public string category { get; set; }
        public string NTN { get; set; }
        public string customertype_ { get; set; }
        public int areaid { get; set; }
        public string Area { get; set; }
        public string RefNum { get; set; }
        public string District { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string CellNo1 { get; set; }
        public string PostalCode { get; set; }
        public string CellNo2 { get; set; }
        public string PostalOfficeContact { get; set; }
        public string CellNo3 { get; set; }
        public string NIC { get; set; }
        public string CellNo4 { get; set; }
        public string city_ { get; set; }
        public string Address { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public double saleper { get; set; }
        public string Cus_Code { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
        public string cust_acc { get; set; }
        //public bool left_eye { get; set; }
        //public bool right_eye { get; set; }
        //public string RSph { get; set; }
        //public string RCyl { get; set; }
        //public string RAxis { get; set; }
        //public string RAdd { get; set; }
        //public string LSph { get; set; }
        //public string LCyl { get; set; }
        //public string LAsix { get; set; }
        //public string LAdd { get; set; }
    }
}