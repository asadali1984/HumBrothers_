using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_Mdsr
    {
        [Key]
        public int dsrid { get; set; }
        public DateTime dsrdat { get; set; }
        public string CustomerID { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
	    public bool Isdone { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Isdon { get; set; }
        public string Username { get; set; }
        public double saleper { get; set; }
        public double prevbal { get; set; }
        public string Salesman { get; set; }
        public int areaid { get; set; }
        public double furout { get; set; }
        public string updateBy { get; set; }

    }
}