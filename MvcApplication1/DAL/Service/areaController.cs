using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcApplication1.Models;

namespace MvcApplication1.DAL.Service
{
    public class areaController : ApiController
    {
        private HumBrosContext db = new HumBrosContext();

        // GET api/area
        public IEnumerable<tbl_area> Gettbl_area()
        {
            return db.tbl_area.AsEnumerable();
        }

        // GET api/area/5
        public tbl_area Gettbl_area(int id)
        {
            tbl_area tbl_area = db.tbl_area.Find(id);
            if (tbl_area == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tbl_area;
        }

        // PUT api/area/5
        public HttpResponseMessage Puttbl_area(int id, tbl_area tbl_area)
        {
            if (ModelState.IsValid && id == tbl_area.areaid)
            {
                db.Entry(tbl_area).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/area
        public HttpResponseMessage Posttbl_area(tbl_area tbl_area)
        {
            if (ModelState.IsValid)
            {
                db.tbl_area.Add(tbl_area);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tbl_area);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tbl_area.areaid }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/area/5
        public HttpResponseMessage Deletetbl_area(int id)
        {
            tbl_area tbl_area = db.tbl_area.Find(id);
            if (tbl_area == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.tbl_area.Remove(tbl_area);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tbl_area);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}