using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_booksalman
    {
        [Key]
        public int booksalman { get; set; }
        public string bookerid { get; set; }
        public string salmanid { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }
        public bool isAssign { get; set; }    
    }
}