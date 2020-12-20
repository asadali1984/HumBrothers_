using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class Users
    {
        
        [Key]
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Designation { get; set; }
        public string TelephoneNo { get; set; }
        public string FaxNo { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string CanChangePassword { get; set; }
        public string Level { get; set; }
        public string AccountDisable { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateTime { get; set; }
        public string CreateTerminal { get; set; }
        public string UpdateBy { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateTerminal { get; set; }
        public string CompanyName { get; set; }
        public string CompanyImg { get; set; }
        public double Salary { get; set; }
        public string usr_acc { get; set; }
        public int id { get; set; }
    }
}