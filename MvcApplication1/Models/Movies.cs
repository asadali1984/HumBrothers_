using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema; 

namespace MvcApplication1.Models
{
    [Table("Movie")] //Attribute required to prevent pluralization(Movies)  
    public class Movies
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public int Year { get; set; }
    }
}