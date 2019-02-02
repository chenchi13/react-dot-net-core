using React.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.DAL
{
    public class NaseljeDataAccessLayer
    {
        ReactDBContext db = new ReactDBContext();

        public IEnumerable<Naselje> GetAllNaselja()
        {
            try
            {
                return db.Naselje.Include(naselje => naselje.Drzava).ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new Naselje record     
        public int AddNaselje(Naselje naselje)
        {
            try
            {
                if (!checkIfExists(naselje))
                {
                    db.Naselje.Add(naselje);
                    db.SaveChanges();
                    return 1;
                }
                else {
                    return -1;
                }
            }
            catch
            {
                throw;
            }
        }

        private bool checkIfExists(Naselje naselje)
        {
            return db.Naselje.Any(n => n.Naziv == naselje.Naziv && n.PostanskiBroj == naselje.PostanskiBroj && n.DrzavaId == naselje.DrzavaId);
        }

        //To Update the records of a particluar Naselje    
        public int UpdateNaselje(Naselje naselje)
        {
            try
            {
                db.Entry(naselje).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular Naselje    
        public Naselje GetNaseljeData(int id)
        {
            try
            {
                Naselje naselje = db.Naselje.Include("Drzava").FirstOrDefault(i => i.Idnaselje == id);
                return naselje;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular Naselje    
        public int DeleteNaselje(int id)
        {
            try
            {
                Naselje emp = db.Naselje.Find(id);
                db.Naselje.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Get the list of Countries    
        public List<Drzava> GetDrzave()
        {
            List<Drzava> listDrzava = new List<Drzava>();
            listDrzava = (from DrzavaList in db.Drzava select DrzavaList).ToList();
            return listDrzava;
        }
    }
}
