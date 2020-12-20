using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication1.Models
{
    public class tbl_Salcredit
    {
        [Key]
        public int purcreditid { get; set; }
        public string CustomerID { get; set; }
        public double CredAmt { get; set; }

    }
}