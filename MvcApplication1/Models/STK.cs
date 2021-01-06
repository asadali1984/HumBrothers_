using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class STK
    {
        [Key]
        public int Mstk_id { get; set; }
        public string Mstk_sono { get; set; }
        public DateTime Mstk_dat { get; set; }
        public DateTime Mstk_PurDat { get; set; }
        public string Mstk_Rmk { get; set; }
        public int ven_id { get; set; }
        public int CustomerID { get; set; }
        public int MPurID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool ISActive { get; set; }
        public int MSal_id { get; set; }
        public int wh_id { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
        public int Dstk_id { get; set; }
        public string Dstk_ItmDes { get; set; }
        public double Dstk_ItmQty { get; set; }
        public double Dstk_Itmwght { get; set; }
        public string Dstk_ItmUnt { get; set; }
        public double Dstk_rat { get; set; }
        public double Dstk_salrat { get; set; }
        public double Dstk_purrat { get; set; }
        public double Dstk_carton { get; set; }
        public int ProductID { get; set; }
        public double p_Price { get; set; }
        public double p_TagPrice { get; set; }
        public string procat { get; set; }
        public string ProductName { get; set; }
   
    }
}