using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class Products
    {
        [Key]
        public int ProductID { get; set; }
        public int ProductTypeID { get; set; }
        public string ProductName { get; set; }
        public double PckSize { get; set; }
        public double Cost { get; set; }
        public string ProductDiscriptions { get; set; }
        public string Supplier_Customer { get; set; }
        public string Unit { get; set; }
        public double PurchasePrice { get; set; }
        public double SalePrice { get; set; }
        public double stk_carton { get; set; }
        public string ProductType { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Pro_Code { get; set; }
        public bool IsActive { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; } 
        
    }
}