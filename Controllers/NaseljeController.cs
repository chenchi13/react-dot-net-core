using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React.Models;
using Microsoft.AspNetCore.Mvc;
using React.DAL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace React.Controllers
{

    public class NaseljeController : Controller
    {
        NaseljeDataAccessLayer naseljeDAL = new NaseljeDataAccessLayer();

        // GET: api/<controller>
        [HttpGet]
        [Route("api/Naselje/Index")]
        public IEnumerable<Naselje> Index()
        {
            return naseljeDAL.GetAllNaselja();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        [Route("api/Naselje/Details/{id}")]
        public Naselje GetDetails(int id)
        {
            return naseljeDAL.GetNaseljeData(id); ;
        }

        // POST api/<controller>
        [HttpPost]
        [Route("api/Naselje/Create")]
        public int AddNaselje(Naselje naselje)
        {
            return naseljeDAL.AddNaselje(naselje);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        [Route("api/Naselje/Edit")]
        public int Edit(Naselje naselje)
        {
            return naseljeDAL.UpdateNaselje(naselje);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Route("api/Naselje/Delete/{id}")]
        public void Delete(int id)
        {
            naseljeDAL.DeleteNaselje(id);
        }

        [HttpGet]
        [Route("api/Naselje/GetDrzavaList")]
        public IEnumerable<Drzava> Details()
        {
            return naseljeDAL.GetDrzave();
        }
    }
}
