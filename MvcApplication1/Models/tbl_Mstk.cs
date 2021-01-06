using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_Mstk
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
   
    }
}