using System;
using System.Collections.Generic;

namespace React.Models
{
    public partial class Naselje
    {
        public int Idnaselje { get; set; }
        public string Naziv { get; set; }
        public int PostanskiBroj { get; set; }
        public int DrzavaId { get; set; }

        public Drzava Drzava { get; set; }

    }
}
