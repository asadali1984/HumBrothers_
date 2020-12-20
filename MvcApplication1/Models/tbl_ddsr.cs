using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MvcApplication1.Models
{
    public class tbl_ddsr
    {
        [Key]
        public int ddsr {get; set;}
        public int dsrid { get; set; }
        public int ProductTypeID {get; set;}
        public int ProductID {get; set;}
        public int untid {get; set;}
        public double Qty {get; set;}
        public double salrat {get; set;}
        public double salrturn {get; set;}
        public double recvry {get; set;}
        public double outstan {get; set;}
        public double Amt {get; set;}
        public string dsrrmk {get; set;}
        public string CompanyId {get; set;}
        public string BranchId {get; set;}
        public DateTime CreateAt {get; set;}
        public string CreateBy {get; set;}
        public double ttlamt {get; set;}
        public double finlqry { get; set; }

    }
}