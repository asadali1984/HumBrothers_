using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcApplication1.Models;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.IO;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;

namespace MvcApplication1.Controllers
{
    public class UsersController : Controller
    {
        private HumBrosContext db = new HumBrosContext();
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["HamBrosConnection"].ConnectionString);
        //
        // GET: /Users/

        public ActionResult Index()
        {
            return View(db.USers.ToList());
        }

        //
        // GET: /Users/Details/5

        public ActionResult Details(string id = null)
        {
            Users users = db.USers.Find(id);
            if (users == null)
            {
                return HttpNotFound();
            }
            return View(users);
        }


        //[HttpPost]
        //public ActionResult CheckUser(Users user)
        //{
        //    try
        //    {
        //        //var data = checkUser(user.Username, user.Password);
        //        //if (data == "1")
        //        //{
        //        //    return RedirectToAction("Contact", "Home");
        //        //}
        //        //else {
        //        //    return RedirectToAction("Login", "Index");
        //        //}
                
        //    }
        //    catch (Exception ex)
        //    {
        //        return RedirectToAction("Login", "Index");
        //    }
        //}
      //  [HttpPost]
        public string logout()
        {
            if (Session != null)
            {
                Session.Clear();
                Session.Abandon();

                return "1";
            }
            else
            {
                return "0";
            }
        }

        public string Check(Users user)
        {
            using (HumBrosContext db = new HumBrosContext())
            {
                List<Users> lstitem = new List<Users>();

                var appPassword_ = user.Password;
                var appPassword = Encrypt(appPassword_);
                var data = from o in db.USers
                           where o.Password == appPassword && o.Username == user.Username
                           // join i in db.Items on o.itemid equals i.id
                           select new
                           {
                               Name = o.Name,
                               Username = o.Username,
                               Designation = o.Designation,
                               Password = o.Password,

                           };
               foreach (var item in data)
               {
                   Users boitem = new Users();
                   boitem.Username = item.Username;
                   boitem.Password = item.Password;
                   lstitem.Add(boitem);

                   Session["user"] = boitem.Username;
                   Session["Username"] = boitem.Username;
                   Session["Designation"] = boitem.Designation;
                   Session["Level"] =boitem.Level;
                  
                   
                   //Session["Name"] = row["Name"];
                   //Session["Company"] = row["CompanyName"];
                   //Session["CompanyID"] = row["CompanyId"];
                   //Session["BranchID"] = row["BranchId"];
                   //Session["Level"] = row["Level"];
                   //Session["CompanyImg"] = row["CompanyImg"];
                   //string uname = row["Username"].ToString();
                   //string designation = Session["Designation"].ToString();
                   //string lvl = row["Level"].ToString();
               }
               bool isEmpty = !lstitem.Any();

               if (isEmpty)
               {
                   return "0";
                   // error message
               }
               else
               {   
                   return "1";
                   // show grid
               }
                //var appPassword_ = user.Password;
                //List<Users> lstitem = new List<Users>();
                //var appPassword = Encrypt(appPassword_);
                //var data = from t in db.USers
                //           //where t.Password == appPassword
                //           .Where(s => s.Password == appPassword  && s.Username == user.Username)
                //           select new { Username = t.Username, Password = t.Password };
                //if (data != null)
                //{
                //    foreach (var item in data)
                //    {
                //        Users boitem = new Users();
                //        boitem.Username = item.Username;
                //        boitem.Password = item.Password;
                //        lstitem.Add(boitem);

                //    }
                //    return JsonConvert.SerializeObject(lstitem);
                //}
                //else {
                //    return "Invalid User";
                //}
                
            }


            //using (HumBrosContext db = new HumBrosContext())
            //{

            //    try
            //    {  
            //        string Command = "Select * from Users where Username = '" + user.Username + "'";

            //        SqlDataAdapter adpt = new SqlDataAdapter(Command, con);
            //        DataTable dt = new DataTable();
            //        adpt.Fill(dt);

            //        int i = dt.Rows.Count;

            //        foreach (DataRow row in dt.Rows)
            //        {
            //            string password_ = row["Password"].ToString();
            //            string pass = user.Password.Trim();

            //            var AppPassword = Decrypt(password_);

            //            if (pass == AppPassword)
            //            {
            //                if (i > 0)
            //                {
            //                    Session["user"] = row["Name"];
            //                    Session["Username"] = row["Username"];
            //                    Session["Designation"] = row["Designation"];
            //                    Session["Name"] = row["Name"];
            //                    Session["Company"] = row["CompanyName"];
            //                    Session["CompanyID"] = row["CompanyId"];
            //                    Session["BranchID"] = row["BranchId"];
            //                    Session["Level"] = row["Level"];
            //                    Session["CompanyImg"] = row["CompanyImg"];
            //                    string uname = row["Username"].ToString();
            //                    string designation = Session["Designation"].ToString();
            //                    string lvl = row["Level"].ToString();

            //                    //// Get Company Details
            //                    //string query = "Select * from tbl_Companies where TradeLicenseNo='" + Session["CompanyID"] + "'";
            //                    //DataTable dt_ = new DataTable();
            //                    //dt_ = new DataTable();
            //                    //dt_ = GetQueryData(query);

            //                    //if (dt_.Rows.Count > 0)
            //                    //{
            //                    //    Session["CompanyAddress"] = dt_.Rows[0]["Address"].ToString();
            //                    //    Session["Companyph"] = dt_.Rows[0]["TelephoneNo"].ToString();

            //                    //}
            //                }
            //            }
            //            else
            //            {
            //                return "Invaliud User Name and Password!!!";
            //            }
            //        }

            //        //return "Found..";



            //    }
            //    catch (Exception ex)
            //    {
            //        return ex.Message;
            //    }
            //}
        }

        public static DataTable GetQueryData(string query)
        {
            SqlConnection con = new SqlConnection();
            DataTable dt = new DataTable();
            con.Open();
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataAdapter Adapter = new SqlDataAdapter(cmd);
            Adapter.Fill(dt);
            con.Close();

            return dt;
        }

        private string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        private string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        //
        // GET: /Users/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Users/Create

        [HttpPost]
        public ActionResult Create(Users users)
        {
            if (ModelState.IsValid)
            {
                db.USers.Add(users);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(users);
        }

        //
        // GET: /Users/Edit/5

        public ActionResult Edit(string id = null)
        {
            Users users = db.USers.Find(id);
            if (users == null)
            {
                return HttpNotFound();
            }
            return View(users);
        }

        //
        // POST: /Users/Edit/5

        [HttpPost]
        public ActionResult Edit(Users users)
        {
            if (ModelState.IsValid)
            {
                db.Entry(users).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(users);
        }

        //
        // GET: /Users/Delete/5

        public ActionResult Delete(string id = null)
        {
            Users users = db.USers.Find(id);
            if (users == null)
            {
                return HttpNotFound();
            }
            return View(users);
        }

        //
        // POST: /Users/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(string id)
        {
            Users users = db.USers.Find(id);
            db.USers.Remove(users);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}