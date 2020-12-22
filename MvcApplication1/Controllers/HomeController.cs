using System;
using MvcApplication1.Models; 
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using System.Data.Entity;
using System.Transactions;
using System.Configuration;
using Newtonsoft.Json;
using System.Web.Routing;

namespace MvcApplication1.Controllers
{
    
    public class HomeController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpSessionStateBase session = filterContext.HttpContext.Session;
            if (session["user"] == null)
            {
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary {
                                { "Controller", "Login" },
                                { "Action", "Index" }
                                });
            }
        }

        //DbTransaction trans = null;
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["HamBrosConnection"].ConnectionString);
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        [HttpPost]
        public JsonResult SaveMovies(List<Movies> Movies)  //function to save information into database
        {

            using (HumBrosContext db = new HumBrosContext())
            {
                foreach (Movies mov in Movies)
                {
                    db.Movies.Add(mov);
                }
                db.SaveChanges();
            }

            bool Result = true;
            return Json(Result);
        }

        [HttpPost]
        public JsonResult insertMdsr(tbl_Mdsr dsr)
        { 
            if (dsr != null)
            {
                // TODO: Add insert logic here

                //Opening connection
                //con.Open();

               
                 
                     using (HumBrosContext db = new HumBrosContext())
                        {
                            var objMdsr = new tbl_Mdsr
                            {
                                dsrdat = dsr.dsrdat,
                                CustomerID = dsr.CustomerID,
                                CompanyId = dsr.CompanyId,
                                BranchId = dsr.BranchId,
                                Isdone = dsr.Isdone,
                                CreateAt = dsr.CreateAt,
                                CreateBy = Session["user"].ToString(),
                                Isdon = dsr.Isdon,
                                Username = dsr.Username,
                                saleper = dsr.saleper,
                                prevbal = dsr.prevbal,
                                Salesman = dsr.Salesman,
                                areaid = dsr.areaid,
                                furout = dsr.furout,
                                updateBy = dsr.updateBy,
                            };

                            db.tbl_Mdsr.Add(objMdsr);
                            db.SaveChanges();
                        }
                        
            
                    //try
                    //{
                    //    using (HumBrosContext db = new HumBrosContext())
                    //    {
                    //        var objMdsr = new tbl_Mdsr
                    //        {
                    //            dsrdat = dsr.dsrdat,
                    //            CustomerID = dsr.CustomerID,
                    //            CompanyId = dsr.CompanyId,
                    //            BranchId = dsr.BranchId,
                    //            Isdone = dsr.Isdone,
                    //            CreateAt = dsr.CreateAt,
                    //            CreateBy = dsr.CreateBy,
                    //            Isdon = dsr.Isdon,
                    //            Username = dsr.Username,
                    //            saleper = dsr.saleper,
                    //            prevbal = dsr.prevbal,
                    //            Salesman = dsr.Salesman,
                    //            areaid = dsr.areaid,
                    //            furout = dsr.furout,
                    //            updateBy = dsr.updateBy,
                    //        };

                    //        db.tbl_Mdsr.Add(objMdsr);
                    //        db.SaveChanges();
                    //    }
                        
                    //    //var lastId = (from i in db.tbl_Mdsr select i.dsrid).Max();


                    //    //var objDdsr = new tbl_ddsr
                    //    //{
                    //    //    dsrid = lastId,
                    //    //    ProductTypeID = dsr.tbl_ddsr.ProductTypeID,
                    //    //    ProductID = dsr.tbl_ddsr.ProductID,
                    //    //    untid = dsr.tbl_ddsr.untid,
                    //    //    Qty = dsr.tbl_ddsr.Qty,
                    //    //    salrat = dsr.tbl_ddsr.salrat,
                    //    //    salrturn = dsr.tbl_ddsr.salrturn,
                    //    //    recvry = dsr.tbl_ddsr.recvry,
                    //    //    outstan = dsr.tbl_ddsr.outstan,
                    //    //    Amt = dsr.tbl_ddsr.Amt,
                    //    //    dsrrmk = dsr.tbl_ddsr.dsrrmk,
                    //    //    CompanyId = dsr.tbl_ddsr.CompanyId,
                    //    //    BranchId = dsr.tbl_ddsr.BranchId,
                    //    //    CreateAt = dsr.tbl_ddsr.CreateAt,
                    //    //    CreateBy = dsr.tbl_ddsr.CreateBy,
                    //    //    ttlamt = dsr.tbl_ddsr.ttlamt,
                    //    //    finlqry = dsr.tbl_ddsr.finlqry
                    //    //};


                    //    //db.tbl_ddsr.Add(objDdsr);
                    //    //db.SaveChanges();    

                    //    transaction.Commit();

                    //}
                    //catch (Exception ex)
                    //{
                    //    //something is wrong, both calls are rolled back
                    //    transaction.Rollback();
                    //    msg = ex.Message.ToString();
                    //}
                }

                //try
                //{
                //    db.tbl_Mdsr.Add(mdsr);
                //    db.SaveChanges();
                //    string msg = "DSR Added Successfully";
                //    return msg;

                //}
                //catch (Exception ex)
                //{
                //    // If Sucess== 0 then Unable to perform Save/Update Operation and send Exception to View as JSON
                //    return ex.Message.ToString();
                //}

            //}
            bool Result = true;
            return Json(Result);
        }

        [HttpPost]
        public JsonResult SaveDDSR(List<tbl_ddsr> tblddsr)  //function to save information into database
        {

            using (HumBrosContext db = new HumBrosContext())
            {
                //var lastId = (from i in db.tbl_Mdsr select i.dsrid).Max();

                foreach (tbl_ddsr mov in tblddsr)
                {
                    db.tbl_ddsr.Add(mov);
                }
                db.SaveChanges();
            }

            bool Result = true;
            return Json(Result);
        }


        public string getProduct()
        {
            using (HumBrosContext db = new HumBrosContext())
            {
                List<Products> lstitem = new List<Products>();
                var data = from t in db.Products
                           select new {   id = t.ProductID, Name= t.ProductName};
                foreach (var item in data)
                {
                    Products boitem = new Products();
                    boitem.ProductID = item.id;
                    boitem.ProductName = item.Name;
                    lstitem.Add(boitem);

                }
                return JsonConvert.SerializeObject(lstitem);
            }
            
        }


        public string getDsr()
        {
            using (HumBrosContext db = new HumBrosContext())
            {
                string usr = Session["user"].ToString();
                List<DSR> lstitem = new List<DSR>();
                var data = (from t in db.tbl_Mdsr
                           join i in db.tbl_ddsr on t.dsrid equals i.dsrid
                           join j in db.customers_ on t.CustomerID equals j.cust_acc
                           where t.CreateBy ==  usr orderby t.dsrid descending
                            select new { dsrid = t.dsrid, dsrdat = t.dsrdat, CustomerName = j.CustomerName }).Distinct();
                foreach (var item in data)
                {
                    DSR boitem = new DSR();
                    boitem.dsrid = item.dsrid;
                    boitem.dsrdat = item.dsrdat;
                    //boitem.CustomerID = item.CustomerID;
                    boitem.CustomerName = item.CustomerName;
                    lstitem.Add(boitem);

                }
                return JsonConvert.SerializeObject(lstitem);
            }
            
        }

        public string deleteDsr(int id)
        {
            try
            {
                using (HumBrosContext db = new HumBrosContext())
                {
                    int dsrid_ = id;
                    tbl_Mdsr dsrid = (from t in db.tbl_Mdsr where t.dsrid == dsrid_ select t).FirstOrDefault();
                    tbl_ddsr ddsrid = (from t in db.tbl_ddsr where t.dsrid == dsrid_ select t).FirstOrDefault();

                    //Remove from Child DSR
                    db.tbl_ddsr.Remove(ddsrid);
                    db.SaveChanges();

                    //Remove from Parent DSR
                    db.tbl_Mdsr.Remove(dsrid);
                    db.SaveChanges();

                    return "DSR Deleted";
                }
            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
           
        }

        
        // get mdsrid
        public string getMdsrid()
        {
            using (HumBrosContext db = new HumBrosContext())
            {

                var lastId = (from i in db.tbl_Mdsr select i.dsrid).Max();
                //List<Products> lstitem = new List<Products>();
                //var data = from t in db.Products
                //           select new { id = t.ProductID, Name = t.ProductName };
                //foreach (var item in data)
                //{
                //    Products boitem = new Products();
                //    boitem.ProductID = item.id;
                //    boitem.ProductName = item.Name;
                //    lstitem.Add(boitem);

                //}
                return JsonConvert.SerializeObject(lastId);
            }

        }

        //GET Area
        public string getArea()
        {
            List<tbl_area> lstitemarea = new List<tbl_area>();

            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.tbl_area
                           select t;
                foreach (var item in data)
                {
                    tbl_area area_ = new tbl_area();
                    area_.areaid = item.areaid;
                    area_.area_ = item.area_;
                    lstitemarea.Add(area_);
                }
            }
            return JsonConvert.SerializeObject(lstitemarea);
        }

        //GET Area
        public string getSalesMan()
        {
            List<Users> lstitemarea = new List<Users>();

            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.USers
                           where t.Level == "3"
                           select t;
                foreach (var item in data)
                {
                    Users usrs = new Users();
                    usrs.id = item.id;
                    usrs.Username = item.Username;
                    lstitemarea.Add(usrs);
                }
            }
            return JsonConvert.SerializeObject(lstitemarea);
        }

        // GET CUstomer Sale Percentage

        public string getCustomerSalper(string id)
        {
            List<customers_> lstitemcustsalPer = new List<customers_>();
            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.customers_
                           where t.cust_acc == id
                           select t;
                foreach (var item in data)
                {
                    customers_ salPer = new customers_();
                    salPer.saleper = item.saleper;
                    lstitemcustsalPer.Add(salPer);
                }
            }
            return JsonConvert.SerializeObject(lstitemcustsalPer);
        }

        //GET Customer OUTStanding

        public string getCustomerOutstan(string id)
        {
            List<tbl_Salcredit> lstitemcustoutstand = new List<tbl_Salcredit>();

            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.tbl_Salcredit
                           where t.CustomerID == id
                           select t;
                foreach (var item in data)
                {
                    tbl_Salcredit salcred = new tbl_Salcredit();
                    salcred.CustomerID = item.CustomerID;
                    salcred.CredAmt = item.CredAmt;
                    lstitemcustoutstand.Add(salcred);
                }
            }
            return JsonConvert.SerializeObject(lstitemcustoutstand);
        }

        //GET Customer
        public string getCustomerByarea(int id)
        {
            List<customers_> lstitemcustarea = new List<customers_>();

            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.customers_
                           where t.areaid == id
                           select t;
                foreach (var item in data)
                {
                    customers_ cust = new customers_();
                    cust.CustomerID = item.CustomerID;
                    cust.CustomerName = item.CustomerName;
                    cust.areaid = item.areaid;
                    cust.cust_acc = item.cust_acc;

                    lstitemcustarea.Add(cust);
                }

            }
            return JsonConvert.SerializeObject(lstitemcustarea);
        }

        public string getProductSalrat(int id)
        {
            List<Products> lstitemtype = new List<Products>();
            //long id =long.Parse( "1");
            using (HumBrosContext db = new HumBrosContext())
            {
                var data = from t in db.Products
                           where t.ProductID == id
                           select new { t.ProductID, t.SalePrice };

                foreach (var item in data)
                {
                    Products itemtype = new Products();
                    itemtype.SalePrice = item.SalePrice;
                    lstitemtype.Add(itemtype);

                }
            }
            return JsonConvert.SerializeObject(lstitemtype);

        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
