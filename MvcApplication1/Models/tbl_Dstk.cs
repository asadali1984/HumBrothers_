using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_Dstk
    {

        [Key]
        public int Dstk_id { get; set; }
        public string Dstk_ItmDes { get; set; }
        public double Dstk_ItmQty { get; set; }
        public double Dstk_Itmwght { get; set; }
        public string Dstk_ItmUnt { get; set; }
        public double Dstk_rat { get; set; }
        public double Dstk_salrat { get; set; }
        public double Dstk_purrat { get; set; }
        public double Dstk_carton { get; set; }
        public int Mstk_id { get; set; }
        public int ProductID { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
        public double p_Price { get; set; }
        public double p_TagPrice { get; set; }
        public string procat { get; set; }
    }
}