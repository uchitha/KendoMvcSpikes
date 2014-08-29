using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Train.Models
{
    public class Vehicle
    {
        public long Id { get; set; }
        public string Number { get; set; }
        public string Location { get; set; }
        public DateTime TimeAtLocation { get; set; }
        public int Position { get; set; }
       
        public string TrainNumber { get; set; }
        public string VehicleType { get; set; }
        
        public DateTime LastEventDateTime { get; set; }

        public int TripCount { get; set; }

        public bool DetachFlag { get; set; }
    }
}