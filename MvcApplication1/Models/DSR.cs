using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApplication1.Models
{
    public class DSR
    {
        public int dsrid { get; set; }
        public DateTime dsrdat { get; set; }
        public string CustomerID { get; set; }
        public string CustomerName { get; set; }
    }
}