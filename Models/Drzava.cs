using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace React.Models
{
    public partial class Drzava
    {
        public Drzava()
        {
            Naselje = new HashSet<Naselje>();
        }

        public int Iddrzava { get; set; }
        public string Naziv { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Naselje> Naselje { get; set; }
    }
}
