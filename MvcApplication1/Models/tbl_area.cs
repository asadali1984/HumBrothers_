using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_area
    {
        [Key]
        public int areaid { get; set; }
        public string area_ { get; set; }
        public string CompanyId { get; set; }
        public string BranchId { get; set; }    
    }
}