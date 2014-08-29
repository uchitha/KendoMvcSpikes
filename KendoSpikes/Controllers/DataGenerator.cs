using FizzWare.NBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Train.Models;

namespace Train.Controllers
{
    public class DataGenerator
    {
        private static List<string> VehicleTypes = new List<string> { "OreCar", "Locomotive", "TestCar" };
        private static List<string> Location = new List<string> { "Depart", "Yard", "Workshop","Network" };
        private static List<string> Trains = new List<string> { "M15112", "M15312", "M12342" };
        private static SequentialGenerator<int> SeqNumberGenerator = new SequentialGenerator<int> { Direction = GeneratorDirection.Ascending, Increment = 1 };
        private static SequentialGenerator<DateTime> SeqDateGenerator = new SequentialGenerator<DateTime> { Direction = GeneratorDirection.Descending, IncrementDateBy = IncrementDate.Minute };

        public static IList<Vehicle> GenerateVehicles()
        {
            SeqNumberGenerator.StartingWith(1000);
            SeqDateGenerator.StartingWith(DateTime.Now.AddHours(-12));
            return Builder<Vehicle>.CreateListOfSize(300)
                                   .All().With(v => v.Number = SeqNumberGenerator.Generate().ToString())
                                   .All().With(v => v.TrainNumber = Pick<string>.RandomItemFrom(Trains))
                                   .Random(300).With(v => v.LastEventDateTime = SeqDateGenerator.Generate())
                                   .All().With(v => v.TripCount = new RandomGenerator().Next(0,20))
                                   .All().With(v => v.Location = Pick<string>.RandomItemFrom(Location))
                                   .All().With(v => v.VehicleType = Pick<string>.RandomItemFrom(VehicleTypes))
                                   .Build();
        }
    }
}