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
    public class productsController : ApiController
    {
        private HumBrosContext db = new HumBrosContext();

        // GET api/products
        public IEnumerable<Products> GetProducts()
        {
            return db.Products.AsEnumerable();
        }

        // GET api/products/5
        public Products GetProducts(int id)
        {
            Products products = db.Products.Find(id);
            if (products == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return products;
        }

        // PUT api/products/5
        public HttpResponseMessage PutProducts(int id, Products products)
        {
            if (ModelState.IsValid && id == products.ProductID)
            {
                db.Entry(products).State = EntityState.Modified;

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

        // POST api/products
        public HttpResponseMessage PostProducts(Products products)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(products);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, products);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = products.ProductID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/products/5
        public HttpResponseMessage DeleteProducts(int id)
        {
            Products products = db.Products.Find(id);
            if (products == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Products.Remove(products);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, products);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}